import traverse from 'babel-traverse';

import BasePlugin from '../../BasePlugin';
import Types from '../../Types';

import recast from 'recast';
import noStrictTransform from 'lebab/lib/transformation/no-strict';
import commonjsTransform from 'lebab/lib/transformation/commonjs';
import classesTransform from 'lebab/lib/transformation/classes';

import * as babylon from 'babylon';

export default class Plugin extends BasePlugin {
  name = 'normalizer-js';
  version = '1.0.0';
  resourceType = Types.JAVASCRIPT;

  supportedExtensions = ['.js', '.jsx'];

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
  normalizeResource(resource) {
    return new Promise((resolve) => {
      if (!this.isSupportedExtension(resource.id)
        && resource.type !== this.resourceType) {
        this.log(`Can't normalize ${resource.id}`);
        resolve(resource);
      } else {
        let isOldJavascript = false;

        traverse(resource.props.ast, {
          AssignmentExpression: (nodePath) => {
            const node = nodePath.node;
            if (node.left.type === 'Identifier'
              && node.left.name === 'exports') {
              isOldJavascript = true;
            } else if (node.left.type === 'MemberExpression'
              && node.left.object.name === 'module'
              && node.left.property.name === 'exports') {
              isOldJavascript = true;
            }
          }
        });

        if (isOldJavascript) {
          const ast = recast.parse(resource.props.code);
          noStrictTransform(ast.program);
          classesTransform(ast.program);
          commonjsTransform(ast.program);
          resource.props.code = recast.print(ast).code;
          resource.props.ast = babylon.parse(resource.props.code, this._babylonOtions);
        }

        resolve(resource);
      }
    });
  }
}
