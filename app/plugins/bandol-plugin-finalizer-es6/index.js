import generate from 'babel-generator';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'finalizer-es6';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;

    this.bundle = bundle;
    this.init();
  }

  finalize(opts = { debug: false }) {
    for (let i = 0; i < this.bundle.sortedResources.length; i++) {
      const resource = this.bundle.sortedResources[i];
      if (resource.type === this.resourceType) {
        try {
          resource.props.code = generate(resource.props.ast, { /* options */ }, resource.props.originalCode).code;
        } catch (err) {
          this.log(err.stack);
        }

        if (opts.debug) {
          this.bundle.code += `/* bandol: ${this.bundle.getShortPath(resource.id)} */\n`;
          this.bundle.code += `/* imports:\n${JSON.stringify(resource.props.imports, null, ' ')}\n*/\n`;
          this.bundle.code += `/* default export: ${this.bundle.defaultExportsById.get(resource.id)} */\n`;
          this.bundle.code += `/* exports:\n${JSON.stringify(this.bundle.namedExportsById.get(resource.id), null, ' ')}\n*/\n`;
        }

        this.bundle.code += `${resource.props.code}\n`;
      }
    }
  }
}
