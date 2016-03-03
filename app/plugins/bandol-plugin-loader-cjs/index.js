import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as babylon from 'babylon';
import traverse from 'babel-traverse';

import Resource from '../../Resource'; // 'bandol/Resource';

export default class Plugin {
  _supportedExtensions = ['.js', '.jsx'];

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

  _retreiveDependencies(ast) {
    const dependencies = [];

    traverse(ast, {
      CallExpression: (nodePath) => {
        const node = nodePath.node;

        if (node.callee.name !== 'require') return;
        if (node.arguments.length !== 1 || node.arguments[0].type !== 'Literal') return; // TODO handle these weird cases?

        const source = node.arguments[0].value;

        if (!~dependencies.indexOf(source)) {
          dependencies.push(source);
        }
      }
    });

    return dependencies;
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
          const dependencies = this._retreiveDependencies(ast);
          if (dependencies.length > 0) {
            resolve(
              new Resource(id, dependencies, {
                code: data,
                ast: ast
              }));
          } else {
            resolve(undefined);
          }
        });
      }
    });
  }
}
