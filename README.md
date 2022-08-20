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
3. 被遗忘的定时器和回调函数。
解决：及时clear setTimeout setInterval。
4. 没有清理DOM元素引用。
及时赋值null。

### 4.闭包
函数内部定义函数，可以访问内部的局部变量。

### 5.Event Loop机制。
- js中有同步任务和异步任务，执行栈中顺序执行同步任务，只有上一个同步任务执行完毕之后才会执行下一个同步任务。
- 栈中的代码执行完毕之后会读取任务队列。
- 异步任务的回调函数会注册到任务队列中。先进先出。
- 宏任务：定时器setTimeout，setInterval，事件监听
- 微任务：promise.then
- 同一个执行队列产生的微任务总是会在宏任务之前执行。
