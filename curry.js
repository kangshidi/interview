// 求和。
function sum (a, b, c) {
  return a + b + c;
}

/*
 * 柯里化。
 */
function curry(fn) {
  let argArray = [];
  return function retFn() {
    argArray.push(...arguments);
    if (argArray.length >= fn.length) {
      let cloneArg = [...argArray];
      argArray = [];
      return fn.apply(this, cloneArg);
    } else {
      return retFn;
    }
  }
}

const newSum = curry(sum);
console.log(newSum(1, 2, 3));
console.log(newSum(1)(2, 3));
console.log(newSum(1)(2)(3));
