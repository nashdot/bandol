import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'normalizer-running-context';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
    this.init();
  }

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
            Identifier: (nodePath) => {
              if (this.bundle.runningContext.has(nodePath.node.name)) {
                const runningValue = this.bundle.runningContext.get(nodePath.node.name);
                nodePath.replaceWith(t.identifier(runningValue));
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
