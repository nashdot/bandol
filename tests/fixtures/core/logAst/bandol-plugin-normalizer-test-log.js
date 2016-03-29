
import BasePlugin from '../../../../app/BasePlugin';
import Types from '../../../../app/Types';

export default class Plugin extends BasePlugin {

  constructor(bundle) {
    super(bundle);

    this.name = 'normalizer-test-log';
    this.version = '0.1.0';
    this.resourceType = Types.JAVASCRIPT;
    this.supportedExtensions = ['.js', '.jsx'];

    this.init();
  }

  normalizeResource(resource) {
    return new Promise((resolve) => {
      this.logAst(resource.props.ast);

      resolve(resource);
    });
  }
}
