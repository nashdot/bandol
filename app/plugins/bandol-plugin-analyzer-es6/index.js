import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'analyzer-es6';
    this.version = '0.1.0';

    this.init();
  }

  /* eslint no-param-reassign: 0 */
  analyzeResource(resource) {
    return new Promise((resolve) => {
      const dependencies = resource.dependencies;

      // Collect dependencies
      traverse(resource.ast, {
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
    });
  }
}
