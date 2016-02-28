import fs from 'fs';

export default function load(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(id, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}
