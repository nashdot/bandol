import * as path from 'path';
import stringify from 'json-stringify-safe';

export default class BasePlugin {
  constructor(bundle) {
    this.bundle = bundle;
    this.log = this.bundle.log;

    this.name = 'base';
    this.version = '0.0.0';
    this.supportedExtensions = [];
    this.features = [];
    this.dependencies = [];
  }

  init() {
    // Add default feature: plugin name itself
    this.features.unshift(this.name);
  }

  logAst(ast) {
    const message = stringify(ast, null, 2);
    console.log(message);
  }

  /**
   * Test if a filename ends with a compilable extension.
   */
  isSupportedExtension(filename) {
    const ext = path.extname(filename);
    let result = false;
    this.supportedExtensions.forEach((item) => {
      if (item === ext) {
        result = true;
      }
    });
    return result;
  }
}
