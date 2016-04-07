(function () {
/**bandol> resource: imported3.js */

console.log('imported3');
/**bandol> resource: imported2.js */

import a from './imported3';
console.log('imported2');
/**bandol> resource: imported1.js */

import a from './imported2';
import b from './imported3';
console.log('imported1');
/**bandol> resource: actual.js */

import a from './imported1';

console.log(a);

}());