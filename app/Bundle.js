/* eslint no-param-reassign: 0 */
import * as fs from 'fs';
import * as path from 'path';
import generate from 'babel-generator';
import stringify from 'json-stringify-safe';

import Resource from './Resource';
import Types from './Types';
import sortDependencies from './utils/sortDependencies.js';

import hashidsUidPlugin from './plugins/bandol-plugin-uid-hashids';
import nodeResolverPlugin from './plugins/bandol-plugin-resolver-node';
import jsLoaderPlugin from './plugins/bandol-plugin-loader-js';
// import cjsAnalyzerPlugin from './plugins/bandol-plugin-analyzer-cjs';
import es6AnalyzerPlugin from './plugins/bandol-plugin-analyzer-es6';
import cjsToEs6NormalizerPlugin from './plugins/bandol-plugin-normalizer-cjs-to-es6';
import es6ImportsNormalizerPlugin from './plugins/bandol-plugin-normalizer-es6-imports';
// import es6FinalizerPlugin from './plugins/bandol-plugin-finalizer-es6';
import iifeFinalizerPlugin from './plugins/bandol-plugin-finalizer-iife';
import es6ExportsOptimizerPlugin from './plugins/bandol-plugin-optimizer-es6-exports';
import renameInternalsOptimizerPlugin from './plugins/bandol-plugin-optimizer-rename-internals';
import removeImportsOptimizerPlugin from './plugins/bandol-plugin-optimizer-remove-imports';
import removeUseStrictOptimizerPlugin from './plugins/bandol-plugin-optimizer-remove-use-strict';
import optimizerPlugin from './plugins/bandol-plugin-optimizer';

const plugins = [
  hashidsUidPlugin,
  nodeResolverPlugin,
  jsLoaderPlugin,
  // cjsAnalyzerPlugin,
  es6AnalyzerPlugin,
  cjsToEs6NormalizerPlugin,
  es6ImportsNormalizerPlugin,
  // es6FinalizerPlugin,
  iifeFinalizerPlugin,
  es6ExportsOptimizerPlugin,
  renameInternalsOptimizerPlugin,
  removeImportsOptimizerPlugin,
  removeUseStrictOptimizerPlugin,
  optimizerPlugin
];

export default class Bundle {
  constructor(options) {
    // Entry and base path to all dependencies
    this.entry = options.entry;
    this.entryId = 'unknown';
    this.srcBasePath = 'unknown';

    // Enhance environment by options provided to Bandol
    for (const prop in options.env) {
      if (options.env.hasOwnProperty(prop)) {
        process.env[prop] = options.env[prop];
      }
    }

    // Final bundle genarated code source
    this.code = '';

    this.resources = new Map();
    this.sortedResources = [];

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
    for (const Plugin of plugins) {
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

      if (worker.finalizeResource) {
        this.finalizerPlugins.push(worker);
      }
    }
  }

  async build() {
    try {
      this.entryId = this.resolveResource(this.entry, undefined);
      this.srcBasePath = path.dirname(this.entryId);

      console.log('Analyzing...');
      await this.processResource(this.entryId);

      this.sortedResources = sortDependencies(this.resources);

      console.log('Optimizing...');
      this.optimizeBundle();
    } catch (error) {
      console.log(error.message);
    }
  }

  async processResource(id) {
    try {
      if (this.resources.has(id)) {
        return;
      }

      let resource = await this.loadResource(id);
      resource = await this.normalizeResource(resource);
      resource = await this.analyzeResource(resource);

      // -- Register
      this.resources.set(resource.id, resource);

      // -- Fetch dependencies
      await this.processDependencies(resource);
    } catch (error) {
      console.log(error.message);
    }
  }

  async processDependencies(resource) {
    for (const id of resource.dependencies) {
      await this.processResource(id);
    }
  }

  resolveResource(importee, importerId) {
    for (const plugin of this.resolverPlugins) {
      const id = plugin.resolveResource(importee, importerId);

      if (id) {
        return id;
      }
    }

    throw new Error(`Cannot resolve resource "${importee}" in "${importerId}`);
  }

  async loadResource(id) {
    let resource = new Resource(id);

    for (const plugin of this.loaderPlugins) {
      resource = await plugin.loadResource(resource);

      if (resource.type !== Types.UNKNOWN) {
        return resource;
      }
    }

    return resource;
  }

  async normalizeResource(resource) {
    for (const plugin of this.normalizerPlugins) {
      resource = await plugin.normalizeResource(resource);
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
    }
  }

  finalizeResource(id) {
    for (const plugin of this.finalizerPlugins) {
      plugin.finalizeResource(id);
    }
  }

  generate(id) {
    this.finalizeResource(id);

    const resource = this.resources.get(this.entry);
    const result = { code: resource.props.code, ast: resource.props.ast };

    return result;
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
      console.log(err.stack);
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
      console.log(err.stack);
    }

    fs.writeFileSync(outputPath, `${output}`);
  }

  getShortPath(id) {
    return path.relative(this.srcBasePath, id);
  }
}
