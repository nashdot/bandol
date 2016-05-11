import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-rename-internals';
    this.version = '0.1.0';

    this.init();
  }

  optimizeBundle(resource) {
    traverse(resource.ast, {
      // Rename global but internally used variables
      Program: (nodePath) => {
        Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
          const binding = nodePath.scope.bindings[bindingName];
          if (binding.kind !== 'module'
              && !this.bundle.hasName(bindingName)) {
            const newName = this.bundle.generateUid();
            nodePath.scope.rename(bindingName, newName);
          }
        });
      },
      // Rename function's local variables if already used by globals
      FunctionDeclaration: (nodePath) => {
        Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
          if (this.bundle.hasName(bindingName)) {
            const newName = this.bundle.generateUid();
            nodePath.scope.rename(bindingName, newName);
          }
        });
      }
    });
  }
}
