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
  // Normalisation
  cjsToEs6NormalizerPlugin,
  processEnvNormalizerPlugin,
  runningContextNormalizerPlugin,
  removeFalsyBlocksNormalizerPlugin,
  es6ExportsNormalizerPlugin,
  es6ImportsNormalizerPlugin,
  removeUnusedImportsNormalizerPlugin,
  // Optimisation
  es6ExportsOptimizerPlugin,
  renameInternalsOptimizerPlugin,
  namedMembersOptimizerPlugin,
  // optimizerPlugin,
  removeImportsOptimizerPlugin,
  removeUseStrictOptimizerPlugin
];

const fixturesDir = join(__dirname, 'fixtures');
const expected = testPath => { return fs.readFileSync(join(fixturesDir, testPath, 'expected.js'), 'utf8'); };

function createRunningContext() {
  const context = new Map();
  context.set('__REACT_DEVTOOLS_GLOBAL_HOOK__', 'undefined');

  return context;
}

function getOptions(testPath, opts) {
  return Object.assign({}, { entry: join(fixturesDir, testPath, 'actual.js') }, opts);
}

test('normalizer/cjs-to-es6', t => {
  const opts = getOptions('normalizer/cjs-to-es6', {
    plugins: [
      ...basePlugins,
      cjsToEs6NormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/cjs-to-es6'));
  });
});

test('normalizer/process-env', t => {
  const opts = getOptions('normalizer/process-env', {
    plugins: [
      ...basePlugins,
      processEnvNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/process-env'));
  });
});

test('normalizer/process-env_2', t => {
  const opts = getOptions('normalizer/process-env_2', {
    env: { NODE_ENV: 'production' },
    plugins: [
      ...basePlugins,
      processEnvNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/process-env_2'));
  });
});

test('normalizer/remove-falsy-blocks', t => {
  const opts = getOptions('normalizer/remove-falsy-blocks', {
    plugins: [
      ...basePlugins,
      removeFalsyBlocksNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/remove-falsy-blocks'));
  });
});

test('core/basic', t => {
  const opts = getOptions('core/basic', {
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('core/basic'));
  });
});

test('core/basic-2', t => {
  const opts = getOptions('core/basic-2', {
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('core/basic-2'));
  });
});

test('core/namespaceImport', t => {
  const opts = getOptions('core/namespaceImport', {
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('core/namespaceImport'));
  });
});

test('core/namespaceImport-2', t => {
  const opts = getOptions('core/namespaceImport-2', {
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('core/namespaceImport-2'));
  });
});

test('core/namespaceImport-3', t => {
  const opts = getOptions('core/namespaceImport-3', {
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('core/namespaceImport-3'));
  });
});

test('core/namedImport', t => {
  const opts = getOptions('core/namedImport', {
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('core/namedImport'));
  });
});

test('core/removeUseStrict', t => {
  const opts = getOptions('core/removeUseStrict', {
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('core/removeUseStrict'));
  });
});

test('core/module', t => {
  const opts = getOptions('core/module', {
    env: { NODE_ENV: 'production' },
    runningContext: createRunningContext(),
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    const outputPath = `${process.cwd()}/out/core_module.js`;
    fs.writeFileSync(outputPath, b.code);
    t.is(b.code, expected('core/module'));
  });
});
