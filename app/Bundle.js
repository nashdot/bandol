/* eslint no-param-reassign: 0 */
import Hashids from 'hashids';
import Resource from './Resource';
import Types from './Types';
import sortDependencies from './utils/sortDependencies.js';

import nodeResolverPlugin from './plugins/bandol-plugin-resolver-node';
import jsLoaderPlugin from './plugins/bandol-plugin-loader-js';
// import cjsAnalyzerPlugin from './plugins/bandol-plugin-analyzer-cjs';
import es6AnalyzerPlugin from './plugins/bandol-plugin-analyzer-es6';
import jsNormalizerPlugin from './plugins/bandol-plugin-normalizer-js';
import es6FinalizerPlugin from './plugins/bandol-plugin-finalizer-es6';
import es6OptimizerPlugin from './plugins/bandol-plugin-optimizer-es6';

const plugins = [
  nodeResolverPlugin,
  jsLoaderPlugin,
  // cjsAnalyzerPlugin,
  es6AnalyzerPlugin,
  jsNormalizerPlugin,
  es6FinalizerPlugin,
  es6OptimizerPlugin
];

export default class Bundle {
  constructor(options) {
    this.entry = options.entry;
    this.entryId = 'unknown';

    this.resources = new Map();
    this.sortedResources = [];

    this.resolverPlugins = [];
    this.loaderPlugins = [];
    this.normalizerPlugins = [];
    this.analyzerPlugins = [];
    this.optimizerPlugins = [];
    this.finalizerPlugins = [];

    this._hashids = new Hashids('Oh Bandol');
    this._varCounter = 1;
    this.initPlugins();
  }

  initPlugins() {
    for (const Plugin of plugins) {
      const worker = new Plugin(this);

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

      if (worker.optimizeResource) {
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
      await this.buildResource(this.entryId);
      this.sortedResources = sortDependencies(this.resources);
    } catch (error) {
      console.log(error.message);
    }
  }

  async buildResource(id) {
    try {
      if (this.resources.has(id)) {
        return;
      }

      let resource = await this.loadResource(id);
      resource = await this.normalizeResource(resource);
      resource = await this.analyzeResource(resource);
      resource = await this.optimizeResource(resource);

      // -- Register
      this.resources.set(resource.id, resource);

      // -- Fetch dependencies
      await this.buildDependencies(resource);
    } catch (error) {
      console.log(error.message);
    }
  }

  async buildDependencies(resource) {
    for (const id of resource.dependencies) {
      await this.buildResource(id);
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

  async optimizeResource(resource) {
    for (const plugin of this.optimizerPlugins) {
      resource = await plugin.optimizeResource(resource);
    }

    return resource;
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
    return `b${this._hashids.encode(this._varCounter++)}`;
  }
}
