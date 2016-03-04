import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as babylon from 'babylon';
import traverse from 'babel-traverse';

import Types from '../../Types';

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
    return !_.contains(this._supportedExtensions, ext);
  }

  _retreiveDependencies(ast) {
    const dependencies = [];

    traverse(ast, {
      ImportDeclaration: (nodePath) => {
        const source = nodePath.node.source.value;

        if (!~dependencies.indexOf(source)) {
          dependencies.push(source);
        }
      }
    });

    return dependencies;
  }

  /* eslint no-param-reassign: 0 */
  loadResource(resource) {
    const nextResource = Object.assign({}, resource);

    return new Promise((resolve) => {
      if (!this._canCompile(nextResource.id
        && nextResource.type !== Types.UNKNOWN
        && nextResource.type !== Types.JAVASCRIPT)) {
        resolve(nextResource);
      } else {
        let data = nextResource.props.data;
        let ast = nextResource.props.ast;

        if (nextResource.type === Types.UNKNOWN) {
          try {
            data = fs.readFileSync(nextResource.id, 'utf8');
            ast = babylon.parse(data, this._babylonOtions);
          } catch (err) {
            resolve(nextResource);
          }
        }

        const dependencies = this._retreiveDependencies(ast);

        nextResource.type = Types.JAVASCRIPT;
        nextResource.dependencies = dependencies;
        nextResource.props = {
          code: data,
          ast: ast
        };

        resolve(nextResource);
      }
    });
  }
}
