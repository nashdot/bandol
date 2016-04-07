(function () {
/**bandol> resource: imported1.js */

const a = 1;
const b = 2;
export { a, b };
console.log('imported1');
/**bandol> resource: actual.js */

import a from './imported1';
import b from './imported1';

console.log(a);

}());