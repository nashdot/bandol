import * as fs from 'fs';
import * as path from 'path';
import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer';
    this.version = '0.1.0';

    this.init();
  }

  /* eslint no-param-reassign: 0 */
  optimizeBundle() {
    const imports = new Map();

    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!resource.hasAst) {
        this.log.info(`Can't optimize ${resource.id}`);
      } else {
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
                  this.log.info(`BUG: Same import '${localName}' from different resource ('${id}' - '${imports.get(localName)}')`);
                }

                imports.set(localName, id);
              });
            }
          });
        } catch (err) {
          this.log.info(err.stack);
          const outputPath = `${process.cwd()}/out/${path.basename(resource.id)}`;
          fs.writeFileSync(outputPath, resource.props.code);
        }
      }
    }

    this.log.info('Imports');
    for (const [key, value] of imports.entries()) {
      this.log.info(`-> ${this.bundle.getShortPath(value)}:${key}`);
    }
  }
}
