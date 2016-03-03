import nodeResolverPlugin from './plugins/bandol-plugin-resolver-node';
import es6LoaderPlugin from './plugins/bandol-plugin-loader-es6';

const plugins = [
  nodeResolverPlugin,
  es6LoaderPlugin
];

export default class Bundle {
  constructor(options) {
    this.entry = options.entry;

    this.resources = [];

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
      await this.buildResource(this.entry, undefined);
    } catch (error) {
      console.log(error.message);
    }
  }

  async buildResource(importee, importer) {
    try {
      const id = await this.resolveResource(importee, importer);
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
      resource = await this.loadResource(id);
    } catch (error) {
      console.log(error.message);
    }

    return resource;
  }

  async fetchAllDependencies(resource) {
    console.log(`fetchAllDependencies: ${resource.id} - dependencies=${JSON.stringify(resource.dependencies)}`);

    for (const dependency of resource.dependencies) {
      console.log(`fetchAllDependencies: ${resource.id} - dependency=${dependency}`);

      try {
        await this.buildResource(dependency, resource.id);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  generate() {
    const resource = this.resources[0];
    const result = { code: resource.props.code, ast: resource.props.ast };
    return result;
  }

  async loadResource(id) {
    for (const plugin of this.loaderPlugins) {
      const result = await plugin.loadResource(id);

      if (result) {
        return result;
      }
    }

    return undefined;
  }

  async resolveResource(importee, importer) {
    for (const plugin of this.resolverPlugins) {
      const result = await plugin.resolveResource(importee, importer);

      if (result) {
        return result;
      }
    }

    return undefined;
  }
}
