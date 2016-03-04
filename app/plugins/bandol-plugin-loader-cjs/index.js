import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as babylon from 'babylon';
import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

export default class Plugin extends BasePlugin {
  name = 'loader-cjs';
  version = '1.0.0';
  resourceType = Types.JAVASCRIPT;

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
    super(bundle);
    this.bundle = bundle;
  }

  /**
   * Test if a filename ends with a compilable extension.
   */
  _canCompile(filename) {
    const ext = path.extname(filename);
    return !_.contains(this._supportedExtensions, ext);
  }

  _retreiveDependencies(ast, originalDependencies) {
    const dependencies = originalDependencies;

    traverse(ast, {
      CallExpression: (nodePath) => {
        const node = nodePath.node;

        if (node.callee.name !== 'require') return;
        if (node.arguments.length !== 1 || node.arguments[0].type !== 'StringLiteral') return; // TODO handle these weird cases?

        const source = node.arguments[0].value;

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
        && nextResource.type !== this.resourceType)) {
        this.log(`Can't load ${resource.id}`);
        resolve(nextResource);
      } else {
        let dependencies = nextResource.dependencies;
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

        dependencies = this._retreiveDependencies(ast, dependencies);

        if (dependencies.length > 0) {
          nextResource.type = Types.JAVASCRIPT;
          nextResource.dependencies = dependencies;
          nextResource.props = {
            code: data,
            ast: ast
          };
        }

        resolve(nextResource);
      }
    });
  }
}
