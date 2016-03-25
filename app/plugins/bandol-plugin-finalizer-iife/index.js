import * as fs from 'fs';
import generate from 'babel-generator';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'finalizer-iife';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;

    this.bundle = bundle;
    this.init();
  }

  finalize(opts) {
    opts = opts || { debug: false };

    const intro = '(function () {\n';
    const outro = '\n}());';

    this.bundle.code = intro;

    for (let i = 0; i < this.bundle.sortedResources.length; i++) {
      const resource = this.bundle.sortedResources[i];
      if (resource.type === this.resourceType) {
        try {
          resource.props.code = generate(
            resource.props.ast,
            {
              comments: false
            },
            resource.props.originalCode).code;
        } catch (err) {
          this.log(err.stack);
        }

        if (opts.debug) {
          this.bundle.code += `/* bandol: ${this.bundle.getShortPath(resource.id)} */\n`;
          this.bundle.code += `/* dependencies:\n${JSON.stringify(resource.dependencies, null, ' ')}\n*/\n`;
          this.bundle.code += `/* imports:\n${JSON.stringify(resource.props.imports, null, ' ')}\n*/\n`;
          this.bundle.code += `/* default export: ${this.bundle.defaultExportsById.get(resource.id)} */\n`;
          this.bundle.code += `/* exports:\n${JSON.stringify(this.bundle.namedExportsById.get(resource.id), null, ' ')}\n*/\n`;
        }

        this.bundle.code += `${resource.props.code}`;
      }
    }

    this.bundle.code += outro;
  }
}
