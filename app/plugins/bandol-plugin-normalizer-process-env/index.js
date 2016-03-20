import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'normalizer-process-env';
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
        this.log('Processing...');
        try {
          traverse(resource.props.ast, {
            MemberExpression: (nodePath) => {
              if (nodePath.get('object').matchesPattern('process.env')) {
                const key = nodePath.toComputedKey();
                if (t.isStringLiteral(key)) {
                  nodePath.replaceWith(t.valueToNode(process.env[key.value]));
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
