import * as fs from 'fs';

import * as babylon from 'babylon';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'loader-json';
    this.version = '0.1.0';
    this.supportedExtensions = ['.json'];

    this.init();
  }

  /* eslint no-param-reassign: 0 */
  loadResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        || resource.type !== Types.UNKNOWN) {
        resolve(resource);
      } else {
        try {
          const jsonData = fs.readFileSync(resource.id, 'utf8');

          const varName = this.bundle.getShortName(resource.id);
          const code = `
            var ${varName} = ${jsonData};
            export default ${varName};
          `;

          const ast = babylon.parse(code, { sourceType: 'module' });

          resource.type = Types.JAVASCRIPT;
          resource.hasAst = true;

          resource.props = {
            originalCode: code,
            originalAst: ast,
            code: code,
            ast: ast,
            imports: new Map()
          };

          resolve(resource);
        } catch (err) {
          this.log.warn(`Failed loading "${this.bundle.getShortPath(resource.id)}": ${err.message}`);
          resolve(resource);
        }
      }
    });
  }
}
