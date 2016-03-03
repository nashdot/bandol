import Resource from './Resource';

import nodeResolvePlugin from './plugins/bandol-plugin-resolve-node';
import es6LoaderPlugin from './plugins/bandol-plugin-loader-es6';

const plugins = [
  nodeResolvePlugin,
  es6LoaderPlugin
];

export default class Bundle {
  constructor(options) {
    this.entry = options.entry;

    this.resources = [];

    this.resolvePlugins = [];
    this.loaderPlugins = [];

    this.initPlugins();
  }

  initPlugins() {
    for (const plugin of plugins) {
      const worker = plugin();

      if (worker.resolveResource) {
        this.resolvePlugins.push(worker);
      }

      if (worker.load) {
        this.loaderPlugins.push(worker);
      }
    }
  }

  async build() {
    try {
      const id = await this.resolveResource(this.entry, undefined);
      const resource = await this.fetchResource(id);

      // -- Register
      this.resources.push(resource);

      // -- Fetch dependencies
      await this.fetchAllDependencies(resource);
    } catch (error) {
      console.log(error.message);
    }
  }

  async fetchResource(id) {
    console.log(`fetchResource: ${id}`);

    let resource;

    try {
      const loaded = await this.load(id);

      resource = new Resource({
        id: id,
        code: loaded.props.code,
        ast: loaded.props.ast,
        bundle: this
      });

      // -- Parse
      resource.parse();
    } catch (error) {
      console.log(error.message);
    }

    return resource;
  }

  async fetchAllDependencies(resource) {
    console.log(`fetchAllDependencies: ${resource.id} - sources=${JSON.stringify(resource.sources)}`);

    for (const source of resource.sources) {
      console.log(`fetchAllDependencies: ${resource.id} - source=${source}`);

      try {
        const id = await this.resolveResource(source, resource.id);
        const depResource = await this.fetchResource(id, resource.id);

        // -- Register
        this.resources.push(depResource);

        // -- Fetch dependencies
        await this.fetchAllDependencies(depResource);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  generate() {
    const resource = this.resources[0];
    const result = { code: resource.code, ast: resource.ast };
    return result;
  }

  async load(id) {
    for (const plugin of this.loaderPlugins) {
      const result = await plugin.load(id);

      if (result) {
        return result;
      }
    }

    return undefined;
  }

  async resolveResource(importee, importer) {
    for (const plugin of this.resolvePlugins) {
      const result = await plugin.resolveResource(importee, importer);

      if (result) {
        return result;
      }
    }

    return undefined;
  }
}
