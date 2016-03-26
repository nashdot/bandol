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
import removeUnusedNormalizerPlugin from '../app/plugins/bandol-plugin-normalizer-remove-unused';
import es6AnalyzerPlugin from '../app/plugins/bandol-plugin-analyzer-es6';
import es6ExportsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-es6-exports';
import renameInternalsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-rename-internals';
import namedMembersOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-named-members';
// import optimizerPlugin from '../app/plugins/bandol-plugin-optimizer';
import es6ImportsOptimizerPlugin from '../app/plugins/bandol-plugin-optimizer-es6-imports';
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
  removeUnusedNormalizerPlugin,
  // Optimisation
  es6ExportsOptimizerPlugin,
  renameInternalsOptimizerPlugin,
  namedMembersOptimizerPlugin,
  // optimizerPlugin,
  es6ImportsOptimizerPlugin,
  removeUseStrictOptimizerPlugin
];

const fixturesDir = join(__dirname, 'fixtures');
const expected = testPath => { return fs.readFileSync(join(fixturesDir, testPath, 'expected.js'), 'utf8'); };

function createRunningContext() {
  const context = new Map();
  context.set('__REACT_DEVTOOLS_GLOBAL_HOOK__', 'undefined');

  return context;
}

function createRunningContext2() {
  const context = new Map();
  context.set('__TEST__', '\'test\'');

  return context;
}

function getOptions(testPath, opts) {
  return Object.assign({}, { entry: join(fixturesDir, testPath, 'actual.js') }, opts);
}

test('core/not-supported-resource-type', t => {
  const opts = getOptions('core/not-supported-resource-type', {
    plugins: allPlugins
  });
  return bandol(opts).then(b => {
    t.pass();
  });
});

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

test('normalizer/remove-unused', t => {
  const opts = getOptions('normalizer/remove-unused', {
    plugins: [
      ...basePlugins,
      removeUnusedNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/remove-unused'));
  });
});

test('normalizer/running-context', t => {
  const opts = getOptions('normalizer/running-context', {
    runningContext: createRunningContext2(),
    plugins: [
      ...basePlugins,
      runningContextNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/running-context'));
  });
});

test('normalizer/es6-imports', t => {
  const opts = getOptions('normalizer/es6-imports', {
    runningContext: createRunningContext2(),
    plugins: [
      ...basePlugins,
      es6ImportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-imports'));
  });
});

test('normalizer/es6-exports', t => {
  const opts = getOptions('normalizer/es6-exports', {
    plugins: [
      ...basePlugins,
      es6ExportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-exports'));
  });
});

test('optimizer/remove-use-strict', t => {
  const opts = getOptions('optimizer/remove-use-strict', {
    plugins: [
      ...basePlugins,
      removeUseStrictOptimizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('optimizer/remove-use-strict'));
  });
});

test('optimizer/es6-exports-imports', t => {
  const opts = getOptions('optimizer/es6-exports-imports', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('optimizer/es6-exports-imports'));
  });
});

// test('optimizer/es6-exports-imports_2', t => {
//   const opts = getOptions('optimizer/es6-exports-imports_2', {
//     plugins: [
//       ...basePlugins,
//       es6ExportsOptimizerPlugin,
//       es6ImportsOptimizerPlugin
//     ]
//   });
//   return bandol(opts).then(b => {
//     b.finalize();
//     t.is(b.code, expected('optimizer/es6-exports-imports_2'));
//   });
// });

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

// test('core/module', t => {
//   const opts = getOptions('core/module', {
//     env: { NODE_ENV: 'production' },
//     runningContext: createRunningContext(),
//     plugins: allPlugins
//   });
//   return bandol(opts).then(b => {
//     b.finalize({ debug: true });
//     const outputPath = `${process.cwd()}/out/core_module.js`;
//     fs.writeFileSync(outputPath, b.code);
//     t.is(b.code, expected('core/module'));
//   });
// });
