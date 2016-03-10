import fs from 'fs';
import * as babylon from 'babylon';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'loader-js';
  version = '1.0.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

  _babylonPlugins = [
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

  _babylonOtions = {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    allowReturnOutsideFunction: false,
    plugins: this._babylonPlugins.slice(0)
  };

  constructor(bundle) {
    super(bundle);
    this.bundle = bundle;
  }

  /* eslint no-param-reassign: 0 */
  loadResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== Types.UNKNOWN) {
        this.log(`Can't load ${resource.id}`);
        resolve(resource);
      } else {
        try {
          const code = fs.readFileSync(resource.id, 'utf8');
          const ast = babylon.parse(code, this._babylonOtions);

          resource.type = Types.JAVASCRIPT;
          resource.props = {
            originalCode: code,
            originalAst: ast,
            code: code,
            ast: ast,
            imports: new Map(),
            exports: new Map()
          };

          resolve(resource);
        } catch (err) {
          resolve(resource);
        }
      }
    });
  }
}
