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

import testLogPlugin from './fixtures/core/logAst/bandol-plugin-normalizer-test-log'

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
  es6ExportsOptimizerPlugin,
  renameInternalsOptimizerPlugin,
  es6ImportsOptimizerPlugin,
  removeUnusedOptimizerPlugin,
  removeUseStrictOptimizerPlugin
];

const fixturesDir = join(__dirname, 'fixtures');
const expected = testPath => { return fs.readFileSync(join(fixturesDir, testPath, 'expected.js'), 'utf8'); };

function createRunningContext() {
  const context = new Map();
  context.set('__TEST__', '\'test\'');

  return context;
}

function getOptions(testPath, opts) {
  return Object.assign({}, { entry: join(fixturesDir, testPath, 'actual.js') }, opts);
}

test('core/no-options-provided', t => {
  return t.throws(bandol(), "You must supply options to bandol");
});

test('core/no-entry-provided', t => {
  const opts = {
  };
  return t.throws(bandol(opts), 'You must supply "entry" option to bandol');
});

test('core/no-plugins-provided', t => {
  const opts = {
    entry: 'test.js'
  };
  return t.throws(bandol(opts), 'You must supply "plugins" option to bandol');
});

test('core/not-valid-option', t => {
  const opts = {
    entry: 'test.js',
    plugins: basePlugins,
    notValid: 'test'
  };
  return t.throws(bandol(opts), "Unexpected key 'notValid' found, expected one of: entry, env, runningContext, plugins, logLevel");
});

test('core/not-valid-entry', t => {
  const opts = {
    entry: 'not-valid-entry.js',
    logLevel: log.levels.TRACE,
    plugins: basePlugins
  };
  return t.throws(bandol(opts), /Bundle\.build: can\'t resolve entry.*/);
});

test('core/logAst', t => {
  const consoleLogSpy = sinon.spy(console, 'log');
  const testAst = require(join(fixturesDir, 'core/logAst', 'ast.json'));
  const opts = getOptions('core/logAst', {
    plugins: [
      ...basePlugins,
      testLogPlugin
    ]
  });
  return bandol(opts).then(b => {
    t.true(consoleLogSpy.calledWithExactly(JSON.stringify(testAst, null, 2)));
    consoleLogSpy.restore();
  });
});

test('core/sort', t => {
  const opts = getOptions('core/sort', {
    plugins: basePlugins
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('core/sort'));
  });
});

test('core/no-uid-plugin', t => {
  const opts = getOptions('core/no-uid-plugin', {
    plugins: [
      nodeResolverPlugin,
      jsLoaderPlugin,
      es6AnalyzerPlugin,
      iifeFinalizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'No uid plugin found in this Bandol configuration.');
});

test('core/no-resolver-plugin', t => {
  const opts = getOptions('core/no-resolver-plugin', {
    plugins: [
      hashidsUidPlugin,
      jsLoaderPlugin,
      es6AnalyzerPlugin,
      iifeFinalizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'No one resolver plugin found in this Bandol configuration.');
});

test('core/no-loder-plugin', t => {
  const opts = getOptions('core/no-loder-plugin', {
    plugins: [
      hashidsUidPlugin,
      nodeResolverPlugin,
      es6AnalyzerPlugin,
      iifeFinalizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'No one loder plugin found in this Bandol configuration.');
});

test('core/no-analyzer-plugin', t => {
  const opts = getOptions('core/no-analyzer-plugin', {
    plugins: [
      hashidsUidPlugin,
      nodeResolverPlugin,
      jsLoaderPlugin,
      iifeFinalizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'No one analyzer plugin found in this Bandol configuration.');
});

test('core/no-finalizer-plugin', t => {
  const opts = getOptions('core/no-finalizer-plugin', {
    plugins: [
      hashidsUidPlugin,
      nodeResolverPlugin,
      jsLoaderPlugin,
      es6AnalyzerPlugin
    ]
  });
  return t.throws(bandol(opts), 'No finalizer plugin found in this Bandol configuration.');
});

test('loader/not-supported-resource-type', t => {
  const opts = getOptions('loader/not-supported-resource-type', {
    plugins: basePlugins
  });
  return t.throws(bandol(opts), 'No loader plugin found for resource "test.json"');
});

test('loader/js', t => {
  const opts = getOptions('loader/js', {
    plugins: basePlugins
  });
  return t.throws(bandol(opts), 'No loader plugin found for resource "actual.js"');
});

test('loader/json', t => {
  const opts = getOptions('loader/json', {
    plugins: [
      ...basePlugins,
      jsonLoaderPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('loader/json'));
  });
});

test('loader/json_2', t => {
  const opts = getOptions('loader/json_2', {
    plugins: [
      hashidsUidPlugin,
      nodeResolverPlugin,
      jsonLoaderPlugin,
      es6AnalyzerPlugin,
      iifeFinalizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'No loader plugin found for resource "actual.js"');
});

test('loader/json_3', t => {
  const opts = getOptions('loader/json_3', {
    plugins: [
      ...basePlugins,
      jsonLoaderPlugin
    ],
  });
  return t.throws(bandol(opts), 'No loader plugin found for resource "test.json"');
});

test('loader/json_4', t => {
  const opts = getOptions('loader/json_4', {
    plugins: [
      ...basePlugins,
      jsonLoaderPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('loader/json_4'));
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

test('normalizer/cjs-to-es6_2', t => {
  const opts = getOptions('normalizer/cjs-to-es6_2', {
    plugins: [
      ...basePlugins,
      cjsToEs6NormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/cjs-to-es6_2'));
  });
});

test('normalizer/cjs-to-es6_3', t => {
  const opts = getOptions('normalizer/cjs-to-es6_3', {
    plugins: [
      ...basePlugins,
      cjsToEs6NormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/cjs-to-es6_3'));
  });
});

test('normalizer/cjs-to-es6_4', t => {
  const opts = getOptions('normalizer/cjs-to-es6_4', {
    plugins: [
      ...basePlugins,
      cjsToEs6NormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/cjs-to-es6_4'));
  });
});

test('normalizer/cjs-to-es6_5', t => {
  const opts = getOptions('normalizer/cjs-to-es6_5', {
    plugins: [
      ...basePlugins,
      cjsToEs6NormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/cjs-to-es6_5'));
  });
});

test('normalizer/cjs-to-es6_6', t => {
  const opts = getOptions('normalizer/cjs-to-es6_6', {
    plugins: [
      ...basePlugins,
      cjsToEs6NormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('normalizer/cjs-to-es6_6'));
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

test('normalizer/process-env_3', t => {
  const opts = getOptions('normalizer/process-env_3', {
    env: { NODE_ENV: 'production' },
    plugins: [
      ...basePlugins,
      processEnvNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/process-env_3'));
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

test('normalizer/remove-falsy-blocks_2', t => {
  const opts = getOptions('normalizer/remove-falsy-blocks_2', {
    plugins: [
      ...basePlugins,
      removeFalsyBlocksNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/remove-falsy-blocks_2'));
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

test('normalizer/remove-deprecated', t => {
  const opts = getOptions('normalizer/remove-deprecated', {
    plugins: [
      ...basePlugins,
      removeDeprecatedNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/remove-deprecated'));
  });
});

test('normalizer/running-context', t => {
  const opts = getOptions('normalizer/running-context', {
    runningContext: createRunningContext(),
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

test('normalizer/es6-exports_2', t => {
  const opts = getOptions('normalizer/es6-exports_2', {
    plugins: [
      ...basePlugins,
      es6ExportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-exports_2'));
  });
});

test('normalizer/es6-exports_3', t => {
  const opts = getOptions('normalizer/es6-exports_3', {
    plugins: [
      ...basePlugins,
      es6ExportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-exports_3'));
  });
});

test('normalizer/es6-exports_4', t => {
  const opts = getOptions('normalizer/es6-exports_4', {
    plugins: [
      ...basePlugins,
      es6ExportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-exports_4'));
  });
});

test('normalizer/es6-exports_5', t => {
  const opts = getOptions('normalizer/es6-exports_5', {
    plugins: [
      ...basePlugins,
      es6ExportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-exports_5'));
  });
});

test('normalizer/es6-exports_6', t => {
  const opts = getOptions('normalizer/es6-exports_6', {
    plugins: [
      ...basePlugins,
      es6ExportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-exports_6'));
  });
});

test('normalizer/es6-exports_7', t => {
  const opts = getOptions('normalizer/es6-exports_7', {
    plugins: [
      ...basePlugins,
      es6ExportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-exports_7'));
  });
});

test('normalizer/es6-exports_8', t => {
  const opts = getOptions('normalizer/es6-exports_8', {
    plugins: [
      ...basePlugins,
      es6ExportsNormalizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('normalizer/es6-exports_8'));
  });
});

test('analyzer/es6', t => {
  const opts = getOptions('analyzer/es6', {
    plugins: basePlugins
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('analyzer/es6'));
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

test('optimizer/remove-use-strict_2', t => {
  const opts = getOptions('optimizer/remove-use-strict_2', {
    plugins: [
      ...basePlugins,
      removeUseStrictOptimizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('optimizer/remove-use-strict_2'));
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

test('optimizer/es6-exports-imports_2', t => {
  const opts = getOptions('optimizer/es6-exports-imports_2', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('optimizer/es6-exports-imports_2'));
  });
});

test('optimizer/es6-exports-imports_3', t => {
  const opts = getOptions('optimizer/es6-exports-imports_3', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'imported2.js should be normalised.');
});

test('optimizer/es6-exports-imports_4', t => {
  const opts = getOptions('optimizer/es6-exports-imports_4', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('optimizer/es6-exports-imports_4'));
  });
});

test('optimizer/es6-exports-imports_5', t => {
  const opts = getOptions('optimizer/es6-exports-imports_5', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'tests.js should be normalised.');
});

test('optimizer/es6-exports-imports_6', t => {
  const opts = getOptions('optimizer/es6-exports-imports_6', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('optimizer/es6-exports-imports_6'));
  });
});

test('optimizer/es6-exports-imports_7', t => {
  const opts = getOptions('optimizer/es6-exports-imports_7', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/es6-exports-imports_7'));
  });
});

test('optimizer/es6-exports-imports_8', t => {
  const opts = getOptions('optimizer/es6-exports-imports_8', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/es6-exports-imports_8'));
  });
});

test('optimizer/es6-exports-imports_9', t => {
  const opts = getOptions('optimizer/es6-exports-imports_9', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/es6-exports-imports_9'));
  });
});

test('optimizer/es6-exports-imports_10', t => {
  const opts = getOptions('optimizer/es6-exports-imports_10', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/es6-exports-imports_10'));
  });
});

test('optimizer/es6-exports-imports_11', t => {
  const opts = getOptions('optimizer/es6-exports-imports_11', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/es6-exports-imports_11'));
  });
});

test('optimizer/es6-exports-imports_12', t => {
  const opts = getOptions('optimizer/es6-exports-imports_12', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/es6-exports-imports_12'));
  });
});

test('optimizer/es6-exports-imports_13', t => {
  const opts = getOptions('optimizer/es6-exports-imports_13', {
    plugins: [
      ...basePlugins,
      removeUnusedNormalizerPlugin,
      es6ExportsOptimizerPlugin,
      renameInternalsOptimizerPlugin,
      es6ImportsOptimizerPlugin,
      removeUnusedOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/es6-exports-imports_13'));
  });
});

test('optimizer/es6-exports-imports_14', t => {
  const opts = getOptions('optimizer/es6-exports-imports_14', {
    plugins: [
      ...basePlugins,
      cjsToEs6NormalizerPlugin,
      removeUnusedNormalizerPlugin,
      es6ExportsOptimizerPlugin,
      renameInternalsOptimizerPlugin,
      es6ImportsOptimizerPlugin,
      removeUnusedOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/es6-exports-imports_14'));
  });
});

test('optimizer/rename-internals', t => {
  const opts = getOptions('optimizer/rename-internals', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin,
      renameInternalsOptimizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize();
    t.is(b.code, expected('optimizer/rename-internals'));
  });
});

test('optimizer/remove-unused', t => {
  const opts = getOptions('optimizer/remove-unused', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin,
      removeUnusedOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/remove-unused'));
  });
});

test('optimizer/remove-unused_2', t => {
  const opts = getOptions('optimizer/remove-unused_2', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin,
      removeUnusedOptimizerPlugin
    ],
    logLevel: log.levels.TRACE
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('optimizer/remove-unused_2'));
  });
});

test('finalizer/iife', t => {
  const opts = getOptions('finalizer/iife', {
    plugins: basePlugins
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('finalizer/iife'));
  });
});

test('finalizer/iife_2', t => {
  const opts = getOptions('finalizer/iife_2', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return bandol(opts).then(b => {
    b.finalize({ debug: true });
    t.is(b.code, expected('finalizer/iife_2'));
  });
});

test('todo/es6-exports-imports', t => {
  const opts = getOptions('todo/es6-exports-imports', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'TODO: ExportNamedDeclaration from ./imported.js');
});

test('todo/es6-exports-imports_2', t => {
  const opts = getOptions('todo/es6-exports-imports_2', {
    plugins: [
      ...basePlugins,
      es6ExportsOptimizerPlugin,
      es6ImportsOptimizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'TODO: ExportAllDeclaration from ./imported.js');
});

test('todo/cjs-to-es6', t => {
  const opts = getOptions('todo/cjs-to-es6', {
    plugins: [
      ...basePlugins,
      cjsToEs6NormalizerPlugin
    ]
  });
  return t.throws(bandol(opts), 'TODO: module.exports.message = ...');
});
