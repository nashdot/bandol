import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-es6-imports';
    this.version = '0.1.0';

    this.init();
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!resource.hasAst) {
        this.log.info(`Can't optimize ${resource.id}`);
      } else {
        traverse(resource.props.ast, {
          ImportDeclaration: (nodePath) => {
            nodePath.remove();
          }
        });
      }
    }
  }
}
