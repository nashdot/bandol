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
      const resource = await this.loadResource(id);

      // -- Register
      this.resources.push(resource);

      // -- Fetch dependencies
      await this.buildDependencies(resource);
    } catch (error) {
      console.log(error.message);
    }
  }

  async buildDependencies(resource) {
    for (const dependency of resource.dependencies) {
      await this.buildResource(dependency, resource.id);
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
