import test from 'ava';
import 'babel-register';
import * as fs from 'fs';
import { join } from 'path';
import bandol from '..';

import hashidsUidPlugin from '../app/plugins/bandol-plugin-uid-hashids';
import nodeResolverPlugin from '../app/plugins/bandol-plugin-resolver-node';
import jsLoaderPlugin from '../app/plugins/bandol-plugin-loader-js';
import cjsToEs6NormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-cjs-to-es6';
import es6ExportsNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-es6-exports';
import es6ImportsNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-es6-imports';
import processEnvNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-process-env';
import runningContextNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-running-context';
import removeFalsyBlocksNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-remove-falsy-blocks';
import removeUnusedImportsNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-remove-unused-imports';
import es6AnalyzerPlugin from '../app/plugins/bandol-plugin-analyzer-es6';
import es6ExportsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-es6-exports';
import renameInternalsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-rename-internals';
import namedMembersOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-named-members';
// import optimizerPlugin from '../app/plugins/bandol-plugin-optimizer';
import removeImportsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-remove-imports';
import removeUseStrictOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-remove-use-strict';
import iifeFinalizerPlugin from '../app/plugins/bandol-plugin-finalizer-iife';

const plugins = [
  // Utils
  hashidsUidPlugin,
  nodeResolverPlugin,
  // Loaders
  jsLoaderPlugin,
  // Normalisation
  cjsToEs6NormalizerPlugin,
  processEnvNormalizerPlugin,
  runningContextNormalizerPlugin,
  removeFalsyBlocksNormalizerPlugin,
  es6ExportsNormalizerPlugin,
  es6ImportsNormalizerPlugin,
  removeUnusedImportsNormalizerPlugin,
  // Analyse
  es6AnalyzerPlugin,
  // Optimisation
  es6ExportsOptimizerPlugin,
  renameInternalsOptimizerPlugin,
  namedMembersOptimizerPlugin,
  // optimizerPlugin,
  removeImportsOptimizerPlugin,
  removeUseStrictOptimizerPlugin,
  // Finalisation
  iifeFinalizerPlugin
];

const fixturesDir = join(__dirname, 'fixtures');
const expected = testPath => { return fs.readFileSync(join(fixturesDir, testPath, 'expected.js'), 'utf8'); };

function createRunningContext() {
  const context = new Map();
  context.set('__REACT_DEVTOOLS_GLOBAL_HOOK__', 'undefined');

  return context;
}

function doBandol(testPath) {
  return bandol({
    entry: join(fixturesDir, testPath, 'actual.js'),
    env: { NODE_ENV: 'production' },
    runningContext: createRunningContext(),
    plugins: plugins
  });
}

test('core/basic', t => {
  return doBandol('core/basic').then(b => {
    b.finalize();
    t.is(b.code, expected('core/basic'));
  });
});

test('core/basic-2', t => {
  return doBandol('core/basic-2').then(b => {
    b.finalize();
    t.is(b.code, expected('core/basic-2'));
  });
});

test('core/namespaceImport', t => {
  return doBandol('core/namespaceImport').then(b => {
    b.finalize();
    t.is(b.code, expected('core/namespaceImport'));
  });
});

test('core/namespaceImport-2', t => {
  return doBandol('core/namespaceImport-2').then(b => {
    b.finalize();
    t.is(b.code, expected('core/namespaceImport-2'));
  });
});

test('core/namespaceImport-3', t => {
  return doBandol('core/namespaceImport-3').then(b => {
    b.finalize();
    t.is(b.code, expected('core/namespaceImport-3'));
  });
});

test('core/namedImport', t => {
  return doBandol('core/namedImport').then(b => {
    b.finalize();
    t.is(b.code, expected('core/namedImport'));
  });
});

test('core/removeUseStrict', t => {
  return doBandol('core/removeUseStrict').then(b => {
    b.finalize();
    t.is(b.code, expected('core/removeUseStrict'));
  });
});

test('core/module', t => {
  return doBandol('core/module').then(b => {
    b.finalize({ debug: true });
    const outputPath = `${process.cwd()}/out/core_module.js`;
    fs.writeFileSync(outputPath, b.code);
    t.is(b.code, expected('core/module'));
  });
});
