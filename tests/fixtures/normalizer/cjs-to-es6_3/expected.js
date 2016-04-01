(function () {
export default {
  test: 'Test'
};
import { test as a } from './imported';

console.log(a);

}());