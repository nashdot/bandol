import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'analyzer-es6';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;
    this.supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

    this.bundle = bundle;
    this.init();
  }

  /* eslint no-param-reassign: 0 */
  analyzeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't analyze ${this.bundle.getShortPath(resource.id)}`);
        resolve(resource);
      } else {
        const dependencies = resource.dependencies;

        // Collect dependencies
        try {
          traverse(resource.props.ast, {
            ImportDeclaration: (nodePath) => {
              const source = nodePath.node.source.value;
              const id = this.bundle.resolveResource(source, resource.id);

              if (!~dependencies.indexOf(id)) {
                dependencies.push(id);
              }
            }
          });
        } catch (err) {
          this.log(err.stack);
        }

        resource.dependencies = dependencies;

        resolve(resource);
      }
    });
  }
}
