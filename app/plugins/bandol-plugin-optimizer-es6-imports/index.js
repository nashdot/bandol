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

      const transformNamespaceVariables = {
        Identifier: (nodePath) => {
          // Last condition: traverse going inside new added statement
          if (nodePath.node.name === this.opts.identifier
              && !t.isImportSpecifier(nodePath.parentPath)
              && !t.isImportDefaultSpecifier(nodePath.parentPath)
              && !t.isObjectProperty(nodePath.parentPath)
              && !t.isMemberExpression(nodePath.parentPath)) {
            nodePath.replaceWith(t.memberExpression(
              t.identifier(this.opts.namespace), t.identifier(this.opts.identifier)));
          }
        }
      };

      traverse(resource.ast, {
        ImportDeclaration: (nodePath) => {
          const node = nodePath.node;
          const sourceId = this.bundle.resolveResource(node.source.value, resource.id);
          node.specifiers.forEach(specifier => {
            if (t.isImportDefaultSpecifier(specifier)) {
              // Get exported name
              const name = this.bundle.defaultExportsById.get(sourceId);
              nodePath.parentPath.scope.rename(specifier.local.name, name);
            } else if (t.isImportNamespaceSpecifier(specifier)) {
              throw new Error('TODO: ImportNamespaceSpecifier');
            } else {
              const name = this.bundle.namedExportsById.get(`${sourceId}_${specifier.imported.name}`);
              if (name) {
                nodePath.parentPath.scope.rename(specifier.local.name, name);
              } else {
                // Namespace
                const id = this.bundle.resolveResource(node.source.value, resource.id);
                this.opts = {
                  identifier: specifier.local.name,
                  namespace: this.bundle.defaultExportsById.get(id)
                };
                nodePath.parentPath.traverse(transformNamespaceVariables);
                delete this.opts;
              }
            }
          });

          nodePath.remove();
        }
      });
    }
  }
}
