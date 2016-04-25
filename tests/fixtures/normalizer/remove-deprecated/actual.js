
function deprecated() {
  console.log('deprecated');
}

const obj = {
  test: deprecated(),
  test2: deprecated(),
  test3: 'test'
}
