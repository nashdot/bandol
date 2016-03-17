class Test {
  square(n) {
    return n * n;
  }

  cube(x) {
    return x * x * x;
  }
}

const bQr = new Test();
const bPq = bQr.square(4);

console.log(`${ bPq }`);