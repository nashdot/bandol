
import Test from './imported';

function main() {
  test('test');
}

function test(member) {
  console.log(member);
  test2();
}

function test2() {
  var member = Test.member;
  if (member !== null) {
    console.log('test');
  }
}

main();
