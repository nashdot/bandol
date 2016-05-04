(function () {
/**bandol> resource: imported.js */

const a = 'test';
const b = 'test';

function bQr() {}

class bPq {}

const test = {
  a: bQr,
  b: bPq
};
/**bandol> resource: actual.js */


console.log(bQr);
console.log(bPq);

}());