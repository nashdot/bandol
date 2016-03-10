import fs from 'fs';
import path from 'path';
import traverse from 'babel-traverse';
import { transformFromAst } from 'babel-core';

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
        const imports = resource.props.imports;

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
            }
          });
        } catch (err) {
          this.log(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }

        try {
          traverse(resource.props.ast, {
            ImportDeclaration: (nodePath) => {
              if (nodePath.node.specifiers.length === 0) {
                this.log(`Remove unused import "${nodePath.node.source.value}"`);
                nodePath.remove();
              }
            }
          });
        } catch (err) {
          this.log(err.stack);
        }

        // Collect imports/dependencies
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

                if (imports.has(localName)) {
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

                imports.set(localName, { id: id, name: name, isUsed: false });
              });
            },
            ExportDefaultDeclaration: (nodePath) => {
              const node = nodePath.node;
              let identifier;
              if (node.declaration.type === 'Identifier') {
                identifier = node.declaration.name;
              } else if (node.declaration.type === 'FunctionDeclaration') {
                if (node.declaration.id) {
                  // Named function
                  identifier = node.declaration.id.name;
                } else {
                  // Anonymous function
                  identifier = '__bandol__anonymous_function';
                }
              } else if (node.declaration.type === 'Literal') {
                identifier = '__bandol__literal';
              }
            },
            ExportNamedDeclaration: (nodePath) => {
              const node = nodePath.node;
            },
            ExportAllDeclaration: (nodePath) => {
              const node = nodePath.node;
            }
          });
        } catch (err) {
          this.log(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }

        resource.dependencies = dependencies;
        resource.props.imports = imports;
        try {
          resource.props.code = transformFromAst(resource.props.ast).code;
        } catch (err) {
          this.log(err.stack);
        }
        resolve(resource);
      }
    });
  }
}
