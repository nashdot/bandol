import * as fs from 'fs';
import * as babylon from 'babylon';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  constructor(bundle) {
    super(bundle);

    this.name = 'loader-js';
    this.version = '0.1.0';
    this.supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

    this._babylonPlugins = [
      'asyncFunctions',
      'asyncGenerators',
      'classConstructorCall',
      'classProperties',
      'decorators',
      'doExpressions',
      'exponentiationOperator',
      'exportExtensions',
      'flow',
      'functionSent',
      'functionBind',
      'jsx',
      'objectRestSpread',
      'trailingFunctionCommas'
    ];

    this._babylonOtions = {
      sourceType: 'module',
      allowImportExportEverywhere: false,
      allowReturnOutsideFunction: false,
      plugins: this._babylonPlugins.slice(0)
    };

    this.init();
  }

  /* eslint no-param-reassign: 0 */
  loadResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        || resource.type !== Types.UNKNOWN) {
        resolve(resource);
      } else {
        try {
          const code = fs.readFileSync(resource.id, 'utf8');
          const ast = babylon.parse(code, this._babylonOtions);

          resource.type = Types.JAVASCRIPT;
          resource.originalCode = code;
          resource.originalAst = ast;
          resource.code = code;
          resource.ast = ast;

          resolve(resource);
        } catch (err) {
          this.log.warn(`Failed loading "${this.bundle.getShortPath(resource.id)}": ${err.message}`);
          resolve(resource);
        }
      }
    });
  }
}
