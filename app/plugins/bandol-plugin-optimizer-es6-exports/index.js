import traverse from 'babel-traverse';
import * as t from 'babel-types';
import * as a from '../../utils/ast';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-es6-exports';
    this.version = '0.1.0';

    this.init();
  }

  optimizeExportObject(resource, nodePath, node) {
    const normalizedProperties = [];
    const rootPath = this.getRootPath(nodePath);

    let i = 0;
    let shouldReplace = false;
    node.properties.forEach(property => {
      const isSameKeyVar = t.isIdentifier(property.value)
          && property.value.name === property.key.name;
      const name = !(this.bundle.hasName(property.key.name)
          || (!isSameKeyVar && rootPath.scope.bindings[property.key.name])) ? property.key.name : this.bundle.generateUid();
      this.bundle.addNamedExport(resource.id, property.key.name, name, true);

      if (t.isIdentifier(property.value)) {
        // Normalized
        normalizedProperties.push(property);
      } else if (t.isFunctionExpression(property.value)) {
        if (property.value.id) {
          // Replace by name if provided internal function name
          nodePath.parentPath.scope.rename(property.value.id.name, name);
        }
        // Get function definition
        const { params: params, body: body, generator: generator } = property.value;
        // Extract function
        rootPath.insertBefore(t.functionDeclaration(t.identifier(name), params, body, generator, property.value.async));
        // Shorthand
        const isShorthand = a.isShorthand(property.key, name);

        // And replace property value with its name
        normalizedProperties.push(
          t.objectProperty(property.key, t.identifier(name), property.computed, isShorthand, property.decorators));
        shouldReplace = true;
      } else if (t.isClassExpression(property.value)) {
        if (property.value.id) {
          // Replace by name if provided internal function name
          nodePath.parentPath.scope.rename(property.value.id.name, name);
        }
        // Get class definition
        const { superClass: superClass, body: body } = property.value;
        // Extract class
        rootPath.insertBefore(t.classDeclaration(t.identifier(name), superClass, body, []));
        // Shorthand
        const isShorthand = a.isShorthand(property.key, name);
        // And replace property value with its name
        normalizedProperties.push(
          t.objectProperty(property.key, t.identifier(name), property.computed, isShorthand, property.decorators));
        shouldReplace = true;
      } else {
        // Extract value/function call to variable
        rootPath.insertBefore(t.variableDeclaration('let', [t.variableDeclarator(t.identifier(name), property.value)]));
        // And replace property value with its name
        normalizedProperties.push(
          t.objectProperty(property.key, t.identifier(name), property.computed, false, property.decorators));
        shouldReplace = true;
      }
      i++;
    });

    if (shouldReplace) {
      nodePath.replaceWith(t.variableDeclarator(nodePath.node.id, t.objectExpression(normalizedProperties)));
    }
  }

  optimizeBundle(resource) {
    const alreadyOptimized = new Map();

    const transformExportedDeclaration = {
      Identifier: (nodePath) => {
        const parentPath = nodePath.parentPath;
        const parentType = parentPath.node.type;

        // Last condition: traverse going inside new added statement
        if (nodePath.node.name === this.opts.identifier
            && !alreadyOptimized.has(this.opts.identifier)) {
          this.log.info(`Analyzing ${this.opts.identifier}...`);
          alreadyOptimized.set(this.opts.identifier, true);
          // VariableDeclarator
          if (parentType === 'VariableDeclarator') {
            if (t.isObjectExpression(parentPath.node.init)) {
              // ObjectExpression
              this.log.info(`Right: ${parentPath.node.init.type}`);
              this.optimizeExportObject(resource, parentPath, parentPath.node.init);
            }
            // this.logAst(parentPath.node);

            // this.log.info(`VariableDeclarator: ${nodePath.parentPath.node.init.type}`);
            // this.log.info(`Resource: ${this.bundle.getShortName(resource.id)}`);
            // this.logAst(nodePath.parentPath.node);
          }
        }
      }
    };

    traverse(resource.ast, {
      ExportDefaultDeclaration: (nodePath) => {
        const node = nodePath.node;

        if (t.isIdentifier(node.declaration)) {
          let name = node.declaration.name;
          if (this.bundle.hasName(name)) {
            // Already used by another module
            name = this.bundle.generateUid();
            nodePath.parentPath.scope.rename(node.declaration.name, name);
          }

          this.opts = {
            identifier: name
          };
          nodePath.parentPath.traverse(transformExportedDeclaration);
          delete this.opts;

          // Register
          this.log.info(`Registering default '${name}' from ${resource.id}`);
          this.bundle.addDefaultExport(resource.id, name);
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
              if (this.bundle.hasName(name)) {
                // Already used by another module
                name = this.bundle.generateUid();
                nodePath.parentPath.scope.rename(originalName, name);
              }

              // Register
              this.bundle.addNamedExport(resource.id, originalName, name);
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
