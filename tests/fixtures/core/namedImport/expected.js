(function () {
var tests = {
  square: function (n) {
    return n * n;
  },

  cube: function (x) {
    return x * x * x;
  }
};


const bQr = tests.square(4);

console.log(`${ bQr }`);

}());