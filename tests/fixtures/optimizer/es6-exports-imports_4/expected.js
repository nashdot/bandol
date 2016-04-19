(function () {
function square(n) {
  return n * n;
}

function cube(x) {
  return x * x * x;
}

const a = {
  square,
  cube
};


const a = square(4);

console.log(`${ a }`);

}());