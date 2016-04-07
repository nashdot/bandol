import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-es6-exports';
    this.version = '0.1.0';

    this.init();
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

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

      traverse(resource.ast, {
        ExportDefaultDeclaration: (nodePath) => {
          const node = nodePath.node;

          if (t.isIdentifier(node.declaration)) {
            let name = node.declaration.name;
            if (this.bundle.defaultExportsByName.has(name)
                || this.bundle.namedExportsByName.has(name)) {
              // Already used by another module
              this.log.info(`Already used: '${name}'`);
              name = this.bundle.generateUid();
              this.log.info(`New name: '${name}'`);
              nodePath.parentPath.scope.rename(node.declaration.name, name);
            }

            const type = '';
            this.opts = {
              identifier: name,
              type: type,
              excludeType: 'ExportDefaultDeclaration'
            };
            nodePath.parentPath.traverse(transformExportedDeclaration);

            this.log.info(`Declaration type for ${name}: '${this.opts.type}'`);
            delete this.opts;

            this.log.info(`Module: ${resource.id}`);
            this.bundle.defaultExportsByName.set(name, resource.id);
            this.bundle.defaultExportsById.set(resource.id, name);
            nodePath.remove();
          } else {
            throw new Error(`${this.bundle.getShortPath(resource.id)} should be normalised.`);
          }
        },
        ExportNamedDeclaration: (nodePath) => {
          const node = nodePath.node;

          if (node.source === null) {
            if (!node.declaration) {
              node.specifiers.forEach(spec => {
                let name = spec.exported.name;
                const originalName = name;
                if (this.bundle.defaultExportsByName.has(name)
                    || this.bundle.namedExportsByName.has(name)) {
                  // Already used by another module
                  name = this.bundle.generateUid();
                  nodePath.parentPath.scope.rename(originalName, name);
                }

                // Register
                this.bundle.namedExportsByName.set(name, resource.id);
                this.bundle.namedExportsById.set(`${resource.id}_${originalName}`, name);
                nodePath.remove();
              });
            } else {
              throw new Error(`${this.bundle.getShortPath(resource.id)} should be normalised.`);
            }
          } else {
            throw new Error(`TODO: ExportNamedDeclaration from ${nodePath.node.source.value}`);
          }
        },
        ExportAllDeclaration: (nodePath) => {
          throw new Error(`TODO: ExportAllDeclaration from ${nodePath.node.source.value}`);
        }
      });
    }
  }
}
