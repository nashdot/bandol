import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-remove-unused';
    this.version = '0.1.0';

    this.init();
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      this.log.info(this.bundle.getShortPath(resource.id));
      traverse(resource.ast, {
        Program: (nodePath) => {
          Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
            const binding = nodePath.scope.bindings[bindingName];
            if (!this.bundle.isUsed(resource.id, bindingName)) {
              this.log.info(`Remove not used: ${this.bundle.getShortPath(resource.id)}:${bindingName}`);
              binding.path.remove();
            }
          });
        }
      });
    }
  }
}
