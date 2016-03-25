(function () {


export class Test {
  square(n) {
    return n * n;
  }

  cube(x) {
    return x * x * x;
  }
}


import * as t from './tests';

const test = new t.Test();
const a = test.square(4);

console.log(`${ a }`);

}());