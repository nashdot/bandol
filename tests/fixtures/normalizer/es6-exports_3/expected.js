(function () {

const imported = '?';

function a() {
  return imported;
}

export default a;
import a from './imported';

console.log(a());

}());