/* eslint no-param-reassign: 0 */
import resolveModule from 'resolve';
import path from 'path';

export default function resolveId(importee, importer) {
  return new Promise((resolve, reject) => {
    console.log(`Importing ${importee} for ${importer}`);

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
