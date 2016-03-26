import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-es6-exports';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;
    this.supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

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
        this.log.info(`Can't optimize ${resource.id}`);
      } else {
        const transformExportedDeclaration = {
          Identifier: (nodePath) => {
            // Last condition: traverse going inside new added statement
            if (nodePath.node.name === this.opts.identifier
                && nodePath.parentPath.node.type !== this.opts.excludeType) {
              const parentType = nodePath.parentPath.node.type;
              // VariableDeclarator
              if (parentType === 'VariableDeclarator') {
                // this.log.info(`VariableDeclarator: ${nodePath.parentPath.node.init.type}`);
                // this.log.info(`Resource: ${this.bundle.getShortName(resource.id)}`);
                // this.logAst(nodePath.parentPath.node);
              }
              // MemberExpression
              // CallExpression
              // FunctionDeclaration
              // AssignmentExpression
              this.opts.type = nodePath.parentPath.node.type;
            }
          }
        };

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

              const type = '';
              this.opts = {
                identifier: name,
                type: type,
                excludeType: 'ExportDefaultDeclaration'
              };
              nodePath.parentPath.traverse(transformExportedDeclaration);

              // const declPath = nodePath.getSibling(name);
              this.log.info(`Declaration type for ${name}: '${this.opts.type}'`);
              delete this.opts;

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
              this.log.info('ERROR: found export with declaration');
            }
          },
          ExportAllDeclaration: (nodePath) => {
            // TODO
            this.log.info(`TODO: ExportAllDeclaration from ${nodePath.node.source.value}`);
          }
        });
      }
    }
  }
}
