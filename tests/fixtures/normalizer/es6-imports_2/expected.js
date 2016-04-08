(function () {
/**bandol> resource: imported.js */

export const test = 'Test';
/**bandol> resource: actual.js */

import { test as test2 } from './imported';

const test = 'test';

console.log(test);
console.log(test2);

}());