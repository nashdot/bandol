import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as babylon from 'babylon';
import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'loader-es6';
  version = '1.0.0';
  resourceType = Types.JAVASCRIPT;

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
    super(bundle);
    this.bundle = bundle;
  }

  /**
   * Test if a filename ends with a compilable extension.
   */
  _canCompile(filename) {
    const ext = path.extname(filename);
    return _.contains(this._supportedExtensions, ext);
  }

  _retreiveDependencies(ast, originalDependencies, importerId) {
    const dependencies = originalDependencies;

    traverse(ast, {
      ImportDeclaration: (nodePath) => {
        const source = nodePath.node.source.value;
        const id = this.bundle.resolveResource(source, importerId);

        if (!~dependencies.indexOf(id)) {
          dependencies.push(id);
        }
      }
    });

    return dependencies;
  }

  /* eslint no-param-reassign: 0 */
  loadResource(resource) {
    return new Promise((resolve) => {
      if (!this._canCompile(resource.id)
        && resource.type !== Types.UNKNOWN
        && resource.type !== this.resourceType) {
        this.log(`Can't load ${resource.id}`);
        resolve(resource);
      } else {
        const transformedResource = Object.assign({}, resource);

        let dependencies = transformedResource.dependencies;
        let data = transformedResource.props.data;
        let ast = transformedResource.props.ast;

        if (transformedResource.type === Types.UNKNOWN) {
          try {
            data = fs.readFileSync(transformedResource.id, 'utf8');
            ast = babylon.parse(data, this._babylonOtions);
          } catch (err) {
            resolve(resource);
          }
        }

        dependencies = this._retreiveDependencies(ast, dependencies, resource.id);

        transformedResource.type = Types.JAVASCRIPT;
        transformedResource.dependencies = dependencies;
        transformedResource.props = {
          code: data,
          ast: ast
        };

        resolve(transformedResource);
      }
    });
  }
}
