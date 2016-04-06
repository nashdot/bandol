(function () {

export const test = 1;

export const test = 2;

export const test = 3;

import { test as bQr } from './imported1';
import { test as bPq } from './imported2';
import { test } from './imported3';

console.log(bQr);
console.log(bPq);
console.log(test);

}());