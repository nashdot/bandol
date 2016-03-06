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

  _retreiveDependencies(resource) {
    const dependencies = resource.dependencies;

    traverse(resource.props.ast, {
      ImportDeclaration: (nodePath) => {
        const source = nodePath.node.source.value;
        const id = this.bundle.resolveResource(source, resource.id);

        if (!~dependencies.indexOf(id)) {
          dependencies.push(id);
        }
      }
    });

    return dependencies;
  }

  /* eslint no-param-reassign: 0 */
  analyzeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't analyze ${resource.id}`);
        resolve(resource);
      } else {
        const dependencies = this._retreiveDependencies(resource);
        resource.dependencies = dependencies;
        resolve(resource);
      }
    });
  }
}
