(function () {
/**bandol> resource: imported1.js */

export const test = 1;
/**bandol> resource: imported2.js */

export const test = 2;
/**bandol> resource: imported3.js */

export const test = 3;
/**bandol> resource: actual.js */

import { test as test1 } from './imported1';
import { test as test2 } from './imported2';
import { test as test3 } from './imported3';

console.log(test1);
console.log(test2);
console.log(test3);

}());