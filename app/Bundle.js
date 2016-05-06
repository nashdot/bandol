/* eslint no-param-reassign: 0 */
import * as path from 'path';
import traverse from 'babel-traverse';
import log from 'loglevel';

import Resource from './Resource';
import Types from './Types';
import sortDependencies from './utils/sortDependencies.js';

export default class Bundle {
  constructor(options) {
    // Entry and base path to all dependencies
    this.entry = options.entry;
    this.entryId = 'unknown';
    this.srcBasePath = 'unknown';

    // Initialize logging
    const logLevel = options.logLevel !== undefined ? options.logLevel : log.levels.SILENT;
    this.log = log;
    this.log.setLevel(logLevel);

    // Enhance environment by options provided to Bandol
    if (options.env) {
      for (const prop in options.env) {
        process.env[prop] = options.env[prop];
      }
    }

    this.runningContext = options.runningContext || new Map();
    this.plugins = options.plugins;

    // Final bundle genarated code source
    this.code = '';

    this.resources = new Map();
    this.sortedResources = [];

    // Exports
    this.defaultExportsByName = new Map();
    this.defaultExportsById = new Map();
    this.namedExportsByName = new Map();
    this.namedExportsById = new Map();
    this.usedNames = new Map();

    // Plugins
    this.uidPlugins = [];
    this.resolverPlugins = [];
    this.loaderPlugins = [];
    this.normalizerPlugins = [];
    this.analyzerPlugins = [];
    this.optimizerPlugins = [];
    this.finalizerPlugins = [];

    // Init plugins
    this.initPlugins();

    if (this.uidPlugins.length === 0) {
      throw new Error('No uid plugin found in this Bandol configuration.');
    }
  }

  initPlugins() {
    for (const Plugin of this.plugins) {
      const worker = new Plugin(this);

      if (worker.generateUid) {
        this.uidPlugins.push(worker);
      }

      if (worker.resolveResource) {
        this.resolverPlugins.push(worker);
      }

      if (worker.loadResource) {
        this.loaderPlugins.push(worker);
      }

      if (worker.normalizeResource) {
        this.normalizerPlugins.push(worker);
      }

      if (worker.analyzeResource) {
        this.analyzerPlugins.push(worker);
      }

      if (worker.optimizeBundle) {
        this.optimizerPlugins.push(worker);
      }

      if (worker.finalize) {
        this.finalizerPlugins.push(worker);
      }

      this.log.info(`Registering "${worker.name}/${worker.version}" plugin. Available features: ${JSON.stringify(worker.features)}`);
    }
  }

  async build() {
    this.entryId = this.resolveResource(this.entry, undefined);
    if (this.entryId === undefined) {
      throw new Error(`Bundle.build: can't resolve entry ${this.entry}`);
    }

    this.srcBasePath = path.dirname(this.entryId);

    this.log.info('Processing...');
    await this.processResource(this.entryId);

    this.sortedResources = sortDependencies(this.resources);

    this.log.info('Optimizing...');
    await this.optimizeBundle();
  }

  async processResource(id) {
    if (this.resources.has(id)) {
      return;
    }

    const shortId = this.getShortPath(id);

    let resource = await this.loadResource(id);
    this.log.info(`Normalizing "${shortId}"...`);
    resource = await this.normalizeResource(resource);
    this.log.info(`Analyzing "${shortId}"...`);
    resource = await this.analyzeResource(resource);

    // -- Register
    this.resources.set(resource.id, resource);

    // -- Fetch dependencies
    await this.processDependencies(resource);
  }

  async processDependencies(resource) {
    for (const id of resource.dependencies) {
      await this.processResource(id);
    }
  }

  resolveResource(importee, importerId) {
    let id;
    for (const plugin of this.resolverPlugins) {
      id = plugin.resolveResource(importee, importerId);

      if (id !== undefined) {
        return id;
      }
    }

    return id;
  }

  async loadResource(id) {
    let resource = new Resource(id);

    const shortId = this.getShortPath(id);

    for (const plugin of this.loaderPlugins) {
      resource = await plugin.loadResource(resource);

      if (resource.type !== Types.UNKNOWN) {
        this.log.info(`Loaded "${shortId}" by "${plugin.name}/${plugin.version}"`);
        return resource;
      }
    }

    throw new Error(`No loader plugin found for resource "${shortId}"`);
  }

  async normalizeResource(resource) {
    for (const plugin of this.normalizerPlugins) {
      resource = await plugin.normalizeResource(resource);
      traverse.clearCache();
    }

    return resource;
  }

  async analyzeResource(resource) {
    for (const plugin of this.analyzerPlugins) {
      resource = await plugin.analyzeResource(resource);
    }

    return resource;
  }

  async optimizeBundle() {
    for (const plugin of this.optimizerPlugins) {
      plugin.optimizeBundle();
      traverse.clearCache();
    }
  }

  finalize(opts) {
    for (const plugin of this.finalizerPlugins) {
      plugin.finalize(opts);
    }
  }

  generateUid() {
    return this.uidPlugins[0].generateUid();
  }

  getShortPath(id) {
    return path.relative(this.srcBasePath, id).replace(/\\/g, '/');
  }

  getShortName(id) {
    let name = path.basename(id, path.extname(id));
    const names = name.split('.');
    if (names.length > 0) {
      name = names[names.length - 1];
    }
    return name;
  }

  addDefaultExport(id, name) {
    this.defaultExportsByName.set(name, id);
    this.defaultExportsById.set(id, name);
  }

  addNamedExport(id, originalName, name, fromDefdault = false) {
    this.namedExportsByName.set(name, id);
    this.namedExportsById.set(`${id}_${originalName}`, name);
  }

  hasName(name) {
    return this.defaultExportsByName.has(name)
        || this.namedExportsByName.has(name);
  }

  getDefaultName(id) {
    return this.defaultExportsById.get(id);
  }

  getNamedName(id, originalName) {
    return this.namedExportsById.get(`${id}_${originalName}`);
  }

  markUsed(id, name) {
    this.usedNames.set(`${id}_${name}`, true);
  }

  isUsed(id, name) {
    return this.usedNames.has(`${id}_${name}`);
  }
}
