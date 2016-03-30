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
          if (nodePath.get('object').matchesPattern('process.env')) {
            const key = nodePath.toComputedKey();
            if (t.isStringLiteral(key)) {
              nodePath.replaceWith(t.valueToNode(process.env[key.value]));
            }
          }
        }
      });

      resolve(resource);
    });
  }
}
