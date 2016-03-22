import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'normalizer-remove-falsy-blocks';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
    this.init();
  }

  /* eslint no-param-reassign: 0 */
  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        try {
          traverse(resource.props.ast, {
            IfStatement: (nodePath) => {
              const test = nodePath.get('test');
              const evaluated = test.evaluate();
              if (evaluated.confident) {
                if (evaluated.value === true) {
                  nodePath.replaceWith(nodePath.node.consequent);
                } else if (evaluated.value === false) {
                  if (nodePath.node.alternate) {
                    nodePath.replaceWith(nodePath.node.alternate);
                  } else {
                    this.log(`.removed: ${nodePath.removed}`);
                    nodePath.remove();
                    this.log(`.removed: ${nodePath.removed}`);
                  }
                }
              }
            }
          });
        } catch (err) {
          this.log(err.stack);
        }
        resolve(resource);
      }
    });
  }
}
