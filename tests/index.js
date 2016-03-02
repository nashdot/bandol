import test from 'ava';
import 'babel-register';
import fs from 'fs';
import { join } from 'path';
import bandol from '..';

const fixturesDir = join(__dirname, 'fixtures');
const expected = testPath => { return fs.readFileSync(join(fixturesDir, testPath, 'expected.js'), 'utf8'); };

function doBandol(testPath) {
  return bandol({
    entry: join(fixturesDir, testPath, 'actual.js')
  });
}

test('core/basic', t => {
  return doBandol('core/basic').then(b => {
    t.is(b.generate().code, expected('core/basic'));
  });
});

test('core/basic-2', t => {
  return doBandol('core/basic-2').then(b => {
    t.is(b.generate().code, expected('core/basic-2'));
  });
});

test('core/module', t => {
  return doBandol('core/module').then(b => {
    t.is(b.generate().code, expected('core/module'));
  });
});
