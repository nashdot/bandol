import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-es6-exports';
    this.version = '0.1.0';

    this.init();
  }

  //
  // see: http://exploringjs.com/es6/ch_modules.html
  // § 16.4.4 All exporting styles
  //
  normalizeResource(resource) {
    return new Promise((resolve) => {
      traverse(resource.ast, {
        ExportDefaultDeclaration: (nodePath) => {
          const node = nodePath.node;
          const name = this.bundle.getShortName(resource.id);

          if (t.isIdentifier(node.declaration)) {
          // -- Variable
            if (name !== node.declaration.name) {
              if (nodePath.parentPath.scope.hasBinding(name)) {
                nodePath.parentPath.scope.rename(name, this.bundle.generateUid());
              }
              // Replace with new name export
              nodePath.parentPath.scope.rename(node.declaration.name, name);
              nodePath.replaceWith(t.exportDefaultDeclaration(t.identifier(name)));
            }
            // else: already normalized
          } else if (t.isFunctionDeclaration(node.declaration)) {
          // -- Function declaration
            if (node.declaration.id) {
              if (name !== node.declaration.id.name) {
                if (nodePath.parentPath.scope.hasBinding(name)) {
                  nodePath.parentPath.scope.rename(name, this.bundle.generateUid());
                }
                // TODO: this rename add ExportNamedDeclaration...!!!
                // nodePath.parentPath.scope.rename(node.declaration.id.name, name);
              }
            }

            const { params: params, body: body, generator: generator } = node.declaration;
            nodePath.replaceWithMultiple([
              t.functionDeclaration(t.identifier(name), params, body, generator, node.declaration.async),
              t.exportDefaultDeclaration(t.identifier(name))
            ]);
          } else if (t.isClassDeclaration(node.declaration)) {
          // Class declaration
            if (node.declaration.id) {
              if (name !== node.declaration.id.name) {
                if (nodePath.parentPath.scope.hasBinding(name)) {
                  nodePath.parentPath.scope.rename(name, this.bundle.generateUid());
                }
                // TODO: this rename add ExportNamedDeclaration...!!!
                // nodePath.parentPath.scope.rename(node.declaration.id.name, name);
              }
            }

            const { id: id, superClass: superClass, body: body } = node.declaration;
            nodePath.replaceWithMultiple([
              t.classDeclaration(id, superClass, body, []),
              t.exportDefaultDeclaration(t.identifier(name))
            ]);
          } else if (t.isAssignmentExpression(node.declaration)) {
            if (nodePath.parentPath.scope.hasBinding(name)) {
              nodePath.parentPath.scope.rename(name, this.bundle.generateUid());
            }

            nodePath.replaceWithMultiple([
              t.variableDeclaration('var', [
                t.variableDeclarator(t.identifier(name), node.declaration.right)
              ]),
              t.exportDefaultDeclaration(t.identifier(name))
            ]);
          } else {
            if (nodePath.parentPath.scope.hasBinding(name)) {
              nodePath.parentPath.scope.rename(name, this.bundle.generateUid());
            }

            nodePath.replaceWithMultiple([
              t.variableDeclaration('var', [
                t.variableDeclarator(t.identifier(name), node.declaration)
              ]),
              t.exportDefaultDeclaration(t.identifier(name))
            ]);
          }
        },
        // Normalize all named exports to exports via a clause
        ExportNamedDeclaration: (nodePath) => {
          const node = nodePath.node;

          if (node.declaration) {
          // -- Inline exports
            if (t.isFunctionDeclaration(node.declaration)) {
            // -- Function declaration
              const { id: id, params: params, body: body, generator: generator } = node.declaration;
              nodePath.replaceWithMultiple([
                t.functionDeclaration(id, params, body, generator, node.declaration.async),
                t.exportNamedDeclaration(null, [t.exportSpecifier(id, id)], null)
              ]);
            } else if (t.isClassDeclaration(node.declaration)) {
            // -- Class declaration
              const { id: id, superClass: superClass, body: body } = node.declaration;
              nodePath.replaceWithMultiple([
                t.classDeclaration(id, superClass, body, []),
                t.exportNamedDeclaration(null, [t.exportSpecifier(id, id)], null)
              ]);
            } else {
            // -- Variable declarations
              const varDeclarations = [];
              const exportDeclarations = [];
              node.declaration.declarations.forEach(decl => {
                varDeclarations.push(t.variableDeclaration(node.declaration.kind, [
                  t.variableDeclarator(decl.id, decl.init)
                ]));
                exportDeclarations.push(t.exportNamedDeclaration(null, [t.exportSpecifier(decl.id, decl.id)], null));
              });
              nodePath.replaceWithMultiple([
                ...varDeclarations,
                ...exportDeclarations
              ]);
            }
          } // else: -- Re-export via a clause (can't normalize)
          // -- Export via a clause (normalized)
        }
        // -- Re-export everything (can't normalize)
      });

      resolve(resource);
    });
  }
}
