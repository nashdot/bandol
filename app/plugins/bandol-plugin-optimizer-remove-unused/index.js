import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-remove-unused';
    this.version = '0.1.0';

    this.init();
  }

  optimizeBundle(resource) {
    let findNotUsed = true;
    while (findNotUsed) {
      findNotUsed = false;
      traverse.clearCache();

      traverse(resource.ast, {
        Program: (nodePath) => {
          Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
            const binding = nodePath.scope.bindings[bindingName];
            if ((this.bundle.hasName(bindingName)
                  && !this.bundle.isUsed(resource.id, bindingName))
                || (!this.bundle.hasName(bindingName)
                  && binding.references === 0)) {
              this.log.info(`Remove not used: ${this.bundle.getShortPath(resource.id)}:${bindingName}`);
              binding.path.remove();
              findNotUsed = true;
            }
          });
        }
      });
    }
  }
}
