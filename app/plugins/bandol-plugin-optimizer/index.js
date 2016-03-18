import * as fs from 'fs';
import * as path from 'path';
import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'optimizer';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
    this.init();
  }

  /* eslint no-param-reassign: 0 */
  optimizeBundle() {
    const imports = new Map();

    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't optimize ${resource.id}`);
      } else {
        const moduleExports = resource.props.exports;

        try {
          traverse(resource.props.ast, {
            ImportDeclaration: (nodePath) => {
              const node = nodePath.node;
              const source = node.source.value;
              const id = this.bundle.resolveResource(source, resource.id);

              node.specifiers.forEach(specifier => {
                const localName = specifier.local.name;

                if (imports.has(localName)) {
                  if (imports.get(localName) === id) {
                    return;
                  }
                  this.log(`BUG: Same import '${localName}' from different resource ('${id}' - '${imports.get(localName)}')`);
                }

                imports.set(localName, id);
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

    this.log('Imports');
    for (const [key, value] of imports.entries()) {
      this.log(`${this.bundle.getShortPath(value)}:${key}`);
    }
  }
}
