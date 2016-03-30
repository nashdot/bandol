import _ from 'lodash';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-es6-imports';
    this.version = '0.1.0';

    this.init();
  }

  /* eslint no-param-reassign: 0 */
  normalizeResource(resource) {
    return new Promise((resolve) => {
      // Transform namespace import to named imports
      const transformNamespaceImport = {
        MemberExpression: (nodePath) => {
          // Found <namespace>.<varaible>
          if (t.isIdentifier(nodePath.node.object)
              && nodePath.node.object.name === this.opts.namespace) {
            const programPath = this.getProgramPath(nodePath);
            const originalImportName = nodePath.node.property.name;
            let importName = originalImportName;

            if (programPath.scope.bindings[importName]) {
              // Imported name is already in use, rename it
              // TODO: Verify if this name is not used by module exports
              importName = this.bundle.generateUid();
              nodePath.parentPath.scope.rename(nodePath.node.property.name, importName);
            }

            // Replace MemberExpression by Identifier
            nodePath.replaceWith(t.identifier(nodePath.node.property.name));

            // Add named import
            programPath.unshiftContainer(
              'body',
              t.importDeclaration(
                [t.importSpecifier(t.identifier(originalImportName), t.identifier(originalImportName))],
                t.stringLiteral(this.opts.importedModule)));
          }
        }
      };

      traverse(resource.ast, {
        // - 1. Remove aliases from named imports
        // - 2. Expand namespace import to named imports
        ImportDeclaration: (nodePath) => {
          const node = nodePath.node;

          node.specifiers.forEach(specifier => {
            // ImportDefaultSpecifier don't have aliases
            if (t.isImportSpecifier(specifier)
                && specifier.imported.name !== specifier.local.name) {
              if (nodePath.parentPath.scope.bindings[specifier.imported.name]) {
                // Imported name is already in use, rename it
                // TODO: Verify if this name is not used by module exports
                nodePath.parentPath.scope.rename(specifier.imported.name, this.bundle.generateUid());
              }

              // Rename referenced alias by real import name
              nodePath.parentPath.scope.rename(specifier.local.name, specifier.imported.name);

              // Make alias identical to imported
              specifier.local = _.clone(specifier.imported);
            } else if (t.isImportNamespaceSpecifier(specifier)) {
              // Temporary options object for worker visitor
              this.opts = {
                importedModule: nodePath.node.source.value,
                namespace: specifier.local.name
              };
              nodePath.parentPath.traverse(transformNamespaceImport);
              delete this.opts;
              nodePath.remove();
            }
          });
        }
      });

      resolve(resource);
    });
  }
}
