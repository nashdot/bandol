import _ from 'lodash';
import * as path from 'path';

export default class BasePlugin {
  constructor() {
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

  log(message) {
    console.log(`${this.name}/${this.version}: ${message}`);
  }

  /**
   * Test if a filename ends with a compilable extension.
   */
  isSupportedExtension(filename) {
    const ext = path.extname(filename);
    return _.contains(this.supportedExtensions, ext);
  }
}
