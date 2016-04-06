import traverse from 'babel-traverse';
import * as t from 'babel-types';

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

      traverse(resource.ast, {
        ImportDeclaration: (nodePath) => {
          const node = nodePath.node;
          const sourceId = this.bundle.resolveResource(node.source.value, resource.id);
          node.specifiers.forEach(specifier => {
            if (t.isImportDefaultSpecifier(specifier)) {
              // Get exported name
              const name = this.bundle.defaultExportsById.get(sourceId);
              this.log.info(`Exported name: '${name}' from ${sourceId}`);
              nodePath.parentPath.scope.rename(specifier.local.name, name);
            }
          });

          nodePath.remove();
        }
      });
    }
  }
}
