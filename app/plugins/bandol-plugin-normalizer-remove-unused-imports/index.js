import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'normalizer-remove-unused-blocks';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
    this.init();
  }

  /* eslint no-param-reassign: 0 */
  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        // TODO: Should we remove it in HotWatch mode?
        try {
          traverse(resource.props.ast, {
            Program: (nodePath) => {
              Object.keys(nodePath.scope.bindings).forEach((bindingName) => {
                const binding = nodePath.scope.bindings[bindingName];
                if (bindingName === 'ReactCurrentOwner') {
                  this.log(`Binding: ${binding.references}`);
                  const refPath = binding.referencePaths[0];
                  const declPath = refPath.findParent((_path) => _path.node === null);
                  // this.log(`${binding.referencePaths[0].parentPath.parentPath.parentPath.parentPath.parentPath.parentPath.node.type}`);
                  if (declPath) {
                    this.log(`.removed: ${declPath.removed}`);
                    this.log(`.shouldSkip: ${declPath.shouldSkip}`);
                    this.log(`.type: ${declPath.type}`);
                    this.log(`.state: ${JSON.stringify(declPath.state)}`);
                  }
                }
                if (binding.references === 0) {
                  binding.path.remove();
                }
              });
            },
            ImportDeclaration: (nodePath) => {
              if (nodePath.node.specifiers.length === 0) {
                this.log(`Remove unused import "${nodePath.node.source.value}"`);
                nodePath.remove();
              }
            }
          });
        } catch (err) {
          this.log(err.stack);
        }
        resolve(resource);
      }
    });
  }
}
