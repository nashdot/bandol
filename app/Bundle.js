import resolveId from './utils/resolveId.js';
import load from './utils/load';

import Resource from './Resource';

export default class Bundle {
  constructor(options) {
    this.entry = options.entry;

    this.resources = [];
    this.result = {};
  }

  async build() {
    try {
      const id = await resolveId(this.entry, undefined);
      const resource = await this.fetchResource(id, undefined);

      // -- Register
      this.resources.push(resource);

      // -- Fetch dependencies
      await this.fetchAllDependencies(resource);

      this.result = { code: resource.code, ast: resource.ast };
    } catch (error) {
      console.log(error.message);
    }
  }

  async fetchResource(id, importer) {
    console.log(`fetchResource: ${id}`);

    let resource;

    try {
      const loaded = await load(id, importer);

      resource = new Resource({
        id: id,
        code: loaded.code,
        ast: loaded.ast,
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
        const id = await resolveId(source, resource.id);
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
    return this.result;
  }
}
