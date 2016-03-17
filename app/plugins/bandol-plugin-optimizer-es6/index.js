import * as fs from 'fs';
import * as path from 'path';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'optimizer-es6';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  _getPreferedDefaultExportName(index, id) {
    let name = '';
    for (let i = index; i < this.bundle.sortedResources.length; i++) {
      const resource = this.bundle.sortedResources[i];
      for (const [key, value] of resource.props.imports.entries()) {
        if (value.id === id && value.name === 'default') {
          if (name !== '' && name !== key) {
            this.log(`Warning: the same default export have different import names: '${name}' vs '${key}'`);
          }
          name = key;
          break;
        }
      }
    }

    return name;
  }

  /* eslint no-param-reassign: 0 */
  optimizeBundle() {
    for (let i = 0; i < this.bundle.sortedResources.length; i++) {
      const resource = this.bundle.sortedResources[i];

      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't optimize ${resource.id}`);
      } else {
        const moduleExports = resource.props.exports;

        traverse(resource.props.ast, {
          ImportDeclaration: (nodePath) => {
            // TODO:
            // - Verfiy if imported name equal the exported one
            // - If not: rename import and used variable name
            nodePath.remove();
          },
          ExportDefaultDeclaration: (nodePath) => {
            const node = nodePath.node;

            // TODO:
            // - Verify if exported name is in conflict with future exports from other modules
            // - If so: rename it with original variable/function/class name
            if (node.declaration.type === 'Identifier') {
              const name = this._getPreferedDefaultExportName(i + 1, resource.id);
              if (name !== node.declaration.name) {
                if (nodePath.parentPath.scope.bindings[name]) {
                  this.log(`Warning: new name '${name}' is used`);
                } else {
                  nodePath.parentPath.scope.rename(node.declaration.name, name);
                }
              }

              moduleExports.set(name, {
                id: 'default',
                type: 'named_variable'
              });
              nodePath.remove();
            } else if (node.declaration.type === 'FunctionDeclaration') {
              if (node.declaration.id) {
                moduleExports.set(node.declaration.id.name, {
                  id: 'default',
                  type: 'named_function'
                });
              } else {
                // TODO: convert to NamedFunction?
                moduleExports.set('default', {
                  id: 'default',
                  type: 'function'
                });
              }
            } else {
              let newId = path.basename(resource.id, path.extname(resource.id));
              if (nodePath.scope.hasBinding(newId)) {
                newId = nodePath.scope.generateUid(newId);
              }

              moduleExports.set(newId, {
                id: 'default',
                type: 'named_variable'
              });

              nodePath.replaceWith(t.variableDeclaration('var', [
                t.variableDeclarator(t.identifier(newId), node.declaration)
              ]));
            }
          },
          ExportNamedDeclaration: (nodePath) => {
            const node = nodePath.node;

            if (node.declaration) {
              if (node.declaration.type === 'FunctionDeclaration') {
                moduleExports.set(node.declaration.id.name, {
                  id: node.declaration.id.name,
                  type: 'function'
                });
                const { id: id, params: params, body: body, generator: generator } = node.declaration;
                nodePath.insertBefore(t.functionDeclaration(id, params, body, generator, node.declaration.async));
                nodePath.remove();
              } else {
                node.declaration.declarations.forEach(decl => {
                  moduleExports.set(decl.id.name, {
                    id: decl.id.name,
                    type: 'variable'
                  });
                  nodePath.insertBefore(t.variableDeclaration('var', [
                    t.variableDeclarator(decl.id, decl.init)
                  ]));
                });
                nodePath.remove();
              }
            } else {
              node.declaration.specifiers.forEach(spec => {
                // TODO: exports from another source (export { xxx } from 'yyy';)
                moduleExports.set(spec.local.name, {
                  id: spec.exported.name,
                  type: 'any'
                });
              });
            }
          },
          ExportAllDeclaration: (nodePath) => {
            // TODO
            this.log(`TODO: ExportAllDeclaration from ${nodePath.node.source.value}`);
          }
        });

        // Rename variables not used externally
        try {
          traverse(resource.props.ast, {
            Program: (nodePath) => {
              Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
                const binding = nodePath.scope.bindings[bindingName];
                if (binding.kind !== 'module' && !moduleExports.has(bindingName)) {
                  nodePath.scope.rename(bindingName, this.bundle.generateUid());
                }
              });
            }
          });
        } catch (err) {
          this.log(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }

        resource.props.exports = moduleExports;
      }
    }
  }
}
