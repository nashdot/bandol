import test from 'ava';
import 'babel-register';
import * as fs from 'fs';
import { join } from 'path';
import bandol from '..';

const fixturesDir = join(__dirname, 'fixtures');
const expected = testPath => { return fs.readFileSync(join(fixturesDir, testPath, 'expected.js'), 'utf8'); };

function doBandol(testPath) {
  return bandol({
    entry: join(fixturesDir, testPath, 'actual.js'),
    env: { NODE_ENV: 'production' }
  });
}

// https://github.com/sindresorhus/serialize-error/issues/4
// Use: const generated = b.generate().code; t.is(generated, ...
// and not direct call inside t.is()

test('core/basic', t => {
  return doBandol('core/basic').then(b => {
    b.generate('core_basic');
    const generated = b.bundle.code;
    // b._printResources();
    // b._printSorted();
    t.is(generated, expected('core/basic'));
  });
});

test('core/basic-2', t => {
  return doBandol('core/basic-2').then(b => {
    b.generate('core_basic2');
    const generated = b.bundle.code;
    // b._printResources();
    // b._printSorted();
    t.is(generated, expected('core/basic-2'));
  });
});

test('core/namespaceImport', t => {
  return doBandol('core/namespaceImport').then(b => {
    b.generate('core_namespaceImport');
    const generated = b.bundle.code;
    // b._printResources();
    // b._printSorted();
    t.is(generated, expected('core/namespaceImport'));
  });
});

test('core/namespaceImport-2', t => {
  return doBandol('core/namespaceImport-2').then(b => {
    b.generate('core_namespaceImport-2');
    const generated = b.bundle.code;
    // b._printResources();
    // b._printSorted();
    t.is(generated, expected('core/namespaceImport-2'));
  });
});

test('core/module', t => {
  return doBandol('core/module').then(b => {
    b.generate('core_module');
    const generated = b.bundle.code;
    // b._printResources();
    // b._printSorted();
    t.is(generated, expected('core/module'));
  });
});
