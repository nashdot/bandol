(function () {
/**bandol> resource: imported.js */

var a = 'test';

function testFunction() {
  return 'test';
}

let b = testFunction();
const test = {
  a: a,
  b: b
};
/**bandol> resource: actual.js */


console.log(b);

}());