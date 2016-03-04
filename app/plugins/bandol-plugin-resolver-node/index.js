import resolveModule from 'resolve';
import path from 'path';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
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
