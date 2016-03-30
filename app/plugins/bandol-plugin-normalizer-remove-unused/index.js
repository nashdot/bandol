import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-remove-unused';
    this.version = '0.1.0';

    this.init();
  }

  /* eslint no-param-reassign: 0 */
  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (!resource.hasAst) {
        this.log.info(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        // TODO: Should we remove it in HotWatch mode?
        traverse(resource.props.ast, {
          Program: (nodePath) => {
            Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
              const binding = nodePath.scope.bindings[bindingName];
              if (binding.references === 0) {
                binding.path.remove();
              }
            });
          },
          ImportDeclaration: (nodePath) => {
            if (nodePath.node.specifiers.length === 0) {
              this.log.info(`Remove unused import "${nodePath.node.source.value}"`);
              nodePath.remove();
            }
          }
        });

        resolve(resource);
      }
    });
  }
}
