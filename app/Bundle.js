import resolveId from './utils/resolveId.js';
import load from './utils/load';
import mapSequence from './utils/mapSequence.js';

import Module from './Module';

export default class Bundle {
  constructor(options) {
    this.entry = options.entry;

    this.modules = [];
    this.result = {};
  }

  build() {
    return resolveId(this.entry, undefined)
      .then(id => {
        return this.fetchModule(id, undefined);
      })
      .then(module => {
        this.result = { code: module.code, ast: module.ast };
      });
  }

  fetchModule(id, importer) {
    return load(id, importer)
      .catch(err => {
        let msg = `Could not load ${id}`;
        if (importer) {
          msg += ` (imported by ${importer})`;
        }

        msg += `: ${err.message}`;
        throw new Error(msg);
      })
      .then(parsed => {
        const module = new Module({
          id: id,
          code: parsed.code,
          ast: parsed.ast,
          bundle: this
        });
        module.parse();
        this.modules.push(module);

        return this.fetchAllDependencies(module)
          .then(() => {
            return module;
          });
      });
  }

  fetchAllDependencies(module) {
    return mapSequence(module.sources, source => {
      return resolveId(source, module.id)
        .then(id => {
          if (id === module.id) {
            throw new Error(`A module cannot import itself (${id})`);
          }
          return this.fetchModule(id, module.id);
        });
    });
  }

  generate() {
    return this.result;
  }
}
