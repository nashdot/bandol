import resolveModule from 'resolve';
import * as path from 'path';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'resolver-node';
    this.version = '0.1.0';

    this.bundle = bundle;
    this.init();
  }

  resolveResource(importee, importer) {
    let baseDir;
    if (importer === undefined) {
      baseDir = process.cwd();
    } else {
      baseDir = path.dirname(importer);
    }

    return resolveModule.sync(importee, { basedir: baseDir });
  }
}
