import resolveId from './utils/resolveId.js';
import load from './utils/load';

export default class Bundle {
  constructor(options) {
    this.entry = options.entry;

    this.result = {
      code: ''
    };
  }

  build() {
    return resolveId(this.entry, undefined)
      .then(id => {
        return this.fetchModule(id, undefined);
      })
      .then(code => {
        this.result.code = code;
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
      .then(code => {
        return code;
      });
  }

  generate() {
    return this.result;
  }
}
