import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'analyzer-cjs';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;
    this.supportedExtensions = ['.js', '.jsx'];

    this.bundle = bundle;
    this.init();
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
