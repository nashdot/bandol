import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'analyzer-es6';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;

    this.init();
  }

  /* eslint no-param-reassign: 0 */
  analyzeResource(resource) {
    return new Promise((resolve) => {
      if (resource.type !== this.resourceType) {
        this.log.info(`Can't analyze ${this.bundle.getShortPath(resource.id)}`);
        resolve(resource);
      } else {
        const dependencies = resource.dependencies;

        // Collect dependencies
        traverse(resource.props.ast, {
          ImportDeclaration: (nodePath) => {
            const source = nodePath.node.source.value;
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
