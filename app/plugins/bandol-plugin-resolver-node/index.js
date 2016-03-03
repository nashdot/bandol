import resolveModule from 'resolve';
import path from 'path';

export default class Plugin {
  constructor(bundle) {
    this.bundle = bundle;
  }

  resolveResource(importee, importer) {
    return new Promise((resolve, reject) => {
      let baseDir;
      if (importer === undefined) {
        baseDir = process.cwd();
      } else {
        baseDir = path.dirname(importer);
      }

      resolveModule(importee, { basedir: baseDir }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}
