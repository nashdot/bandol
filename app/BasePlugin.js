import _ from 'lodash';
import path from 'path';

export default class BasePlugin {
  name = 'base';
  version = '0.0.0';
  supportedExtensions = [];

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
