(function () {
var bQr = {
  square: function (n) {
    return n * n;
  },

  cube: function (x) {
    return x * x * x;
  }
};


const bPq = bQr.square(4);

console.log(`${ bPq }`);

}());