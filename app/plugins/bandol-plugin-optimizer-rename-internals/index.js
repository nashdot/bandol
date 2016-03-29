import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-rename-internals';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;
    this.supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

    this.init();
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log.info(`Can't optimize ${resource.id}`);
      } else {
        // Rename global but internally used variables
        traverse(resource.props.ast, {
          Program: (nodePath) => {
            Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
              const binding = nodePath.scope.bindings[bindingName];
              if (binding.kind !== 'module'
                  && !this.bundle.defaultExportsByName.has(bindingName)
                  && !this.bundle.namedExportsByName.has(bindingName)) {
                const newName = this.bundle.generateUid();
                // this.log.info(`${this.bundle.getShortPath(resource.id)}: Renamed ${bindingName} to ${newName}`);
                nodePath.scope.rename(bindingName, newName);
              }
            });
          }
        });
      }
    }
  }
}
