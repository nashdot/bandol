import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-named-members';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;
    this.supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

    this.init();
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log.info(`Can't optimize ${resource.id}`);
      } else {
        const transformNamespaceVariables = {
          Identifier: (nodePath) => {
            // Last condition: traverse going inside new added statement
            if (nodePath.node.name === this.opts.identifier
                && !t.isImportSpecifier(nodePath.parentPath)
                && !t.isImportDefaultSpecifier(nodePath.parentPath)
                && !t.isObjectProperty(nodePath.parentPath)
                && !t.isMemberExpression(nodePath.parentPath)) {
              nodePath.replaceWith(t.memberExpression(
                t.identifier(this.opts.namespace), t.identifier(this.opts.identifier)));
            }
          }
        };

        traverse(resource.props.ast, {
          ImportDeclaration: (nodePath) => {
            const node = nodePath.node;

            node.specifiers.forEach(specifier => {
              const name = specifier.local.name;
              const source = node.source.value;
              const id = this.bundle.resolveResource(source, resource.id);

              if (!this.bundle.namedExportsByName.has(name)
                  && !this.bundle.defaultExportsByName.has(name)) {
                this.opts = {
                  identifier: name,
                  namespace: this.bundle.defaultExportsById.get(id)
                };
                nodePath.parentPath.traverse(transformNamespaceVariables);
                delete this.opts;
              }
            });
          }
        });
      }
    }
  }
}
