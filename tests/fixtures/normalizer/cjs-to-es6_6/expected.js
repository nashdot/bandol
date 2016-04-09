(function () {
/**bandol> resource: imported.js */
var sqrt = Math.sqrt;
function square(x) {
  return x * x;
}
function diag(x, y) {
  return sqrt(square(x) + square(y));
}
export default {
  sqrt: sqrt,
  square: square,
  diag: diag
};
/**bandol> resource: actual.js */
import { diag } from './imported';
import { square } from './imported';

console.log(square(11));
console.log(diag(4, 3));

}());