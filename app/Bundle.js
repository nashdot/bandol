import Resource from './Resource';
import Types from './Types';

import nodeResolverPlugin from './plugins/bandol-plugin-resolver-node';
import es6LoaderPlugin from './plugins/bandol-plugin-loader-es6';
import cjsLoaderPlugin from './plugins/bandol-plugin-loader-cjs';

const plugins = [
  nodeResolverPlugin,
  cjsLoaderPlugin,
  es6LoaderPlugin
];

export default class Bundle {
  constructor(options) {
    this.entry = options.entry;
    this.entryId = 'unknown';

    this.resources = new Map();

    this.resolverPlugins = [];
    this.loaderPlugins = [];

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
    }
  }

  async build() {
    try {
      this.entryId = this.resolveResource(this.entry, undefined);
      await this.buildResource(this.entryId);
    } catch (error) {
      console.log(error.message);
    }
  }

  async buildResource(id) {
    try {
      if (this.resources.has(id)) {
        return;
      }

      const resource = await this.loadResource(id);

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

  generate() {
    const resource = this.resources.get(this.entry);
    const result = { code: resource.props.code, ast: resource.props.ast };
    return result;
  }
}
