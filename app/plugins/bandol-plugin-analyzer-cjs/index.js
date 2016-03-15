import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'analyzer-cjs';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  /* eslint no-param-reassign: 0 */
  analyzeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't analyze ${resource.id}`);
        resolve(resource);
      } else {
        const dependencies = resource.dependencies;

        traverse(resource.props.ast, {
          CallExpression: (nodePath) => {
            const node = nodePath.node;

            if (node.callee.name !== 'require') return;
            if (node.arguments.length !== 1 || node.arguments[0].type !== 'StringLiteral') return; // TODO handle these weird cases?

            const source = node.arguments[0].value;
            const id = this.bundle.resolveResource(source, resource.id);

            if (!~dependencies.indexOf(id)) {
              dependencies.push(id);
            }
          }
        });

        resource.dependencies = dependencies;
        resolve(resource);
      }
    });
  }
}
