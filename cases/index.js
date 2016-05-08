import test from 'ava';
import sinon from 'sinon';
import 'babel-register';
import * as fs from 'fs';
import { join } from 'path';
import log from 'loglevel';
import bandol from '..';

import hashidsUidPlugin from '../app/plugins/bandol-plugin-uid-hashids';
import nodeResolverPlugin from '../app/plugins/bandol-plugin-resolver-node';
import jsLoaderPlugin from '../app/plugins/bandol-plugin-loader-js';
import jsonLoaderPlugin from '../app/plugins/bandol-plugin-loader-json';
import cjsToEs6NormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-cjs-to-es6';
import removeDeprecatedNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-remove-deprecated';
import es6ExportsNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-es6-exports';
import processEnvNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-process-env';
import runningContextNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-running-context';
import removeFalsyBlocksNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-remove-falsy-blocks';
import removeUnusedNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-remove-unused';
import es6AnalyzerPlugin from '../app/plugins/bandol-plugin-analyzer-es6';
import es6ExportsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-es6-exports';
import renameInternalsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-rename-internals';
import es6ImportsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-es6-imports';
import removeUseStrictOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-remove-use-strict';
import removeUnusedOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-remove-unused';
import iifeFinalizerPlugin from '../app/plugins/bandol-plugin-finalizer-iife';

const basePlugins = [
  // Utils
  hashidsUidPlugin,
  nodeResolverPlugin,
  // Loaders
  jsLoaderPlugin,
  // Analyse
  es6AnalyzerPlugin,
  // Finalisation
  iifeFinalizerPlugin
];

const allPlugins = [
  ...basePlugins,
  // Additional loaders
  jsonLoaderPlugin,
  // Normalisation
  cjsToEs6NormalizerPlugin,
  removeDeprecatedNormalizerPlugin,
  processEnvNormalizerPlugin,
  runningContextNormalizerPlugin,
  removeFalsyBlocksNormalizerPlugin,
  es6ExportsNormalizerPlugin,
  removeUnusedNormalizerPlugin,
  // Optimisation
  removeUnusedOptimizerPlugin,
  es6ExportsOptimizerPlugin,
  renameInternalsOptimizerPlugin,
  es6ImportsOptimizerPlugin,
  removeUseStrictOptimizerPlugin
];

const expected = testPath => { return fs.readFileSync(join(__dirname, testPath, 'expected.js'), 'utf8'); };

function createRunningContext() {
  const context = new Map();
  context.set('__REACT_DEVTOOLS_GLOBAL_HOOK__', 'undefined');

  return context;
}

function getOptions(testPath, opts) {
  return Object.assign({}, { entry: join(__dirname, testPath, 'actual.js') }, opts);
}

test('react-hello', t => {
  const opts = getOptions('react-hello', {
    env: { NODE_ENV: 'production' },
    runningContext: createRunningContext(),
    plugins: allPlugins,
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    const outputPath = `${process.cwd()}/out/react-hello.js`;
    fs.writeFileSync(outputPath, b.code);
    t.is(b.code, expected('react-hello'));
  });
});
