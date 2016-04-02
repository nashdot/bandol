(function () {
var a = 'Test';
export { a };
let b = 1;
export { b };
const c = Math.PI * 6;
export { c };

function d() {
  return 0;
}

export { d };

function* e() {
  return 0;
}

export { e };

class Test {
  constructor() {
    this.a = 0;
  }
}

export { Test };
var f = 'f';
var g = 1;
var h = 0.1;
export { f };
export { g };
export { h };

}());