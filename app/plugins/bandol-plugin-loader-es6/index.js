import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as babylon from 'babylon';

export default class Plugin {
  _supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

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
    this.bundle = bundle;
  }

  /**
   * Test if a filename ends with a compilable extension.
   */
  _canCompile(filename) {
    const ext = path.extname(filename);
    return _.contains(this._supportedExtensions, ext);
  }

  loadResource(id) {
    return new Promise((resolve) => {
      if (this._canCompile(id)) {
        resolve(undefined);
      } else {
        fs.readFile(id, 'utf8', (err, data) => {
          if (err) {
            resolve(undefined);
          }

          const ast = babylon.parse(data, this._babylonOtions);
          resolve({ id: id, props: { code: data, ast: ast } });
        });
      }
    });
  }
}
