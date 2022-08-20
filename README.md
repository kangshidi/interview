# interview

## JS部分
### 1.call,apply,bind的区别
```javascript
fn.call(obj, argument1, argument2, ...);
fn.apply(obj, arguments);
fn.bind(obj, argument1, argument2, ...)(); // bind返回一个函数，并未执行，所以要用小括号执行。
```
### 2.箭头函数
1. 函数内的this对象，是定义时所在的对象，不是执行时候的对象。
2. 函数内没有arguments对象。
3. 因为内部没有this，使用的是外部的this，所以不可以作为构造函数，故不能使用new命令。

### 3.哪些操作会引起内存泄漏？
1. 全局变量不会被回收。
解决：使用块级作用域let。
2. 闭包引起。
