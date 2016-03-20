import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'optimizer-remove-use-strict';
  version = '0.1.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
    this.init();
  }

  optimizeBundle() {
    this.log('Processing...');
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't optimize ${resource.id}`);
      } else {
        traverse(resource.props.ast, {
          Program: (nodePath) => {
            const node = nodePath.node;
            for (let j = 0; j < node.directives.length; j++) {
              const directive = node.directives[j];
              if (directive.value.value === 'use strict') {
                node.directives.splice(j, 1);
                this.log(`Removed from ${this.bundle.getShortPath(resource.id)}`);
              }
            }
          }
        });
      }
    }
  }
}
