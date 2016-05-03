(function () {
/**bandol> resource: imported.js */

var b = 0;

function testFunction() {
  return 'test';
}

let bQr = testFunction();
const test = {
  b: bQr
};
/**bandol> resource: actual.js */


console.log(bQr);

}());