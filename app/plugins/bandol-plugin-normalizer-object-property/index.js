import traverse from 'babel-traverse';
import * as t from 'babel-types';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-object-property';
    this.version = '0.1.0';

    this.init();
  }

  normalizeResource(resource) {
    return new Promise((resolve) => {
      traverse(resource.ast, {
        ObjectExpression: (nodePath) => {
          const node = nodePath.node;
          const normalizedProperties = [];
          const rootPath = this.getRootPath(nodePath);

          let i = 0;
          let shouldReplace = false;
          node.properties.forEach(property => {
            if (t.isIdentifier(property.value)) {
              // Normalized
              normalizedProperties.push(property);
            } else if (t.isFunctionExpression(property.value)) {
              // Generate function name if not provided
              const name = property.value.id ? property.value.id.name : this.bundle.generateUid();
              // Get function definition
              const { params: params, body: body, generator: generator } = property.value;
              // Extract function
              rootPath.insertBefore(t.functionDeclaration(t.identifier(name), params, body, generator, property.value.async));
              // Shorthand
              let isShorthand = false;
              if (t.isIdentifier(property.key) && property.key.name === name) {
                isShorthand = true;
              }
              // And replace property value with its name
              normalizedProperties.push(
                t.objectProperty(property.key, t.identifier(name), property.computed, isShorthand, property.decorators));
              shouldReplace = true;
            } else if (t.isClassExpression(property.value)) {
              // Generate class name if not provided
              const name = property.value.id ? property.value.id.name : this.bundle.generateUid();
              // Get class definition
              const { superClass: superClass, body: body } = property.value;
              // Extract class
              rootPath.insertBefore(t.classDeclaration(t.identifier(name), superClass, body, []));
              // Shorthand
              let isShorthand = false;
              if (t.isIdentifier(property.key) && property.key.name === name) {
                isShorthand = true;
              }
              // And replace property value with its name
              normalizedProperties.push(
                t.objectProperty(property.key, t.identifier(name), property.computed, isShorthand, property.decorators));
              shouldReplace = true;
            } else if (t.isCallExpression(property.value)) {
              normalizedProperties.push(property);
            } else {
              // Generate variable name
              const name = this.bundle.generateUid();
              // Extract value to variable
              rootPath.insertBefore(t.variableDeclaration('let', [t.variableDeclarator(t.identifier(name), property.value)]));
              // And replace property value with its name
              normalizedProperties.push(
                t.objectProperty(t.identifier(property.key.name), t.identifier(name), property.computed, false, property.decorators));
              shouldReplace = true;
            }
            i++;
          });

          if (shouldReplace) {
            nodePath.replaceWith(t.objectExpression(normalizedProperties));
          }
        }
      });

      resolve(resource);
    });
  }
}
