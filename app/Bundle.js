/* eslint no-param-reassign: 0 */
import * as fs from 'fs';
import * as path from 'path';
import generate from 'babel-generator';
import traverse from 'babel-traverse';
import stringify from 'json-stringify-safe';
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
    for (const prop in options.env) {
      if (options.env.hasOwnProperty(prop)) {
        process.env[prop] = options.env[prop];
      }
    }

    this.runningContext = options.runningContext || new Map();
    this.plugins = options.plugins || [];

    // Final bundle genarated code source
    this.code = '';

    this.resources = new Map();
    this.sortedResources = [];

    // Exports
    this.defaultExportsByName = new Map();
    this.defaultExportsById = new Map();
    this.namedExportsByName = new Map();
    this.namedExportsById = new Map();
    this.renamedExports = new Map();

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
    this.optimizeBundle();
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
    if (Array.isArray(this.uidPlugins)
        && this.uidPlugins.length > 0) {
      return this.uidPlugins[0].generateUid();
    }

    throw new Error("No 'uid plugin' found in this Bandol configuration.");
  }

  dumpCode(ast, id) {
    const currentPath = process.cwd();
    const outputPath = `${currentPath}/out/${id}.js`;
    let output = 'IN ERROR';
    try {
      output = generate(
        ast,
        {
          comments: false
        },
        '').code;
    } catch (err) {
      this.log.info(err.stack);
    }

    fs.writeFileSync(outputPath, `${output}`);
  }

  dumpAst(ast, id) {
    const currentPath = process.cwd();
    const outputPath = `${currentPath}/out/${id}.json`;
    let output = 'IN ERROR';
    try {
      output = stringify(ast, null, 2);
    } catch (err) {
      this.log.info(err.stack);
    }

    fs.writeFileSync(outputPath, `${output}`);
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
}
