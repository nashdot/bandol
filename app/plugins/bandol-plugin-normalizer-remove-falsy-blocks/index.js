import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-remove-falsy-blocks';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;
    this.supportedExtensions = ['.js', '.jsx'];

    this.init();
  }

  /* eslint no-param-reassign: 0 */
  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log.info(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        try {
          traverse(resource.props.ast, {
            IfStatement: (nodePath) => {
              const test = nodePath.get('test');
              const evaluated = test.evaluate();
              if (evaluated.confident) {
                if (evaluated.value === true) {
                  nodePath.replaceWithMultiple(nodePath.node.consequent.body);
                } else if (evaluated.value === false) {
                  if (nodePath.node.alternate) {
                    nodePath.replaceWithMultiple(nodePath.node.alternate.body);
                  } else {
                    nodePath.remove();
                  }
                }
              }
            }
          });
        } catch (err) {
          this.log.info(err.stack);
        }
        resolve(resource);
      }
    });
  }
}
