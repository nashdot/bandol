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

      const transformNamespaceImport = {
        MemberExpression: (nodePath) => {
          // Found <namespace>.<varaible>
          if (t.isIdentifier(nodePath.node.object)
              && nodePath.node.object.name === this.opts.namespace) {
            const importName = nodePath.node.property.name;

            const name = this.bundle.getNamedName(this.opts.sourceId, importName);
            // Replace MemberExpression by Identifier
            nodePath.replaceWith(t.identifier(name));
            // Mark as used
            this.bundle.markUsed(this.opts.sourceId, importName);
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
              const name = this.bundle.getDefaultName(sourceId);
              nodePath.parentPath.scope.rename(specifier.local.name, name);
              // Mark as used
              this.bundle.markUsed(sourceId, name);
            } else if (t.isImportNamespaceSpecifier(specifier)) {
              // Temporary options object for worker visitor
              this.opts = {
                importedModule: nodePath.node.source.value,
                namespace: specifier.local.name,
                sourceId: sourceId
              };
              nodePath.parentPath.traverse(transformNamespaceImport);
              delete this.opts;
            } else {
              const name = this.bundle.getNamedName(sourceId, specifier.imported.name);
              if (name) {
                nodePath.parentPath.scope.rename(specifier.local.name, name);
                // Mark as used
                this.bundle.markUsed(sourceId, name);
              } else {
                // Namespace
                const id = this.bundle.resolveResource(node.source.value, resource.id);
                this.opts = {
                  identifier: specifier.local.name,
                  namespace: this.bundle.getDefaultName(id)
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
