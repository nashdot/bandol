import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-remove-deprecated';
    this.version = '0.1.0';

    this.init();
  }

  normalizeResource(resource) {
    return new Promise((resolve) => {
      traverse(resource.ast, {
        CallExpression: (nodePath) => {
          const node = nodePath.node;
          if (t.isIdentifier(node.callee) && node.callee.name === 'deprecated') {
            nodePath.replaceWith(t.nullLiteral());
          }
        }
      });

      resolve(resource);
    });
  }
}
