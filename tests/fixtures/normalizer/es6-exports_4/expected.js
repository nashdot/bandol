(function () {

const imported = '?';

class a {
  test() {
    return imported;
  }
}

export default a;
import a from './imported';

const b = new a();
console.log(b.test());

}());