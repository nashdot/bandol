import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'optimizer-es6';
  version = '1.0.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  /* eslint no-param-reassign: 0 */
  optimizeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't optimize ${resource.id}`);
        resolve(resource);
      } else {
        traverse(resource.props.ast, {
          ImportDeclaration: (nodePath) => {
            nodePath.remove();
          },
          ExportDefaultDeclaration: (nodePath) => {
            nodePath.remove();
          }
        });

        resolve(resource);
      }
    });
  }
}
