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

  /* eslint no-param-reassign: 0 */
  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (resource.haveAst) {
        this.log.info(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        const name = this.bundle.getShortName(resource.id);
        traverse(resource.props.ast, {
          ExportDefaultDeclaration: (nodePath) => {
            const node = nodePath.node;

            if (t.isIdentifier(node.declaration)) {
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
              if (node.declaration.id) {
                if (name !== node.declaration.id.name) {
                  if (nodePath.parentPath.scope.hasBinding(name)) {
                    nodePath.parentPath.scope.rename(name, this.bundle.generateUid());
                  }
                  nodePath.parentPath.scope.rename(node.declaration.id.name, name);
                }
              }

              const { params: params, body: body, generator: generator } = node.declaration;
              nodePath.insertBefore(t.functionDeclaration(t.identifier(name), params, body, generator, node.declaration.async));
              nodePath.replaceWith(t.exportDefaultDeclaration(t.identifier(name)));
            } else if (t.isClassDeclaration(node.declaration)) {
              if (node.declaration.id) {
                if (name !== node.declaration.id.name) {
                  if (nodePath.parentPath.scope.hasBinding(name)) {
                    nodePath.parentPath.scope.rename(name, this.bundle.generateUid());
                  }
                  nodePath.parentPath.scope.rename(node.declaration.id.name, name);
                }
              }

              const { id: id, superClass: superClass, body: body, decorators: decorators } = node.declaration;
              if (Array.isArray(decorators)) {
                nodePath.insertBefore(t.classDeclaration(id, superClass, body, decorators));
              } else {
                nodePath.insertBefore(t.classDeclaration(id, superClass, body, []));
              }
              nodePath.replaceWith(t.exportDefaultDeclaration(t.identifier(name)));
            } else {
              if (nodePath.parentPath.scope.hasBinding(name)) {
                nodePath.parentPath.scope.rename(name, this.bundle.generateUid());
              }

              nodePath.insertBefore(t.variableDeclaration('var', [
                t.variableDeclarator(t.identifier(name), node.declaration)
              ]));
              nodePath.replaceWith(t.exportDefaultDeclaration(t.identifier(name)));
            }
          },
          ExportNamedDeclaration: (nodePath) => {
            const node = nodePath.node;

            if (node.declaration) {
              if (t.isFunctionDeclaration(node.declaration)) {
                const { id: id, params: params, body: body, generator: generator } = node.declaration;
                nodePath.insertBefore(t.functionDeclaration(id, params, body, generator, node.declaration.async));
                nodePath.replaceWith(t.exportNamedDeclaration(null, [t.exportSpecifier(id, id)], null));
              } else if (t.isClassDeclaration(node.declaration)) {
                const { id: id, superClass: superClass, body: body, decorators: decorators } = node.declaration;
                if (Array.isArray(decorators)) {
                  nodePath.insertBefore(t.classDeclaration(id, superClass, body, decorators));
                } else {
                  nodePath.insertBefore(t.classDeclaration(id, superClass, body, []));
                }
                nodePath.replaceWith(t.exportNamedDeclaration(null, [t.exportSpecifier(id, id)], null));
              } else {
                const specifiers = [];
                node.declaration.declarations.forEach(decl => {
                  nodePath.insertBefore(t.variableDeclaration('var', [
                    t.variableDeclarator(decl.id, decl.init)
                  ]));
                  specifiers.push(t.exportSpecifier(decl.id, decl.id));
                });
                nodePath.replaceWith(t.exportNamedDeclaration(null, specifiers, null));
              }
            } else if (node.source) {
              node.specifiers.forEach(spec => {
                this.log.info(`TODO: export { ${spec.exported.name} as ${spec.local.name} } from ${node.source.value}`);
                // Convert to import + assign + export
              });
            }
            // else: already normalized
          }
        });

        resolve(resource);
      }
    });
  }
}
