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

let testPath = 'core/basic';
test(testPath, t => {
  return doBandol(testPath).then(b => {
    t.is(b.generate().code, expected(testPath));
  });
});

testPath = 'core/basic-2';
test(testPath, t => {
  return doBandol(testPath).then(b => {
    t.is(b.generate().code, expected(testPath));
  });
});
