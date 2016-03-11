import fs from 'fs';
import path from 'path';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'analyzer-es6';
  version = '1.0.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  /* eslint no-param-reassign: 0 */
  analyzeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't analyze ${resource.id}`);
        resolve(resource);
      } else {
        this.log(`Analyzing ${resource.id}`);
        const dependencies = resource.dependencies;
        const moduleImports = resource.props.imports;
        const moduleExports = resource.props.exports;

        // Optimize unused
        try {
          traverse(resource.props.ast, {
            Program: (nodePath) => {
              Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
                const binding = nodePath.scope.bindings[bindingName];
                if (binding.references === 0) {
                  binding.path.remove();
                }
              });
            },
            ImportDeclaration: (nodePath) => {
              if (nodePath.node.specifiers.length === 0) {
                this.log(`Remove unused import "${nodePath.node.source.value}"`);
                nodePath.remove();
              }
            }
          });
        } catch (err) {
          this.log(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }

        // Collect imports/exports/...
        try {
          traverse(resource.props.ast, {
            ImportDeclaration: (nodePath) => {
              const node = nodePath.node;
              const source = node.source.value;
              const id = this.bundle.resolveResource(source, resource.id);

              if (!~dependencies.indexOf(id)) {
                dependencies.push(id);
              }

              node.specifiers.forEach(specifier => {
                const localName = specifier.local.name;

                if (moduleImports.has(localName)) {
                  const err = new Error(`Duplicated import '${localName}'`);
                  throw err;
                }

                const isDefault = specifier.type === 'ImportDefaultSpecifier';
                const isNamespace = specifier.type === 'ImportNamespaceSpecifier';

                let name;
                if (isDefault) {
                  name = 'default';
                } else if (isNamespace) {
                  name = '*';
                } else {
                  name = specifier.imported.name;
                }

                moduleImports.set(localName, { id: id, name: name });
              });
            },
            ExportDefaultDeclaration: (nodePath) => {
              const node = nodePath.node;

              if (node.declaration.type === 'Identifier') {
                moduleExports.set(node.declaration.name, {
                  id: 'default',
                  type: 'variable'
                });
              } else if (node.declaration.type === 'FunctionDeclaration') {
                if (node.declaration.id) {
                  moduleExports.set(node.declaration.id.name, {
                    id: 'default',
                    type: 'function'
                  });
                } else {
                  // TODO: convert to NamedFunction?
                  moduleExports.set('default', {
                    id: 'default',
                    type: 'function'
                  });
                }
              } else if (node.declaration.type === 'Literal' ||
                         node.declaration.type === 'NumericLiteral' ||
                         node.declaration.type === 'StringLiteral' ||
                         node.declaration.type === 'BooleanLiteral' ||
                         node.declaration.type === 'CallExpression' ||
                         node.declaration.type === 'NewExpression' ||
                         node.declaration.type === 'ObjectExpression' ||
                         node.declaration.type === 'MemberExpression' ||
                         node.declaration.type === 'BinaryExpression') {
                // TODO: assign to global var?
                moduleExports.set('default', {
                  id: 'default',
                  type: 'variable'
                });
              } else {
                this.log(`BUG: Export with ${node.declaration.type}`);
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
                } else {
                  node.declaration.declarations.forEach(decl => {
                    moduleExports.set(decl.id.name, {
                      id: decl.id.name,
                      type: 'variable'
                    });
                  });
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
        } catch (err) {
          this.log(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }

        // Optimizations
        try {
          traverse(resource.props.ast, {
            Program: (nodePath) => {
              Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
                const binding = nodePath.scope.bindings[bindingName];
                if (binding.kind !== 'module' && !moduleExports.has(bindingName)) {
                  nodePath.scope.rename(bindingName, this.bundle.generateUid());
                }
              });
            },
            MemberExpression: (nodePath) => {
              if (nodePath.get('object').matchesPattern('process.env')) {
                const key = nodePath.toComputedKey();
                if (t.isStringLiteral(key)) {
                  nodePath.replaceWith(t.valueToNode(process.env[key.value]));
                }
              }
            }
          });
        } catch (err) {
          this.log(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }

        resource.dependencies = dependencies;
        resource.props.imports = moduleImports;
        resource.props.exports = moduleExports;

        resolve(resource);
      }
    });
  }
}
