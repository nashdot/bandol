import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {

  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-process-env';
    this.version = '0.1.0';

    this.init();
  }

  normalizeResource(resource) {
    return new Promise((resolve) => {
      traverse(resource.ast, {
        MemberExpression: (nodePath) => {
          const node = nodePath.node;
          if (nodePath.parentPath.type !== 'MemberExpression'
              && node.object.type === 'MemberExpression'
              && node.object.object.type === 'Identifier'
              && node.object.object.name === 'process'
              && node.object.property.type === 'Identifier'
              && node.object.property.name === 'env') {
            this.logAst(node);
            nodePath.replaceWith(t.valueToNode(process.env[node.property.name]));
          }
        }
      });

      resolve(resource);
    });
  }
}
