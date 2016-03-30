import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-running-context';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;

    this.init();
  }

  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (resource.type !== this.resourceType) {
        this.log.info(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        traverse(resource.props.ast, {
          Identifier: (nodePath) => {
            if (this.bundle.runningContext.has(nodePath.node.name)) {
              const runningValue = this.bundle.runningContext.get(nodePath.node.name);
              nodePath.replaceWith(t.identifier(runningValue));
            }
          }
        });

        resolve(resource);
      }
    });
  }
}
