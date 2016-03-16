import * as fs from 'fs';
import * as path from 'path';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'analyzer-es6';
  version = '0.1.0';
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
        this.log(`Can't analyze ${this.bundle.getShortPath(resource.id)}`);
        resolve(resource);
      } else {
        const dependencies = resource.dependencies;
        const moduleImports = resource.props.imports;

        // Optimizations
        try {
          traverse(resource.props.ast, {
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

        // Remove falsy blocks
        try {
          traverse(resource.props.ast, {
            IfStatement: (nodePath) => {
              const test = nodePath.get('test');
              const evaluated = test.evaluate();
              if (evaluated.confident) {
                if (evaluated.value === true) {
                  nodePath.replaceWith(nodePath.node.consequent);
                } else if (evaluated.value === false) {
                  if (nodePath.node.alternate) {
                    nodePath.replaceWith(nodePath.node.alternate);
                  } else {
                    nodePath.remove();
                  }
                }
              }
            }
          });
        } catch (err) {
          this.log(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }

        // Optimize unused imports
        // TODO: Should we remove it in HotWatch mode?
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

        // Collect imports
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

                let name;
                if (specifier.type === 'ImportDefaultSpecifier') {
                  name = 'default';
                } else {
                  name = specifier.imported.name;
                }

                moduleImports.set(localName, { id: id, name: name });
              });
            }
          });
        } catch (err) {
          this.log(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }

        resource.dependencies = dependencies;
        resource.props.imports = moduleImports;

        resolve(resource);
      }
    });
  }
}
