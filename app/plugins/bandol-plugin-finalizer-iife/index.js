
import BasePlugin from '../../BasePlugin';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'finalizer-iife';
    this.version = '0.1.0';

    this.init();
  }

  finalize(opts = { debug: false }) {
    const intro = '(function () {\n';
    const outro = '\n}());';

    this.bundle.code = intro;

    for (let i = 0; i < this.bundle.sortedResources.length; i++) {
      const resource = this.bundle.sortedResources[i];
      this.log.info(`Generating: ${resource.id}`);

      resource.code = this.generateCode(resource.ast, resource.originalCode);

      if (opts.debug) {
        this.bundle.code += `/**bandol> resource: ${this.bundle.getShortPath(resource.id)} */\n`;
      }

      this.bundle.code += `${resource.code}\n`;
      this.log.info('ok');
    }

    this.bundle.code += outro;
  }
}
