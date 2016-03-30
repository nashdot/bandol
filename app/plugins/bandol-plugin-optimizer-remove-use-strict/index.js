import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'optimizer-remove-use-strict';
    this.version = '0.1.0';

    this.init();
  }

  optimizeBundle() {
    for (let i = this.bundle.sortedResources.length - 1; i >= 0; i--) {
      const resource = this.bundle.sortedResources[i];

      if (!resource.hasAst) {
        this.log.info(`Can't optimize ${resource.id}`);
      } else {
        traverse(resource.props.ast, {
          Program: (nodePath) => {
            const node = nodePath.node;
            for (let j = 0; j < node.directives.length; j++) {
              const directive = node.directives[j];
              if (directive.value.value === 'use strict') {
                node.directives.splice(j, 1);
              }
            }
          }
        });
      }
    }
  }
}
