(function () {

const bQr = '?';
const imported = 'test' + bQr;

export default imported;
import a from './imported';

console.log(a);

}());