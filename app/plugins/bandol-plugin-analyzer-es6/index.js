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
        const dependencies = resource.dependencies;
        const imports = resource.props.imports;

        // Collect imports/dependencies
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
          }
        });

        // Optimize imports/dependencies
        traverse(resource.props.ast, {
          CallExpression: (nodePath) => {
            const node = nodePath.node;
            if (node.callee.type === 'Identifier' && imports.has(node.callee.name)) {
              const item = imports.get(node.callee.name);
              item.isUsed = true;
              imports.set(node.callee.name, item);
            } else if (node.callee.type === 'MemberExpression' && imports.has(node.callee.object.name)) {
              const item = imports.get(node.callee.object.name);
              item.isUsed = true;
              imports.set(node.callee.object.name, item);
            }
          },
          ObjectExpression: (nodePath) => {
            const node = nodePath.node;
            for (const property of node.properties) {
              if (property.shorthand && imports.has(property.key.name)) {
                const item = imports.get(property.key.name);
                item.isUsed = true;
                imports.set(property.key.name, item);
              } else if (!property.shorthand && imports.has(property.value.name)) {
                const item = imports.get(property.value.name);
                item.isUsed = true;
                imports.set(property.value.name, item);
              }
            }
          }
        });

        // Remove unused imports
        imports.forEach((value, key) => {
          if (!value.isUsed) {
            imports.delete(key);
          }
        });

        // Leave only used dependencies
        const usedDependencies = [];
        imports.forEach((value) => {
          if (!~usedDependencies.indexOf(value.id)) {
            usedDependencies.push(value.id);
          }
        });

        resource.dependencies = usedDependencies;
        resource.props.imports = imports;
        resolve(resource);
      }
    });
  }
}
