import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'optimizer-es6-exports';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
    this.init();
  }

  _getPreferedDefaultExportName(id) {
    // Name of the resource himself
    let name = this.bundle.getShortName(id);
    if (this.bundle.defaultExportsByName.has(name)
        || this.bundle.namedExportsByName.has(name)) {
      // Already used by another module
      name = this.bundle.generateUid();
    }

    return name;
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't optimize ${resource.id}`);
      } else {
        traverse(resource.props.ast, {
          ExportDefaultDeclaration: (nodePath) => {
            const node = nodePath.node;

            if (t.isIdentifier(node.declaration)) {
              let name = node.declaration.name;
              if (this.bundle.defaultExportsByName.has(name)
                  || this.bundle.namedExportsByName.has(name)) {
                // Already used by another module
                name = this.bundle.generateUid();
                nodePath.parentPath.scope.rename(node.declaration.name, name);
              }

              this.bundle.defaultExportsByName.set(name, resource.id);
              this.bundle.defaultExportsById.set(resource.id, name);
              nodePath.remove();
            }
          },
          ExportNamedDeclaration: (nodePath) => {
            const node = nodePath.node;

            if (!node.declaration) {
              node.specifiers.forEach(spec => {
                let name = spec.exported.name;
                if (this.bundle.defaultExportsByName.has(name)
                    || this.bundle.namedExportsByName.has(name)) {
                  // Already used by another module
                  name = this.bundle.generateUid();
                  nodePath.parentPath.scope.rename(spec.exported.name, name);
                  // Register transformation
                  this.bundle.renamedExports.set({ id: resource.id, name: spec.exported.name }, name);
                }

                this.bundle.namedExportsByName.set(name, resource.id);
                if (this.bundle.namedExportsById.has(resource.id)) {
                  const names = this.bundle.namedExportsById.get(resource.id);
                  this.bundle.namedExportsById.set(resource.id, [...names, name]);
                } else {
                  this.bundle.namedExportsById.set(resource.id, [name]);
                }
                nodePath.remove();
              });
            } else {
              this.log('ERROR: found export with declaration');
            }
          },
          ExportAllDeclaration: (nodePath) => {
            // TODO
            this.log(`TODO: ExportAllDeclaration from ${nodePath.node.source.value}`);
          }
        });
      }
    }
  }
}
