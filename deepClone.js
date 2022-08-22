/*
 * 深拷贝。
 */
function deepClone(obj) {
  let _clone;

  // 克隆继承的属性
  _clone = Object.create(Object.getPrototypeOf(obj));

  // 克隆自身的所有属性（Symbol属性，可枚举属性，不可枚举属性）
  for (let key of Reflect.ownKeys(obj)) {
    let value = obj[key];
    _clone[key] = typeof value === "object" && value !== null ? deepClone(value) : value;
  }

  return _clone;
}

let father = {
  name: 'father'
};
let obj = {
  age: 30,
  a: [1, 2, 3],
  f: (p) => {console.log(p);},
  d: new Date(),
  e: new Error(),
  o: {
    sex: 'female',
    oo: {
      city: 'nanjing'
    }
  }
};
obj.__proto__ = father;

let clone = deepClone(obj);
console.log(clone);
