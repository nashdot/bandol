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

      const isDefaultUsed = {
        Identifier: (nodePath) => {
          // Found <namespace>.<varaible>
          if (nodePath.parentPath.init
              && t.isIdentifier(nodePath.parentPath.init)
              && nodePath.parentPath.init.name === this.opts.namespace) {
            this.opts.isUsed = true;
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

              // Temporary options object for worker visitor
              this.opts = {
                importedModule: node.source.value,
                namespace: name,
                sourceId: sourceId,
                isUsed: false
              };
              nodePath.parentPath.traverse(transformNamespaceImport);

              // Not mark as used if used as namespace import
              nodePath.parentPath.traverse(isDefaultUsed);
              this.log.info(`isUsed: ${this.opts.isUsed}`);
              if (this.opts.isUsed) {
                this.bundle.markUsed(sourceId, name);
              }

              delete this.opts;
            } else if (t.isImportNamespaceSpecifier(specifier)) {
              // Temporary options object for worker visitor
              this.opts = {
                importedModule: node.source.value,
                namespace: specifier.local.name,
                sourceId: sourceId
              };
              nodePath.parentPath.traverse(transformNamespaceImport);
              delete this.opts;
            } else {
              const name = this.bundle.getNamedName(sourceId, specifier.imported.name);
              nodePath.parentPath.scope.rename(specifier.local.name, name);
              // Mark as used
              this.bundle.markUsed(sourceId, name);
            }
          });

          nodePath.remove();
        }
      });
    }
  }
}
