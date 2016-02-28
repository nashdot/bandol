/* eslint no-param-reassign: 0 */
import fs from 'fs';
import path from 'path';

function addExtensionIfNecessary(filename) {
  if (fs.statSync(filename).isFile()) {
    return filename;
  }

  filename += '.js';
  if (fs.statSync(filename).isFile()) {
    return filename;
  }

  return null;
}

export default function resolveId(importee, importer) {
  return new Promise((resolve) => {
    if (path.isAbsolute(importee)) {
      resolve(addExtensionIfNecessary(importee));
    } else if (importer === undefined) {
      resolve(addExtensionIfNecessary(path.resolve(process.cwd(), importee)));
    } else {
      resolve(addExtensionIfNecessary(path.resolve(path.dirname(importer), importee)));
    }
  });
}
