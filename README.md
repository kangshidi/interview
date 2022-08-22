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


### 6.获取数据类型（浏览器内置对象类型）
```javascript
Object.prototype.toString().call(obj);
```
### 7.解决跨域
- 允许跨域的三个标签img link script
- CORS(Cross Origin Resource Sharing)跨域资源共享  
  服务端设置Access-Control-Allow-Origin  
  简单请求：HEAD，GET，POST  
  Content-Type: application/x-www-form-urlencoded或者multipart/form-data或者text/plain  
  非简单请求：PUT，DELETE  
  Content-type: application/json  
  简单请求，浏览器会追加Origin字段。  
  非简单请求，浏览器会预先发送OPITONS请求，服务器返回Access-Control-Allow-Origin和Access-Control-Allow-Methods,
  等待通过之后，浏览器再发送真是的请求，跟简单请求一样。

### 8.Set和Map的区别
Set类似数组，但成员的值都是唯一的，没有重复。
```javascript
const s = new Set([1, 2, 3,4]);
[...set]
```
Map类似于对象，是键值对的集合，但是“键”的类型不限于字符串，各种类型的值（包括对象）都可以当作键。
```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'author']
]);
map.size // 2
map.has('name') // true
map.get('name') // 张三
```

### 9.回流和重绘
DOM tree + CSSOM tree = render tree
- render 树的一部分或者全部因为大小、位置、边距发生改变而需要重建的过程，叫做回流。
- 比如颜色、背景发生改变，而不会引起布局的变化，叫做重绘。    
页面优化应该减少回流，比如一次性把css修改完，或者直接改变class名。   
不要循环追加元素到DOM树中，要把所有子元素全部添加到父元素上，最后只把一个父元素添加到DOM树中。   
不要频繁获取offset等位置信息，要存在变量中，以便下次使用。   

### 10.this
- 在方法中，this表示该方法所属的对象。
- 在函数中，this表示全局对象window。
- 在函数中，严格模式下，this是undefined。
- 在事件中，this表示接收事件的元素。
- 在call或者apply中，this可以应用到指定的对象。

### 11.原型链
每个构造函数都有一个属性prototype指向原型对象。  
每个原型对象都有一个constructor属性指向构造函数。  
每个实例都有一个属性__proto__指向原型对象。  
原型对象也是一个对象，也有__proto__属性，就这样一直通过__proto__属性向上查找，这就是原型链。













