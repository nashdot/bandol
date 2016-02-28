import fs from 'fs';
import * as babylon from 'babylon';

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

export default function load(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(id, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      const ast = babylon.parse(data, babylonOtions);
      resolve({ code: data, ast: ast });
    });
  });
}
