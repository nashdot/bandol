import generate from 'babel-generator';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'finalizer-iife';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;

    this.init();
  }

  finalize(opts = { debug: false }) {
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
          this.bundle.code += `/**bandol> resource: ${this.bundle.getShortPath(resource.id)} */\n`;
          if (resource.props.imports.length > 0) {
            this.bundle.code += `/**bandol> imports:\n${JSON.stringify(resource.props.imports, null, ' ')}\n*/\n`;
          } else {
            this.bundle.code += `/**bandol> imports: - */\n`;
          }
          this.bundle.code += `/**bandol> default export: ${this.bundle.defaultExportsById.get(resource.id) || '-'} */\n`;
          const exports = this.bundle.namedExportsById.get(resource.id) || '-';
          if (exports === '-') {
            this.bundle.code += `/**bandol> exports: ${exports} */\n`;
          } else {
            this.bundle.code += `/**bandol> exports:\n${JSON.stringify(exports, null, ' ')}\n*/\n`;
          }
        }

        this.bundle.code += `${resource.props.code}\n`;
      }
    }

    this.bundle.code += outro;
  }
}
