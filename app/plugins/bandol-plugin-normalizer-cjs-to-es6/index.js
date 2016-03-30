import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-cjs-to-es6';
    this.version = '0.1.0';

    this.init();
  }

  // module.exports
  _isModuleExports(node) {
    return t.isMemberExpression(node.left)
      && t.isIdentifier(node.left.object)
      && node.left.object.name === 'module'
      && t.isIdentifier(node.left.property)
      && node.left.property.name === 'exports';
  }

  _isNamedModuleExports(node) {
    return t.isMemberExpression(node.left)
      && t.isMemberExpression(node.left.object)
      && t.isIdentifier(node.left.object.object)
      && node.left.object.object.name === 'module'
      && t.isIdentifier(node.left.object.property)
      && node.left.object.property.name === 'exports'
      && t.isIdentifier(node.left.property);
  }

  _isRequireCall(node) {
    return t.isIdentifier(node.callee)
      && node.callee.name === 'require'
      && node.arguments.length === 1
      && t.isStringLiteral(node.arguments[0]);
  }

  normalizeResource(resource) {
    return new Promise((resolve) => {
      traverse(resource.ast, {
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
              this.log.info(`TODO: module.exports.${id} = ...`);
            }
          }
        },
        // Convert CommonJS to ES6 imports
        VariableDeclarator: (nodePath) => {
          const node = nodePath.node;

          if (t.isVariableDeclaration(nodePath.parentPath.node)) {
            if (t.isCallExpression(node.init)
                && this._isRequireCall(node.init)) {
              if (t.isIdentifier(node.id)) {
                // this.log.info(`Converting ${node.id.name}`);
                const programPath = this.getProgramPath(nodePath);

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
                this.log.info('TODO: require() - other cases');
              }
            }
          }
        }
      });

      resolve(resource);
    });
  }
}
