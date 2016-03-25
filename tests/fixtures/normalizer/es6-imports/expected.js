(function () {

export const test = 'Test2';

export const test = 'Test';
import { test } from './imported2';

import { test as bQr } from './imported';

const a = bQr;
const b = test;

console.log(a);
console.log(b);

}());