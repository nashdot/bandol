(function () {

const imported = '?';

class bQr {
  test() {
    return imported;
  }
}

export default bQr;
import a from './imported';

const b = new a();
console.log(b.test());

}());