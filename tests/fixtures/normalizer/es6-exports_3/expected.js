(function () {

const bQr = '?';
function imported() {
  return bQr;
}

export default imported;
import a from './imported';

console.log(a());

}());