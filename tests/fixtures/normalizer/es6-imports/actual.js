
import { test as test2 } from './imported';

import * as test3 from './imported2';

const a = test2;
const b = test3.test;

console.log(a);
console.log(b);
