import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'normalizer-js';
  version = '1.0.0';
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

  /* eslint no-param-reassign: 0 */
  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        try {
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
            VariableDeclarator: (nodePath) => {
              const node = nodePath.node;

              if (t.isVariableDeclaration(nodePath.parentPath.node)
                    && t.isProgram(nodePath.parentPath.parentPath.node)) {
                if (node.init && node.init.type === 'CallExpression'
                    && this._isRequireCall(node.init)) {
                  if (node.id.type === 'Identifier') {
                    // Add import statement
                    nodePath.parentPath.insertAfter(
                      t.importDeclaration(
                        [t.importDefaultSpecifier(node.id)], t.stringLiteral(node.init.arguments[0].value)));

                    // Remove original declarator
                    nodePath.remove();

                    // Change binding type if presents
                    const binding = nodePath.parentPath.parentPath.scope.bindings[node.id.name];
                    binding.kind = 'module';
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
