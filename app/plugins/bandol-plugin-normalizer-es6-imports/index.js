import _ from 'lodash';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'normalizer-es6-imports';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  _getProgramParent(nodePath) {
    do {
      if (t.isProgram(nodePath)) {
        break;
      }
      nodePath = nodePath.parentPath;
    } while (nodePath);

    if (!nodePath || !t.isProgram(nodePath)) {
      throw new Error('No Program node found');
    }

    return nodePath;
  }

  /* eslint no-param-reassign: 0 */
  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        try {
          // Transform namespace import to named imports
          const transformNamespaceImport = {
            MemberExpression: (nodePath) => {
              // Found <namespace>.<varaible>
              if (nodePath.node.object.type === 'Identifier'
                  && nodePath.node.object.name === this.opts.namespace) {
                const programPath = this._getProgramParent(nodePath);
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

          traverse(resource.props.ast, {
            // - 1. Remove aliases from named imports
            // - 2. Expand namespace import to named imports
            ImportDeclaration: (nodePath) => {
              const node = nodePath.node;

              node.specifiers.forEach(specifier => {
                // ImportDefaultSpecifier don't have aliases
                if (specifier.type === 'ImportSpecifier'
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
                } else if (specifier.type === 'ImportNamespaceSpecifier') {
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
        } catch (e) {
          this.log(e.stack);
        }

        resolve(resource);
      }
    });
  }
}
