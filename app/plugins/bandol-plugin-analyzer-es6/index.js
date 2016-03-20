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
    this.init();
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
                if (t.isImportDefaultSpecifier(specifier)) {
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
