import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as babylon from 'babylon';

const supportedExtensions = ['.js', '.jsx', '.es6', '.es'];

const babylonPlugins = [
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

const babylonOtions = {
  sourceType: 'module',
  allowImportExportEverywhere: false,
  allowReturnOutsideFunction: false,
  plugins: babylonPlugins.slice(0)
};

/**
 * Test if a filename ends with a compilable extension.
 */
function canCompile(filename) {
  const ext = path.extname(filename);
  return _.contains(supportedExtensions, ext);
}

export default function () {
  return {
    load: (id) => {
      return new Promise((resolve) => {
        if (canCompile(id)) {
          resolve(undefined);
        } else {
          fs.readFile(id, 'utf8', (err, data) => {
            if (err) {
              resolve(undefined);
            }

            const ast = babylon.parse(data, babylonOtions);
            resolve({ id: id, props: { code: data, ast: ast } });
          });
        }
      });
    }
  };
}
