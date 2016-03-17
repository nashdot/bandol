class Test {
  square(n) {
    return n * n;
  }

  cube(x) {
    return x * x * x;
  }
}

const bxq = new Test();
const bXz = bxq.square(4);

console.log(`${ bXz }`);