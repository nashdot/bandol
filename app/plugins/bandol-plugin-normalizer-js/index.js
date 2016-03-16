import _ from 'lodash';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'normalizer-js';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  // module.exports
  _isModuleExports(node) {
    return node.left.type === 'MemberExpression'
      && node.left.object.type === 'Identifier'
      && node.left.object.name === 'module'
      && node.left.property.type === 'Identifier'
      && node.left.property.name === 'exports';
  }

  _isNamedModuleExports(node) {
    return node.left.type === 'MemberExpression'
      && node.left.object.type === 'MemberExpression'
      && node.left.object.object.type === 'Identifier'
      && node.left.object.object.name === 'module'
      && node.left.object.property.type === 'Identifier'
      && node.left.object.property.name === 'exports'
      && node.left.property.type === 'Identifier';
  }

  _isRequireCall(node) {
    return node.callee.type === 'Identifier'
      && node.callee.name === 'require'
      && node.arguments.length === 1
      && node.arguments[0].type === 'StringLiteral';
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
                  nodePath.replaceWith(nodePath.node.property);
                }

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
            Program: (nodePath) => {
              const node = nodePath.node;
              // Remove 'use strict' directives
              for (let i = 0; i < node.directives.length; i++) {
                const directive = node.directives[i];
                if (directive.value.value === 'use strict') {
                  node.directives.splice(i, 1);
                }
              }
            },
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
            },
            // Convert CommonJS to ES6 exports
            AssignmentExpression: (nodePath) => {
              const node = nodePath.node;

              if (t.isExpressionStatement(nodePath.parentPath.node)
                  && t.isProgram(nodePath.parentPath.parentPath.node)) {
                if (this._isModuleExports(node)) {
                  // module.exports = expression
                  nodePath.parentPath.replaceWith(t.exportDefaultDeclaration(node.right));
                } else if (this._isNamedModuleExports(node)) {
                  // module.exports.<id> = expression
                  const id = node.left.property.name;
                  this.log(`TODO: module.exports.${id} = ...`);
                }
              }
            },
            // Convert CommonJS to ES6 imports
            VariableDeclarator: (nodePath) => {
              const node = nodePath.node;

              if (t.isVariableDeclaration(nodePath.parentPath.node)) {
                if (node.init && node.init.type === 'CallExpression'
                    && this._isRequireCall(node.init)) {
                  if (node.id.type === 'Identifier') {
                    const programPath = this._getProgramParent(nodePath);

                    // Add import statement
                    programPath.unshiftContainer('body', t.importDeclaration(
                        [t.importDefaultSpecifier(node.id)], t.stringLiteral(node.init.arguments[0].value)));

                    // Remove original declarator
                    nodePath.remove();

                    // Change binding type if presents
                    const binding = programPath.scope.bindings[node.id.name];
                    if (binding) {
                      binding.kind = 'module';
                    }
                  } else {
                    this.log('TODO: require() - other cases');
                  }
                }
              }
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
