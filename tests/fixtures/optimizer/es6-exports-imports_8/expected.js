(function () {
/**bandol> resource: imported.js */
const a = 'test';

let b = 'test';
let c = 1;
let d = 0.5;

function e() {}

function f() {}

class g {}

class h {}

const {
  a: a,
  b: b,
  c: c,
  d: d,
  e,
  f,
  g,
  h
};
/**bandol> resource: actual.js */


console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);
console.log(g);
console.log(h);

}());