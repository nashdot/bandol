import fs from 'fs';
import path from 'path';
import traverse from 'babel-traverse';

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
        const modeuleImports = resource.props.imports;
        const modeuleExports = resource.props.exports;

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

                if (modeuleImports.has(localName)) {
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

                modeuleImports.set(localName, { id: id, name: name });
              });
            },
            ExportDefaultDeclaration: (nodePath) => {
              const node = nodePath.node;

              if (node.declaration.type === 'Identifier') {
                modeuleExports.set(node.declaration.name, {
                  id: 'default',
                  type: 'variable'
                });
              } else if (node.declaration.type === 'FunctionDeclaration') {
                if (node.declaration.id) {
                  modeuleExports.set(node.declaration.id.name, {
                    id: 'default',
                    type: 'function'
                  });
                } else {
                  // TODO: convert to NamedFunction?
                  modeuleExports.set('default', {
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
                modeuleExports.set('default', {
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
                  modeuleExports.set(node.declaration.id.name, {
                    id: node.declaration.id.name,
                    type: 'function'
                  });
                } else {
                  node.declaration.declarations.forEach(decl => {
                    modeuleExports.set(decl.id.name, {
                      id: decl.id.name,
                      type: 'variable'
                    });
                  });
                }
              } else {
                node.declaration.specifiers.forEach(spec => {
                  // TODO: exports from another source (export { xxx } from 'yyy';)
                  modeuleExports.set(spec.local.name, {
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

        resource.dependencies = dependencies;
        resource.props.imports = modeuleImports;
        resource.props.exports = modeuleExports;

        resolve(resource);
      }
    });
  }
}
