(function () {
/**bandol> resource: imported2.js */

export const test = 'Test2';
/**bandol> resource: imported.js */

export const test = 'Test';
/**bandol> resource: actual.js */
import { test } from './imported2';

import { test as test2 } from './imported';

const bQr = 'test';
const a = test2;
const b = test;

console.log(bQr);
console.log(a);
console.log(b);

}());