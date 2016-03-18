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
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't optimize ${resource.id}`);
      } else {
        traverse(resource.props.ast, {
          Program: (nodePath) => {
            const node = nodePath.node;
            for (let i = 0; i < node.directives.length; i++) {
              const directive = node.directives[i];
              if (directive.value.value === 'use strict') {
                node.directives.splice(i, 1);
              }
            }
          }
        });
      }
    }
  }
}