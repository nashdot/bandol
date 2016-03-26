(function () {
'not_use_strict';

export class Test {
  square(n) {
    return n * n;
  }

  cube(x) {
    return x * x * x;
  }
}

'not_use_strict';

import * as t from './tests';

const test = new t.Test();
const a = test.square(4);

console.log(`${ a }`);

}());