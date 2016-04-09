import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-rename-internals';
    this.version = '0.1.0';

    this.init();
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      // Rename global but internally used variables
      traverse(resource.ast, {
        Program: (nodePath) => {
          Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
            const binding = nodePath.scope.bindings[bindingName];
            if (binding.kind !== 'module'
                && !this.bundle.hasName(bindingName)) {
              const newName = this.bundle.generateUid();
              nodePath.scope.rename(bindingName, newName);
            }
          });
        }
      });
    }
  }
}
