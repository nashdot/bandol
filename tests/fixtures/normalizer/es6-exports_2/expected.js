(function () {

const imported = '?';
const a = 'test' + imported;

export default a;
import a from './imported';

console.log(a);

}());