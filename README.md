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
每个构造函数都有一个属性prototype(显式原型属性)指向原型对象。   
每个实例对象都有一个属性__proto__（隐式原型属性）也指向同一个原型对象。  
原型对象也是一个对象，也有__proto__属性，就这样一直通过__proto__属性向上查找，这就是原型链。

### 12.gzip压缩
请求头中包含accept-encoding:gizp,响应头中包含content-encoding:gzip。

### 13.CDN
- CDN （Content Delivery Network）内容分发网络
- 加快用户访问网络资源的速度和稳定性，减轻源服务器的压力。
缓存服务器，负载均衡

### 14.浏览器输入域名到页面静态资源完全加载的整个过程。
1. 域名解析（浏览器缓存，hosts文件）
2. TCP连接
3. HTTP请求
4. 服务器响应
5. 客户端渲染
- 页面从上到下执行，遇到CSS和JavaScript会阻塞渲染。
- async 异步加载，不阻塞浏览器动作，加载完立即执行，不依赖DOM元素或者其他js的时候可以使用。
- defer 异步加载，不阻塞浏览器动作，等到DOM元素加载完成之后执行。

### 15.强缓存和协商缓存
- 强缓存：服务器响应头中给expires字段或者cache-control字段设置资源过期时间，浏览器判断如果请求的时间在过期时间之前，则直接使用本地缓存。
- 协商缓存：由服务器决定缓存资源是否可用。响应头中给Last-Modified字段设置资源最后修改的时间，浏览器下一次访问服务器的时候，在请求头中设置If-Modified-Since字段，值为上一次请求时的Last-Modified的值。服务器判断这两个时间是否有变化，如果没有变化，则返回304（not modified）状态码，告诉浏览器可以从本地缓存中获取资源；如果值有变化，则返回服务器上面最新的资源，并且响应头中会更新Last-Modified的值。
- Etag/If-Match，If-None-Match的处理逻辑与Last-Modified类似。Etag更精确，Last-Modified无法响应秒级别的变化。

### 16.0.1 + 0.2 != 0.3背后的原理
js采用64位双精度浮点数，二进制存储。浮点数小数位的限制截断的二进制，再转化为十进制，就会有误差。

### 17.图片懒加载
判断图片是否在可视区域内，如果在的话设置src属性。
可视区域的高度：
```javascript
document.documentElement.clientHeight/window.innerHeight
```
图片相对于视口的位置：
```javascript
imgElement.getBoundingClientRect();
```
如果bound.top <= clientHeight，说明图片已经进入可视区域内。

### 18.HTTP状态码
- 200 OK
- 500 internel server error
- 400 bad request
- 403 forbidden
- 404 page not found
- 405 method not allowed
- 304 not modified

### 19.CSS选择器的优先级
1. !important
2. style写在元素标签内（行内样式）
3. id选择器
4. 类选择器
5. 标签名选择器
6. 通配符选择器
7. 继承
8. 浏览器默认属性

### 20.delete删除数组元素，数组长度会改变吗？
不会改变，只是把相应索引的值设成了undefined。

### 21.ES6 一共有 5 种方法可以遍历对象的属性。

1. for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

2. Object.keys(obj)

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

3. Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

4. Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

5. Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

### 22.webStorage
1. 存储内容大小一般支持5M左右（不同浏览器可能不一样）
2. 浏览器通过window.sessionStorage和window.localStorage属性来实现本地存储机制。
3. 相关api如下：
```javascript
localStorage.setItem('key', 'value');
sessionStorage.setItem('key', 'value');
localStorage.getItem('key');
sessionStorage.getItem('key');
localStorage.removeItem('key');
sessionStorage.removeItem('key');
localStorage.clear();
sessionStorage.clear();
```
4. 备注：
- sessionStorage存储的内容会随着浏览器窗口关闭而消失。
- localStorage存储的内容，需要手动清除才会消失。
- getItem('key')对应的value如果获取不到，返回值则为null。
- JSON.parse(null)的结果依然是null。


### 23. 前端模块化
1. 模块化的好处
- 避免命名冲突
- 更好的分离，按需加载
- 高复用性
- 高可维护性

2. 模块化规范 <br>

(1) CommonJS <br>
- 主要应用于服务器端（node），同步加载（会有阻塞问题）。
- 也可以应用在浏览器端，但需要`browserify`编译处理。
暴露模块：
```javascript
// 暴露模块有两种方式，注意：最后暴露出来的都是exports对象！
// 第一种
module.exports = {...}

// 第二种
exports.xxx = value
```
引入模块：
```javascript
// 使用require引入，传入模块文件的路径，后缀名.js可省略不写
let module1 = require("./module1");
// 调用module1的方法
module1.foo();
```
注意： <br>
- 服务器端直接使用命令执行`node main.js`。
- 浏览器端需要使用browserify命令进行编译，不然浏览器无法解析require <br>
`browserify ./src/main.js -o ./dist/main.js` <br>
然后在html文件中引入`dist/main.js`。

(2) AMD（Asynchronous Module Definition 异步模块定义） <br>
- 异步加载，专门用于浏览器端。
- 需要借助`require.js`。 <br>
定义模块：
```javascript
// 模块moudleA：没有依赖
define(function() {
  let msg = "moudleA";
  function getMsg() {
    return msg;
  }

  // 暴露模块！！！
  return {
    getMsg
  }
})

// 模块moudleB：有依赖
define(["moduleA"], function(moduleA) {
  let msg = "moduleB";
  function foo() {
    console.log(msg, moduleA.getMsg());
  }

  // 暴露模块！！！
  return {
    foo
  }
})
```
引用模块(main.js文件)：
```javascript
// requirejs配置
requirejs.config({
  // baseUrl: 'js/lib',
  paths: {
    moduleA: './moduleA', // 不要写.js后缀，寻找时会自动加上。
    moduleB: './moduleB'
  }
});

// 使用requirejs引入moduleB
requirejs(["moduleB"], function(moduleB) {
  // 调用moduleB的方法
  moduleB.foo();
});
```
`index.html`中引入`requrie.js`:
```html
<script data-main="./main.js" src="./libs/require.js"></script>
```

(3) CMD（Common Module Definition 通用模块定义） <br>
- 用于浏览器端，可同步加载，也可异步加载。
- 借助`sea.js`实现。
- 结合了CommonJS和AMD的语法。

定义模块：
```javascript
// 有三个参数
// require：用于引入依赖
// exports：用于暴露模块
// module：用于暴露模块

// 定义模块moudle1 没有依赖
define(function(require, exports, module) {
  let msg = "moudle1";
  function foo() {
    console.log(msg);
  }
  // 暴露模块 module.exports
  module.exports = {foo}
  // 还有一种暴露方式：exports
  // exports.foo = foo;
});

// 定义模块moudle2 依赖moudle1
define(function(require, exports, module) {
  let msg = "moudle2";
  function bar() {
    console.log(msg);
  }

  // 同步加载
  let module1 = require("./module1");
  module1.foo();

  // 异步加载
  require.async("./module1", function(module1) {
    module1.foo();
  });

  // 暴露模块：exports
  exports.bar = bar;
});
```
引入模块(main.js文件)：
```javascript
// 不需要暴露，所以只接收第一个require参数即可
define(function(require) {
  // 同步加载
  let module2 = require("./module2");
  module2.bar();
});
```
`index.html`中引入`sea.js`:
```html
 <!-- 引入sea.js  -->
<script type="text/javascript" src="./libs/sea.js"></script>
<script type="text/javascript">
  // 加载入口模块
  seajs.use("./main");
  // 运行之后注意观察log打印的顺序，异步操作在同步操作执行之后才执行。
</script>
```

(4) ES6 <br>
- 浏览器和服务器通用的模块解决方案。
- 需要借助babel将es6的语法转成es5。
- 需要借助browserify解析require语法。

暴露模块：
```javascript
// 三种暴露方式

// 第一种：分别暴露
export function foo() {
  console.log("module1 foo()");
}
export function bar() {
  console.log("module1 bar()");
}

// 第二种：统一暴露
function fun() {
  console.log("module2 fun()");
}
function fun2() {
  console.log("module2 fun2()");
}
export {fun, fun2}

// 第三种：默认暴露
export default {
  msg: "module3 默认暴露",
  foo() {
    console.log(this.msg);
  }
};
```
引入模块：
```javascript
// 引入模块
import {foo as xxx, bar} from "./module1"
import {fun, fun2} from "./module2"
import module3 from "./module3"

xxx();
bar();
fun();
fun2();
module3.foo();
```
注意： <br>
- 需要安装`babel-cli`、`babel-preset-es2015`和`browserify`。
- 需要配置babel。(.babelrc文件  rc： run control)
```json
{
  "presets": ["es2015"]
}
```
- 需要运行babel将es6的语法转成es5 `npx babel src --out-dir bundle`
- 还需要使用browserify命令进行编译，不然浏览器无法解析require `browserify ./bundle/main.js -o ./dist/main.js`
- 最后在页面引入dist文件夹的中main.js即可。




### 24. Promise
1. Promise不是回调，是一个内置的构造函数，需要程序员new调用。
2. new Promise的时候，要传入一个回调函数，它是**同步回调函数**，会**立即在主线程上执行**，它被称为executor函数。
3. 每一个Promise实例都有3种状态：初始化（pending）、成功（fulfilled）、失败（rejected）。
4. 每一个Promise实例在刚被new出来的那一刻，状态都是初始化（pending）。
5. executor函数会接收到两个参数，它们都是函数，分别用形参resolve、reject表示。
- 调用resolve函数，会让Promise实例状态变为：成功（fulfilled），同时可以指定成功的value。
- 调用reject函数，会让Promise实例状态变为：失败（rejected），同时可以指定失败的reason。
6. **状态只能改变一次！!**
- pending => fulfilled
- pending => rejected
7. `Promise.prototype.then`方法：`Promise实例.then(onFulfilled, onRejected)`
- onFulfilled： 成功的回调
- onRejected： 失败的回调
- 特别注意：**then方法会返回一个新的Promise实例对象**
8. `Promise.prototype.catch`方法：`Promise实例.catch(onRejected)`
- onRejected： 失败的回调
- 说明：catch方法是then方法的语法糖，相当于：`then(undefined, onRejected)`
9. `Promise.resolve`方法：`Promise.resolve(value)`
- value的值可能是：（1）非Promise对象 （2）Promise对象
- 说明：用于快速返回一个状态为fulfilled（当value为非Promise对象时）或rejected（当value为Promise对象时，取决于这个Promise对象的状态）的Promise实例对象。
10. `Promise.reject`方法：`Promise.reject(value)`
- value的值可能是：（1）非Promise对象 （2）Promise对象
- 说明：用于快速返回一个状态必为rejected的Promise实例对象。
11. `Promise.all`方法：`Promise.all([promiseArray])`
- promiseArray：包含n个Promise实例的数组
- 说明：返回一个新的Promise实例，只有所有的Promise都成功才成功，只要有一个失败就失败。
12. `Promise.race`方法：`Promise.race([promiseArray])`
- promiseArray：包含n个Promise实例的数组
- 说明：返回一个新的Promise实例，成功还是失败由最先出结果的Promise为准。
13. 如何改变一个Promise实例的状态？（注意：状态只能改变一次！） <br>
（1）执行resolve(value)，如果当前是pending，会变成fulfilled。 <br>
（2）执行reject(reason)，如果当前是pending，会变成rejected。 <br>
（3）**执行器函数（executor）抛出异常，如果当前是pending，会变成rejected。** <br>
14. Promise实例.then()返回的是一个【新的Promise实例】，它的状态和值由什么决定？ <br>
由then()所指定的回调函数执行的结果决定。
（1）如果then所指定的回调返回的是  非Promise实例a： <br>
    **那么【新的Promise实例】状态为：成功（fulfilled），成功的value为：a。** <br>
（2）如果then所指定的回调返回的是一个 Promise实例p： <br>
    **那么【新的Promise实例】状态和值，都与p一致。** <br>
（3）如果then所指定的回调抛出异常：  <br>
    **那么【新的Promise实例】状态为：失败（rejected），reason为抛出的那个异常。** <br>
15. 中断Promise链的方法。 <br>
（1）当使用Promise的then链式调用时，在中间中断，不再调用后面的回调函数。 <br>
（2）办法：在每一个失败的回调函数中，**返回一个pendding状态的Promise实例**（`return new Promise(()=>{})`）。 <br>
16. Promise错误穿透。 <br>
（1）当使用Promise的then链式调用时，可以在最后用catch指定一个失败的回调。 <br>
（2）前面任何操作出了错误，都会传到最后失败的回调中处理。 <br>
备注：如果不存在then的链式调用，就不需要考虑then的错误穿透。 <br>
17. Promise的优势。 <br>
（1）指定回调函数的方式更加灵活，想什么时候定义就什么时候定义。 <br>
（2）支持链式调用，可以解决回调地狱问题。 <br>


### 25. async与await
1. async修饰的函数 <br>
- **函数的返回值为Promise实例**。
- Promise实例的结果由async函数执行的返回值决定。
2. await表达式。 <br>
- await右侧的表达式一般为Promise实例对象，但也可能是其他的值。
- 如果表达式是Promise实例对象，await后的返回值是**Promise成功的值**。
- 如果表达式是其他的值，直接将此值作为await的返回值。
3. 注意： <br>
- await必须写在async函数中，但async函数中可以没有await。
- **如果await的Promise实例失败了，就会抛出异常，需要通过try...catch来捕获异常**。
4. 若使用async配合await这种写法： <br>
（1）表面上不会出现任何回调函数。 <br>
（2）但实际上底层对代码进行了加工，把回调函数“还原”回来了。 <br>
（3）最终运行的代码依然是有回调的，只是程序员看不到。 <br>

### 26.宏队列与微队列
1. 宏队列中存放的都是宏任务。
2. 微队列中存放的都是微任务。
3. 规则：**每次要执行宏队列里的一个任务之前，先看微队列里是否有待执行的微任务。** <br>
（1）如果有，先执行微任务。 <br>
（2）如果没有，按照宏队列里面任务的顺序，依次执行。 <br>



# Vue部分
### 1.MVVM
MVVM表示的是Model-View-ViewModel
- Model：模型层，负责处理业务逻辑以及和服务端进行交互（Vue中的data）
- View：视图层，负责将数据模型转化为UI展示出来（Vue中的模板）
- ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁（Vue实例对象）

### 2.vue2中的双向数据绑定如何实现？有什么缺点？vue3是如何改进的？
vue2
- 视图更新模型：事件监听。
- 模型更新视图：数据劫持。Object.definedPrototy中定义set函数，更新视图。
缺点：
1. 递归遍历对象的所有属性，耗费性能。
2. 直接通过数组下标修改数组的值，界面不会更新。可以使用splice等函数解决。
3. 给对象增加或删除属性，界面不会更新，这就是要使用Vue.set和Vue.delete的原因。
vue3
使用Proxy（整个对象的“拦截器”）和Reflect实现。

### 3.SPA实现原理
SPA single page application 单页面应用
不刷新整个页面来实现页面跳转，提高用户体验。
1. 使用history的api（pushState，replaceState等），监听**popstate**事件。
2. 使用window.location.hash，监听**hashchange**事件。

### 4.Vue中常用的事件修饰符
1. .prevent : 阻止默认事件（常用）
2. .stop : 阻止事件冒泡（常用）
3. .once : 事件只触发一次（常用）
4. .capture : 使用事件的捕获模式
5. .self : 只有event.target是当前元素时才触发事件
6. .passive : 事件的默认行为立即执行，无需等待事件回调执行完毕

### 5.计算属性
- 原理：底层借助了Object.definedPrototy方法提供的getter和setter。
- get函数什么时候执行？
1. 初次读取时会调用一次。之后会缓存起来，下次从缓存中读取。
2. 当依赖的数据发生改变时会被再次调用。
- 优势：与methods实现相比，内部有缓存机制，效率更高，调试方便。
- 备注：
1. 计算属性最终会出现在vm上，直接读取使用即可。
2. 如果计算属性要被修改，那必须写set函数去响应修改，且set函数中要引起计算时所依赖的数据发生改变。

### 6.计算属性和watch的区别
1. computed能完成的功能，watch都可以完成。
2. watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。<br>
两个重要的小原则：
- 所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm或者组件实例对象。
- 所有不被Vue管理的函数（定时器的回调函数、ajax的回调函数、promise的回调函数），最好写成箭头函数，这样this的指向才是vm或者组件实例对象。

### 7.Vue、React中的key有什么作用？（key的内部原理）
1. 虚拟DOM中key的作用： <br>
key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】，随后Vue会进行【新的虚拟DOM】和【旧的虚拟DOM】的差异比较（diff算法），比较规则如下：
2. 对比规则：
- 【旧的虚拟DOM】中找到了与【新的虚拟DOM】相同的key：<br>
若虚拟DOM中内容没变，直接使用之前的真实DOM！<br>
若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
- 【旧的虚拟DOM】中未找到与【新的虚拟DOM】相同的key：<br>
创建新的真实DOM，随后渲染到页面。
3. 用index作为key可能引发的问题：
- 若对数据进行：逆序添加、逆序删除等破坏顺序操作：<br>
会产生没有必要的真实DOM更新 ==> 界面看不出效果，但效率低。
- 如果结构中包含输入类的DOM（比如input等等）：<br>
会产生错误的DOM更新 ==> 界面有问题。
4. 开发中如何选择key？
- 最好使用每条数据唯一标识作为key，比如id、身份证号、手机号等唯一值。
- 如果不存在对每条数据的逆序添加、逆序删除等破坏性操作，仅仅用于渲染列表进行展示，使用index作为key是没有问题的。

### 8.v-cloak指令（没有值）
1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
2. 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

### 9.v-once指令（没有值）
1. v-once所在节点在初次动态渲染后，就视为静态内容了。
2. 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

### 10.v-pre指令（没有值）
1. 跳过所在节点的编译过程。
2. 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

### 11.自定义指令（简单写法）什么时候被调用？
1. 指令与元素成功绑定时。（一上来）
2. 指令所在的模板被重新解析时。<br>
备注：<br>
- directive中的this指向window。Vue不接管。
- 指令定义时不加v-，但使用时要加v-。
- 指令如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。

### 12.组件中的data为什么必须写成函数？
避免组件被复用时，数据存在引用关系。

### 13.一个重要的内置关系
```javascript
VueComponent.prototype.__proto__ === Vue.prototype
```
原因：让组件实例对象（vc）可以访问到Vue原型上的属性、方法。

### 14.ref属性
1. 被用来给元素或子组件注册引用信息（id的替代者）。
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）。
3. 使用方式：<br>
打标识：
```javascript
<h1 ref="xxx">......</h1>
```
或者
```javascript
<School ref="xxx"/>
```
获取：
```javascript
this.$refs.xxx
```

### 15.props配置项
props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制一份props的内容到data中，然后去修改data中的数据。

### 16.mixin（混入）
功能：可以把多个组件共用的配置项提取成一个混入对象。<br>
使用方式：<br>
第一步定义混入(.js文件)，例如：
```javascript
export const xxx = {
  data() {...},
  methods: {...}
}
```
第二步使用混入，例如：
1. 全局混入：Vue.mixin(xxx)
2. 局部混入：配置项mixins:['xxx']

### 17.自定义hook（Vue3）
hook本质是一个函数，把setup函数中使用的Composition API进行了封装。<br>
类似于Vue2中的mixin。<br>
优势：复用代码，让setup中的逻辑更清楚易懂。

### 18.插件
功能：用于增强Vue。<br>
本质：包含install函数的对象，install函数的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。<br>
定义插件(pluginName.js文件)：
```javascript
export default {
  install(Vue) { //Vue自动调用
    Vue.filter('xxx', function(value) {...})
    Vue.directive('xxx', {...})
    Vue.mixin({...})
    Vue.prototype.myFunc = () => {}
    ...
  }
}
```
使用插件：在vm创建之前
```javascript
Vue.use(pluginName)
```

### 19.组件自定义事件
1. 一种组件间通信方式，适用于 **子组件 ===> 父组件**。
2. 绑定自定义事件。<br>
第一种方式：在父组件中，
```html
<Child @customEventName="callbackFunc" /> 或者 <Child v-on:customEventName="callbackFunc" />     
```
第二种方式：在父组件中，
```javascript
<Child ref='xxx'/>
······
mounted() {
  this.$refs.xxx.$on('customEventName', this.callbackFunc);
}
```
若想让事件只触发一次，可以使用.once修饰符，或者$once()方法。   
3. 触发自定义事件： this.$emit('customEventName', data)。    
4. 解绑自定义事件： this.$off('customEventName')。    
5. 组件上也可以绑定原生DOM事件，需要使用.native修饰符。    
6. 注意：通过this.$refs.xxx.$on('customEventName', this.callbackFunc)绑定自定义事件时，回调函数要么定义在methods中，要么使用箭头函数，否则this指向会出问题（会指向触发该事件的VueComponent）！   

### 20.全局事件总线（GlobalEventBus）
1. 一种组件间通信方式，适用于 **任意组件间通信**。
2. 安装全局事件总线：
```javascript
new Vue({
  ......
  beforeCreate() {
    Vue.prototype.$bus = this; // 安装全局事件总线，$bus就是当前应用的vm
  },
  ......
})
```
3. 使用事件总线：<br>
(1)接收数据方：A组件想接受数据，则在A组件中给$bus绑定自定义事件，**事件的回调函数留在A组件本身**。
```javascript
......
mounted(){
  this.$bus.$on('customEventName', (data) => { // 要么使用箭头函数，要么使用methods中定义的方法。
    ...... // 事件回调要做的事
  })
}
......
```
(2)提供数据方：
```javascript
this.$bus.$emit('customEventName', data)
```
4. 最好在接收数据方的beforeDestory钩子中，用$off解绑当前组件所用到的事件。
```javascript
......
beforeDestory(){
  this.$bus.$off('customEventName') // 一定要指定事件名称，否则所有$bus上的事件都被解绑了！
}
......
```

### 21.消息订阅与发布(pubsub)
1. 一种组件间通信方式，适用于**任意组件间通信**。
2. 使用步骤: <br>
（1）安装pubsub： npm i pubsub-js <br>
（2）引入pubsub: import pubsub from 'pubsub-js' <br>
（3）接收数据方：A组件想要接收数据，则在A组件中订阅消息，**订阅的回调函数留在A组件自身**。
```javascript
......
mounted() {
  // 订阅消息
  pubsub.subscribe('messageName', (messageName, data) => { // 要么使用箭头函数，要么使用methods中定义的方法。
    ...... // 事件回调要做的事
  })
}
......
```
（4）提供数据方：
```javascript
// 发布消息
this.pId = pubsub.publish('messageName', data)
```
（5）最好在接收数据方的beforeDestory钩子中，取消订阅。

```javascript
......
beforeDestory() {
  // 取消订阅
  pubsub.unsubscribe(this.pId)
}
......
```

### 22.this.$nextTick(回调函数)
1. 作用：在下一次DOM更新结束后执行其指定的回调。
2. 什么时候用：当改变数据后，要基于**更新后的新DOM**进行某些操作时，要在`$nextTick`所指定的回调函数中执行。

### 23.Vue封装的过渡与动画
1. 作用：在插入、更新或删除DOM元素时，在合适的时候给元素添加样式类名。
2. 写法：<br>
（1）准备好样式：<br>
元素进入时的样式：
- v-enter：进入的起点
- v-enter-active：进入过程中
- v-enter-to：进入的终点<br>
元素离开时的样式：
- v-leave：离开时的起点
- v-leave-active：离开过程中
- v-leave-to：离开时的终点<br>
（2）使用<transition>包裹要过渡的元素，并配置name属性：
```javascript
<transition name="hello" appear>
  <h1 v-show=“isShow”>你好</h1>
</transition>
```
（3）备注：若有多个元素需要过渡，则需要使用`<transition-group>`标签，且每个元素都要指定key值。

### 24.Vue脚手架配置代理，在前端解决跨域
编写vue.config.js文件，配置具体如下：
```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api1': { // 匹配所有以‘/api1’开头的请求路径
        target: 'http://localhost:5000', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {
          '^/api1': ''
        }
      },
      '/api2': { // 匹配所有以‘/api2’开头的请求路径
        target: 'http://localhost:5001', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {
          '^/api2': ''
        }
      }
    }
  }
}
// changeOrigin设置为true时，服务器收到的请求头中host为：localhost:5000
// changeOrigin设置为false时，服务器收到的请求头中host为：localhost:8080
// changeOrigin默认值为true
```
真正发请求的地址要写成本地的代理服务器地址8080：
```javascript
axios.get('http://localhost:8080/api1/interfaceName').then(response => {
  console.log(response.data);
}, error => {
  console.log(error.message);
})
```

### 25.插槽
1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信方式，适用于**父组件 ==> 子组件**。
2. 分类：默认插槽、具名插槽、作用域插槽。
3. 使用方式：<br>
（1）默认插槽：
```html
// 父组件中：
<Child>
  <div>html结构</div>
</Child>

// 子组件中：
<div>
  <!-- 定义插槽 -->
  <slot>插槽默认内容</slot>
</div>
```
（2）具名插槽：
```html
// 父组件中：
<Child>
  <template slot="name1">
    <div>html结构111</div>
  </template>
  <template v-slot:name2>
    <div>html结构222</div>
  </template>
</Child>

// 子组件中：
<div>
  <!-- 定义插槽 -->
  <slot name="name1">插槽默认内容111</slot>
  <slot name="name2">插槽默认内容222</slot>
</div>
```
（3）作用域插槽：<br>
理解：数据在子组件自身，但数据生成的结构需要组件的使用者来决定。<br>
```javascript
// 父组件中：
<Child>
  <template scope="data">
    <div>{{data.title}}</div>
    <div v-for="(item,index) in data.list" :key="index">{{item}}</div>
  </template>
</Child>
<Child>
  <template slot-scope="data">
    <h3>{{data.title}}</h3>
    <ul>
      <li v-for="(item,index) in data.list" :key="index">{{item}}</li>
    </ul>
  </template>
</Child>

// 子组件中：
<template>
  <div>
    <!-- 定义插槽 -->
    <slot :list="list" :title="title">插槽默认内容</slot>
  </div>
</template>

<script>
export default {
  name: "Child",
  data() {
    // 数据在子组件自身
    return {
      title: 'xxx',
      list: ['a', 'b', 'c']
    }
  }
}
</script>
```


### 26.Vuex
1. 概念：在Vue中实现集中式状态（数据）管理的一个vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信方式，且适用于**任意组件间通信**。
2. 何时使用？<br>
多个组件需要共享数据时。
3. 搭建vuex环境<br>
（1）创建文件：src/store/index.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 应用vuex插件
Vue.use(Vuex)

// 准备actions对象--响应组件中用户的动作
conat actions = {}
// 准备mutations对象--修改state中的数据
conat mutations = {}
// 准备state对象--保存具体的数据
conat state = {}

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
```
（2）在main.js文件中创建vm时传入store配置项
```javascript
import store from './store'

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
```
4. 基本使用<br>
（1）初始化数据、配置actions、配置mutations、操作文件store.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 应用vuex插件
Vue.use(Vuex)

// 准备actions对象--响应组件中用户的动作
conat actions = {
  // 响应组件中‘加’的动作
  add(context, value) { // context相当于一个小型的store
    // todo：一些校验和业务逻辑
    context.commit('ADD',value)
  }
}
// 准备mutations对象--修改state中的数据
conat mutations = {
  // 执行‘加’
  ADD(state, value) {
    state.sum += value
  }
}
// 准备state对象--保存具体的数据
conat state = {
  sum: 0
}

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
```
（2）组件中读取vuex中的数据：this.$store.state.sum <br>
（3）组件中修改vuex中的数据：this.$store.dispatch('add', data)或this.$store.commit('ADD',data) <br>
备注：若没有网络请求或者其他业务逻辑，组件中可以越过actions，即不写dispatch，直接使用commit。 <br>
5. getters的使用 <br>
（1）概念：当state中的数据需要经过加工后再使用时，使用getters加工。<br>
（2）在store.js中追加getters配置项
```javascript
······
const getters = {
  bigSum(state) { // 类似于计算属性
    return state.sum * 10
  }
}

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters // 追加getters配置项
})

```
（3）在组件中读取数据：this.$store.getters.bigSum <br>
6. mapState、mapGetters、mapActions、mapMutations的使用 <br>
（1）mapState方法：用于帮助我们映射**state**中的数据为计算属性，这样html中就不需要一直写$store.state.xxx，直接使用{{xxx}}即可。
```javascript
import {mapState} from vuex;

computed: {
  // 借助mapState生成计算属性（对象写法），计算属性的名字为：he、xuexiao、xueke
  ...mapState({he: 'sum',xuexiao: 'school', xueke: 'subject'})

  // 借助mapState生成计算属性（数组写法），计算属性的名字为：sum、school、subject
  ...mapState(['sum','school','subject'])
},
```
（2）mapGetters方法：用于帮助我们映射**getters**中的数据为计算属性，这样html中就不需要一直写$store.getters.xxx，直接使用{{xxx}}即可。
```javascript
import {mapGetters} from vuex;

computed: {
  // 借助mapGetters生成计算属性（对象写法），计算属性的名字为：bigSum
  ...mapGetters({bigSum: 'bigSum'})

  // 借助mapGetters生成计算属性（数组写法），计算属性的名字为：bigSum
  ...mapGetters(['bigSum'])
},
```
 (3）mapActions方法用于帮助我们生成与actions对话的方法，即：包含$store.dispatch("xxx")的函数。
 ```javascript
import {mapActions} from vuex;

methods: {
  // 借助mapActions生成方法：increment、decrement（对象形式）
  ...mapActions({increment: 'add', decrement: 'minus'})

  // 借助mapActions生成方法：add、minus（数组形式）
  ...mapActions(['add', 'minus'])
}
// 注意：调用increment、decrement、add、minus时，查看是否需要传参。
 ```
  (4）mapMutations方法用于帮助我们生成与mutations对话的方法，即：包含$store.commit("XXX")的函数。
 ```javascript
import {mapMutations} from vuex;

methods: {
  // 借助mapMutations生成方法：increment、decrement（对象形式）
  ...mapMutations({increment: 'ADD', decrement: 'MINUS'})

  // 借助mapMutations生成方法：ADD、MINUS（数组形式）
  ...mapMutations(['ADD', 'MINUS'])
}
// 注意：调用increment、decrement、ADD、MINUS时，查看是否需要传参。
 ```
7. 模块化+命名空间 <br>
（1）目的：数据分类，更好维护，并解决命名冲突。<br>
（2）修改 store.js
```javascript
const countAbout = {
  namespaced: true, // 开启命名空间
  state: {
    sum: 0,
    school: '西北大学',
    subject: '软件工程'
  },
  mutations: {···},
  actions: {···},
  getters: {
    bigSum(state) {
      return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced: true, // 开启命名空间
  state: {
    personList: [{
      id: '001',
      name: 'test'
    }]
  },
  mutations: {···},
  actions: {···},
  getters: {···}
}

export default new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```
（3）开启命名空间后，组件中读取state数据。<br>
```javascript
// 方式一：直接读取
this.$store.state.personAbout.personList
// 方式二：借助mapState读取
...mapState('countAbout', ['sum', 'school', 'subject'])
```
（4）开启命名空间后，组件中读取getters数据。<br>
```javascript
// 方式一：直接读取
this.$store.getters['personAbout/xxx']
// 方式二：借助mapGetters读取
...mapGetters('countAbout', ['bigSum'])
```
（4）开启命名空间后，组件中调用dispatch。<br>
```javascript
// 方式一：直接调用
this.$store.dispatch('personAbout/xxx', data)
// 方式二：借助mapActions
...mapActions('countAbout', ['add'])
```
（5）开启命名空间后，组件中调用commit。<br>
```javascript
// 方式一：直接调用
this.$store.commit('personAbout/xxx', data)
// 方式二：借助mapMutations
...mapMutations('countAbout', ['addOdd'])
```

### 27.vue路由
1. 基本使用 <br>
（1）安装vue-router，命令：npm i vue-router <br>
（2）应用插件：Vue.use(VueRouter) <br>
（3）编写router配置项：router文件夹下，index.js文件
```javascript
// 引入VueRouter
import VueRouter from 'vue-router'

// 引入组件
import About from '../components/About'
import Home from '../components/Home'

// 创建并暴露VueRouter
export default new VueRouter({
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    },
  ]
})
```
（4）在vm中添加router配置项：main.js文件
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入router
import router from './router/index.js'

// 应用VueRouter
Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(App),
  router // router配置项
})
```
（5）实现切换路由
```html
<router-link active-class="active" to="/about">Aboue</router-link>
<router-link active-class="active" to="/home">Home</router-link>
```
（6）指定组件的展示位置
```html
<router-view></router-view>
```
2. 多级（嵌套）路由 <br>
（1）配置路由规则，使用**children配置项**：
```javascript
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [ // 通过children配置子路由
        {
          path: 'news', // 此处一定不要写： /news
          component: News,
        },
        {
          path: 'message', // 此处一定不要写： /message
          component: Message,
        },
      ]
    },
  ]
```
（2）页面跳转时，要写**完整路径**：
```html
<router-link active-class="active" to="/home/news">News</router-link>
<router-link active-class="active" to="/home/message">Message</router-link>
```
3. 路由的query参数 <br>
（1）传递参数
```html
<!-- 跳转并携带query参数：to的字符串写法 -->
<router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">跳转</router-link>

<!-- 跳转并携带query参数：to的对象写法 -->
<router-link :to="{
  path: '/home/message/detail', // 备注：实际路由的配置文件中，并没有体现传递的参数。
  query: {
    id: m.id,
    title: m.title
  }
}">
  跳转
</router-link>
```
（2）接收参数
```javascript
this.$route.query.id;
this.$route.query.title;
```
4. 命名路由 <br>
（1）作用：简化路由的跳转。 <br>
（2）如何使用： <br>
给路由起名字
```javascript
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component: News,
        },
        {
          path: 'message',
          component: Message,
          children: [ // 三级路由
            {
              name: 'xiangqing', // 路由起名
              path: 'detail',
              component: Detail
            }
          ]
        },
      ]
    },
  ]
```
简化跳转
```html
<!-- 简化前 -->
<router-link to="/home/message/detail">跳转</router-link>

<!-- 简化后 -->
<router-link :to="{name: 'xiangqing'}">跳转</router-link>

<!-- 简化后（带query参数） -->
<router-link :to="{
  name: 'xiangqing',
  query: {
    id: m.id,
    title: m.title
  }
}">
  跳转
</router-link>
```
5. 路由的params参数 <br>
（1）配置路由，声明接收params参数。
```javascript
routes: [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'news',
        component: News,
      },
      {
        path: 'message',
        component: Message,
        children: [
          {
            name: 'xiangqing',
            path: 'detail/:id/:title', // 使用占位符声明接收params参数
            component: Detail
          }
        ]
      },
    ]
  },
]
```
（2）传递参数。
```html
<!-- 跳转并携带params参数：to的字符串写法 -->
<router-link :to="`/home/message/detail/${m.id}/${m.title}`">跳转</router-link>

<!-- 跳转并携带params参数：to的对象写法 -->
<router-link :to="{
  name: 'xiangqing', // 路由携带params参数时，此处必须使用name，不能使用path
  params: { // params配置项
    id: m.id,
    title: m.title
  }
}">
  跳转
</router-link>
```
（3）接收参数。
```javascript
this.$route.params.id;
this.$route.params.title;
```
6. 路由的props配置。 <br>
作用： 让路由组件更方面的收到参数，不需要写很多`$route.params.xxx`或者`$route.query.xxx`，直接在页面上引用具体的属性名（id、title）即可。
```javascript
{
  name: 'xiangqing',
  path: 'detail/:id/:title',
  component: Detail,

  // props第一种写法，值为对象，该对象中所有的key-value组合最终都会通过props形式传递Detail组件。
  props: {id: 666,title: 'hello'},

  // props第二种写法，值为布尔值，true:把路由收到的所有**params**参数通过props形式传递给Detail组件。
  props: true,

  // props第三种写法，值为函数，该函数返回的对象中每一组key-value都会通过props形式传递Detail组件。
  props(route) {
    return {
      id: route.params.id,
      title: route.params.title,
    }
  },
}
```
7.`<router-link>`的replace属性 <br>
（1）作用：控制路由跳转时操作**浏览器历史记录**的模式。 <br>
（2）浏览器的历史记录有两种写入方式：分别为**push**和**replace**。push是追加历史记录；replace是替换**当前记录**。默认为push。 <br>
（3）如何开启replace模式：`<router-link replace to="/about">跳转</router-link>` <br>

8. 编程式路由导航，不借助<router-link>实现路由跳转，让路由跳转更加灵活。 <br>
```javascript
// push跳转
this.$router.push({
  name: 'xiangqing',
  params: {
    id: xxx,
    title: xxx,
  }
})

// replace跳转
this.$router.replace({
  name: 'xiangqing',
  params: {
    id: xxx,
    title: xxx,
  }
})

// 前进一步
this.$router.foward()
// 后退一步
this.$router.back()
// 前进或者后退几步由参数决定
this.$router.go(3)
```

9. 缓存路由组件：让不展示的组件保持挂载，不被销毁。 <br>
```html
<keep-alive :include="['要缓存的组件名1', '要缓存的组件名2']">
  <router-view></router-view>
</keep-alive>
```

10. 两个新的生命周期钩子 <br>
（1）作用：路由组件独有的两个钩子，用于捕获路由组件的激活状态。 <br>
（2）具体名字：
```javascript
// 路由组件被激活时触发
activated() {
  ···
},
// 路由组件失活时触发
deactivated() {
  ···
}
```

11. 路由守卫 <br>
（1）作用：对路由进行**权限控制**。 <br>
（2）分类：全局守卫、独享守卫、组件内守卫。 <br>
（3）全局守卫：router/index.js文件
```javascript
// 全局前置守卫：初始化的时候执行、每次路由切换之前执行
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) { // 判断to的路由是否需要权限控制，isAuth是用户自定义的属性
    if (localStorage.getItem('school') === 'xibeidaxue') { // 权限控制具体规则，也可将school放在vuex中管理。
      next() // 放行
    } else {
      alert('无权限')
    }
  } else {
    next() // 放行
  }
})

// 全局后置守卫：初始化的时候执行、每次路由切换之后执行
router.afterEach((to, from) => {
  document.title = to.meta.title || 'default' // 修改网页的title
})
```
（4）独享守卫：router/index.js文件
```javascript
// 在某一个具体的路由配置中追加一个配置项beforeEnter，使用方法同beforeEach
{
  path: 'news',
  component: News,
  meta: {isAuth: true,title: '新闻'},
  beforeEnter(to, from, next){
    // 内容同beforeEach
    ···
  }
},
```
（5）组件内守卫：在component.vue文件中，追加两个配置项。
```javascript
// 进入守卫：通过路由规则进入该组件时被调用
beforeRouteEnter (to, from, next) {
  // 内容同beforeEach
}
// 离开守卫：通过路由规则离开该组件时被调用
beforeRouteLeave (to, from, next) {
  // ...
}
```

12. 路由器的两种工作模式 <br>
（1）hash模式和history模式，默认是hash模式（mode: hash）。 <br>
（2）hash模式：hash值不会包含在HTTP请求中，即：hash值不会带给服务器。
- 地址中永远带着`#`。
- 若以后地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
- 兼容性好。 <br>
（3）history模式：
- 地址干净美观。
- 兼容性和hash模式相比略差。
- 应用部署上线时需要后端支持，解决刷新页面显示404的问题。因为history值会被发送到服务器当作get请求处理。



# React部分
### 1. Context
1. 组件间通信方式，常用于 **【祖组件】==>【后代组件】**
2. 使用方法： <br/>
```javascript
// 1) 创建Context容器对象
const MyContext = React.createContext()

// 2) 渲染子组件时，外面包裹<MyContext.Provider>标签，通过value属性给后代组件传递数据
<MyContext.Provider value={{key1: value1, key2:value2}}>
  <Child />
</MyContext.Provider>

// 3) 后代组件读取数据有两种方式
// 第一种：仅适用于类组件。
static contextType = MyContext // 声明接收context
this.context // 读取context中的value数据

// 第二种：函数组件和类组件都可以使用。
<MyContext.Consumer>
  {
    value => { // value就是context中的value数据
      // return 要显示的内容
    }
  }
</MyContext.Consumer>
```


### 2. Effect Hook
1. effect hook可以让你在函数组件中执行副作用操作（用于模拟类组件中的声明周期钩子）
2. React中的副作用操作：
- 发ajax请求获取数据
- 设置订阅、启动定时器
- 手动更改真实DOM
3. 语法和说明：
```javascript
React.useEffect(() => {
  // todo 添加副作用操作
  return () => {
    // todo 添加收尾工作，比如取消订阅、清除定时器
  }
}, [stateValue]) // 如果指定的是空数组[]，回调函数只会在第一次render()后执行
// 第二个参数如果指定state中的变量，则会监测该变量的变化，变化一次，执行一次。
```
4. 可以把useEffect Hook看作如下三个函数的组合
- componentDidMount
- componentDidUpdate
- componentWillUnmount


### 3. 高阶函数
如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。
1. 若A函数，**接收的参数是一个函数**，那么A就可以称之为高阶函数。
2. 若A函数，**调用后的返回值依然是一个函数**，那么A就可以称之为高阶函数。 <br>
常见的高阶函数有：Promise、setTimeout、arr.map等

### 4. 函数柯里化
通过函数调用继续返回函数的方式，**实现多次接收参数最后统一处理**的函数编码形式。 <br>
```javascript
const sum = (a) => {
  return (b) => {
    return (c) => {
      return a + b + c;
    }
  }
}
const result = sum(1)(2)(3);
```

### 5. 生命周期（旧）
1. 初始化阶段：由`ReactDOM.render()`触发---初次渲染 <br>
(1) `constructor()` <br>
(2) **`componentWillMount()`** 即将废弃 <br>
(3) `render()`  <br>
(4) `componentDidMount()` ===> 常用 <br>
一般在这个钩子做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息等。 <br>
2. 更新阶段：由组件内部`this.setState()`或父组件的`render`触发 <br>
(1) `shouldComponentUpdate()` <br>
(2) **`componentWillUpdate()`** 即将废弃 <br>
(3) `render()` ===> 必须使用的一个  <br>
(4) `componentDidUpdate()`  <br>
3. 卸载组件：由`ReactDOM.unmountComponentAtNode()`触发  <br>
(1) `componentWillUnmount()` ===> 常用 <br>
一般在这个钩子做一些收尾的事，例如：清除定时器、取消订阅等。 <br>
4. **`componentWillReceiveProps()`** 即将废弃 <br>


### 6. 生命周期（新）
1. 初始化阶段：由`ReactDOM.render()`触发---初次渲染 <br>
(1) `constructor()` <br>
(2) **`getDerivedStateFromProps()`** <br>
(3) `render()` <br>
(4) `componentDidMount()` ===> 常用 <br>
2. 更新阶段：由组件内部`this.setState()`或父组件的`render`触发 <br>
(1) `getDerivedStateFromProps()` <br>
(2) `shouldComponentUpdate()`  <br>
(3) `render()`  <br>
(4) **`getSnapshotBeforeUpdate()`**  <br>
(5) `componentDidUpdate()` <br>
3. 卸载组件：由`ReactDOM.unmountComponentAtNode()`触发 <br>
(1) `componentWillUnmount()` ===> 常用 <br>


### 7. React脚手架配置代理
1. 方法一：在package.json中追加如下配置： <br>
```javascript
"proxy": "http://xx.xx.xx.xx:5000"
```
说明： <br>
- 优点：配置简单，前端请求资源时可以不加任何前缀。 <br>
- 缺点：不能配置多个代理。 <br>
- 工作方式：上述方式配置代理，当请求了3000（本身前端端口号）不存在的资源时，那么该请求会转发给5000（优先匹配前端资源）。 <br>

2. 方法二： <br>
(1) 第一步：创建代理配置文件 <br>
在src下创建配置文件：src/setupProxy.js <br>
(2) 编写setupProxy.js文件，配置具体代理规则。 <br>
```javascript
const proxy = require("http-proxy-middleware");

module.export = function(app) {
  app.use(
    proxy("/api1", {
      target: "http://localhost:5000", // 后台服务器地址
      changeOrigin: true, // 控制服务器接收到的请求头中host字段的值
      pathRewrite: {
        "^/api1": "" // 去除请求前缀，保证交给后台服务器的是正常请求地址（必须配置）
      }
    }),
    proxy("/api2", {
      target: "http://localhost:5001", // 后台服务器地址
      changeOrigin: true,
      pathRewrite: {
        "^/api2": ""
      }
    }),
  )
};
// changeOrigin设置为true时，服务器收到的请求头中host为：localhost:5000
// changeOrigin设置为false时，服务器收到的请求头中host为：localhost:3000
// changeOrigin默认值为false，但是我们一般将其设为true
```
说明: <br>
- 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
- 缺点：配置繁琐，前端请求资源时必须加前缀。

### 8. 组件优化 PureComponent
Component的2个问题 <br>
(1) 只要执行setState({})，即便不改变数据，组件也会重新render()。==> 效率低 <br>
(2) 只要父组件重新render，就会自动重新render子组件，即便子组件中并没有用到父组件的任何数据。==> 效率低 <br>
效率高的做法: <br>
只有当组件的state或props数据发生改变时才重新render()。 <br>
原因: <br>
Component中的`shouldComponentUpdate()`总是返回true。 <br>
解决:  <br>
（1）办法一：重写`shouldComponentUpdate()`方法，比较props和state，有变化返回true，没有变就返回false。 <br>
（2）办法二：继承`PureComponent`代替`Component`。 <br>
PureComponent的内部重写了`shouldComponentUpdate()`方法，只有props和state里面的值发生改变才返回true。 <br>
注意：  <br>
只是进行了props和state的浅比较。不要直接修改state数据，而是要产生新的state数据。 <br>


### 9. render props
如何向组件内部动态传入带内容的结构（标签）？ <br>
Vue中： <br>
- 使用slot。`<A><B/></A>` <br>
React中： <br>
- 使用children props: 通过组件标签体传入结构。 <br>
- 使用render props: 通过组件标签属性传入结构，而且可以携带数据，一般用render函数属性。 <br>

children props：
```javascript
// 包含A组件的组件
<A>
  <B/>
</A>

// A组件
{this.props.children} // 通过children展示B组件

// 问题：如果B组件需要A组件内的数据，做不到。
```

render props：(render可以改成其他名字，不过一般都用render)
```javascript
// 包含A组件的组件
<A render={(data) => <B data={data}/>} />

// A组件
{this.props.render("realData")} // 通过调用render函数展示B组件，并且给B组件传值。

// B组件
{this.props.data} // 获取data
```

### 10. 错误边界
理解： <br>
错误边界（Error boundary）用来**捕获后代组件错误**，渲染出备用页面。 <br>
特点： <br>
只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误。 <br>
使用方式： <br>
`getDerivedStateFromError`配合`componentDidCatch`
```javascript
// 容易出错的组件的父组件内
state = {
  hasError: ''
}

// 生命周期函数，一旦子组件报错，就会触发
static getDerivedStateFromError(error) {
  // 在render之前触发，返回新的state
  return {hasError: error}
}

componentDidCatch(error, info) {
  // todo 统计页面出现的错误，发送给服务器
}

render() {
  return (
    {this.state.hasError ? <div>系统繁忙</div> : <Child/>}
  )
}
```


### 11. 路由的基本使用
1. 导航区
```html
<Link to="/home">Home</Link>
```
2. 展示区---注册路由
```html
<Route path="/home" component={Home}/>
```

3. `<App/>`组件的最外侧包裹一个`<BrowserRouter></BrowserRouter>`或者`<HashRouter></HashRouter>`标签。

### 12. 路由组件和一般组件
1. 写法不同。
- 一般组件：`<Home />`
- 路由组件：`<Route path="/home" component={Home}/>`
2. 接收到的props不同。
- 一般组件：写组件标签时传递了什么，就能收到什么。
- 路由组件：接收到3个固定的属性。 <br>
(1) **history** <br>
- go: f go(n)
- goBack: f goBack()
- goForward: f goForward()
- push: f push(path, state)
- replace: f replace(path, state) <br>
(2) **location**
- pathname: "/home"
- search: ""
- state: undefined <br>
(3) **match**
- params: {}
- path: "/home"
- url: "/home" <br>

### 13. NavLink与封装NavLink
1. NavLink可以实现路由链接的高亮，通过`activeClassName`属性指定样式名。
2. **标签体内容**是一个特殊的**标签属性（属性名:children）**。
3. 通过`this.props.children`可以获取标签体内容。

### 14. Switch的使用
1. 通常情况下，path和component是一一对应的关系。
2. Switch可以提高路由匹配效率（单一匹配）。
3. 使用方法: 只展示Home组件，不会继续向下寻找。
```html
<Switch>
  <Route path="/home" component={Home}/>
  <Route path="/home" component={Test}/>
</Switch>
```


### 15. Rediect的使用
1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由。
2. 具体编码：
```javascript
<Switch>
  <Route path="/home" component={Home}/>
  <Route path="/about" component={About}/>
  <Rediect to="/home"/>
</Switch>
```

### 16. 向路由组件传递参数
1. params参数
- 路由链接（携带参数）：
```javascript
<Link to={`/home/message/detail/${id}/${title}`}>详情</Link>
```
- 注册路由（声明接收）：
```javascript
<Route path="/home/message/detail/:id/:title" component={Detail}/>
```
- 组件内接收参数：
```javascript
const {id, title} = this.props.match.params
```

2. search参数
- 路由链接（携带参数）：
```javascript
<Link to={`/home/message/detail?id=${id}&title=${title}`}>详情</Link>
```
- 注册路由（无需声明，正常注册）：
```javascript
<Route path="/home/message/detail" component={Detail}/>
```
- 组件内接收参数：
```javascript
const {search} = this.props.location
```
备注：获取到的search是urlencoded编码格式的字符串，需要使用querystring（脚手架已经默认安装该库）解析。

3. state参数（不同于组件的state，就只是路由的state）
- 路由链接（携带参数）：
```javascript
<Link to={{pathname: '/home/message/detail', state: {id: id,title: title}}}>详情</Link>
```
- 注册路由（无需声明，正常注册）：
```javascript
<Route path="/home/message/detail" component={Detail}/>
```
- 组件内接收参数：
```javascript
const {id, title} = this.props.location.state
```
备注：刷新页面也可以保留住参数。

### 17. 编程式路由导航
借助`this.props.history`对象上的api操作路由跳转、前进、后退
- `this.props.history.push(path, state)`
- `this.props.history.replace(path, state)`
- `this.props.history.goBack()`
- `this.props.history.goForward()`
- `this.props.history.go(n)`

### 18. withRouter的使用
withRouter可以加工一般组件，让一般组件具备路由组件所特有的API(history、location、match) <br>
withRouter函数的返回值是一个新组件 <br>
```javascript
import {withRouter} from "react-router-dom"

class Test extends React.Component {...}
export default withRouter(Test)
```

### 19. BrowserRouter和HashRouter的区别
1. 底层原理不一样：
- BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
- HashRouter使用的是URL的hash。
2. path表现形式不一样：
- BrowserRouter的路径中没有`#`，例如：`localhost:3000/home/message`
- HashRouter的路径包含`#`，例如：`localhost:3000/#/home/message`
3. 刷新后对路由state参数的影响：
- BrowserRouter没有任何影响，因为state保存在history对象中。
- **HashRouter刷新后导致路由state参数的丢失！！！**
4. 备注：HashRouter可以用于解决一些路径错误相关的问题。（路径不会发送到服务器）



# 性能优化
1. 减少HTTP请求 <br>
（1）CSS Sprites （雪碧图） <br>
（2）使用字体图标 <br>
（3）小图片使用base64 <br>
2. 使用浏览器缓存 <br>
（1）强缓存 <br>
- expires <br>
- cache-control <br>
（2）协商缓存 <br>
- Last-Modified/If-Modified-Since <br>
- Etag/If-None-Match <br>
3. 压缩 <br>
（1）Gzip <br>
- Accept-Encoding: gzip/Content-Encoding: gzip <br>
（2）CSS压缩 <br>
（3）JS压缩 <br>
（4）图片压缩 <br>
4. 代码 <br>
（1）减少回流和重绘 <br>
（2）防抖和节流 <br>
（3）JS异步加载 async/defer <br>
（4）CDN 缓存服务器 负载均衡 <br>
5. Webpack <br>
（1）TreeShaking 移除没有使用的代码 <br>
（2）CSS压缩，JS压缩，图片压缩 <br>
（3）按需加载（chunkFilename）和Code Split（splitChunks） <br>
（4）preload/prefetch 浏览器空闲时加载 <br>

# 安全
1. SQL注入 <br>
防御：校验用户输入，过滤非法字符。 <br>
2. XSS攻击（Cross Site Scripting）跨站脚本攻击 <br>
防御：校验用户输入，过滤非法字符。 （前后端一起）<br>
3. CSRF攻击（Cross Site Request Forgery）跨站请求伪造 <br>
防御： <br>
- 验证码
- 验证请求头的Referer
- Anti CSRF Token
  
  
  
# Vue3
### 1. setup的两个注意点
1. setup执行时机
- 在beforeCreate之前执行，**this是undefined**。
2. setup的参数
- props：值为对象，包含组件外部传递过来的，并且组件内部声明接收了的属性。
- context：上下文对象。 <br>
（1）attrs：值为对象，包含：组件外部传递进来的，但是没有在组件内部声明接收的属性。相当于`this.$attrs`。 <br>
（2）slots：收到的插槽内容，相当于`this.$slots`。 <br>
（3）emit：分发自定义事件的函数，相当于`this.$emit`。<br>

### 2. ref函数
1. 作用：定义一个响应式的数据。
2. 语法：`const xxx = ref(initValue)`。
- 创建一个包含响应式数据的**引用对象（RefImpl）**。
- JS中如何操作数据：`xxx.value`。
- 模板中读取数据：不需要`.value`，直接`<div>{{xxx}}</div>`。
3. 备注
- 接收的数据可以是基本类型，也可以是对象类型。
- 基本类型的数据：响应式依然是靠`Object.definedProperty()`的get和set完成的。
- 对象类型的数据：内部求助了vue3中的新函数`reactive()`函数。

### 3. reactive函数
1. 作用：定义一个**对象类型**的响应式数据（基本类型不要用它，要用ref函数）。
2. 语法：`const xxx = reactive({...})`接收一个对象（或数组），返回一个**代理对象（Proxy对象）**。
3. reactive定义的响应式数据是**深层次的**。
4. 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据。

### 4. toRef
1. 作用：创建一个ref对象，其value值指向另一个对象中的某个属性。
2. 语法：`const name = toRef(person, 'name')`。
3. 应用：要将响应式对象中的某个属性单独提供给外部使用时。
4. 扩展：`toRefs`与`toRef`功能一致，但可以批量创建多个ref对象，语法：`toRefs(person)`。


# Angular

### 1. 依赖注入
依赖注入就是在一个类的内部不通过new一个对象这种方式来创建依赖类的对象，而是在外部创建好需要依赖类的对象之后，通过构造函数的方式注入进来。 <br>
java中的Spring框架就是帮助程序创建好依赖类的框架，或者也叫**IOC容器（Inversion Of Control 控制反转）**，Angular也会实现依赖注入。
```javascript
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
}) // 注解
export class NotificationComponent implements OnInit {
  constructor(private msg: MessageService) {}

  // 上面是下面的简写
  constructor(@Inject(MessageService) private msg: MessageService) {}

  ngOnInit() {
    // 类内部不需要new出来这个msg对象，框架new出来传给构造函数，类内部可直接使用。
    this.msg.send();
  }
}
```

### 2. 脏检查
1. 触发脏检查 <br/>
（1）**事件监听** <br/>
（2）**定时器** ？？？ <br/>
（3）**ajax异步请求** ？？？ <br/>
2. `$watch` <br/>
**Angular中每一个绑定到UI的数据，都会有一个watch对象**。 <br/>
watch对象有三个属性 <br/>
- name：字符串，scope中对应的数据名
- getNewValue：函数，可以获取最新的name的值
- listener：函数，当数据发生改变时需要执行的操作 <br/>
`$watch`函数，接收以上三个属性，在内部创建watch对象，并且对象会被push到watchList中。  <br />
3. `$digest`  <br/>
遍历watchList，对比每个watch对象中指定的scope中的数据的值有没有变化，如果有的话，执行相应的listener函数，更新视图。 <br/>
遍历一遍并不能解决所有问题，假如有一个listener中又修改了别的watch指定的数据，那么遍历一遍就不能显示最新的数据了。 <br/>
因此，angular中设置了一个dirty变量，来表明数据中是否还有修改，在`$digest`中判断dirty如果一直为true的话，就需要一直循环，直到dirty为false。如果出现死循环的情况下，angular设置一个默认的循环次数**10次**，超过10次抛出异常，不再循环。 <br/>
```javascript
$scope.prototype.$$digestOnce = function() {
  var dirty;
  var list = this.$$watchList;

  for (var i = 0; i < list.length; i++) {
    var watch = list[i];
    var newValue = watch.getNewValue(this); // this: $scope
    var oldValue = watch.last; // 第一次是undefined
    if(newValue !== oldValue) {
      watch.listener(oldValue, newValue);
      dirty = true; // 因为listener的操作，已经检查过的数据可能会变脏
    }
    watch.last = newValue;
    return dirty;
  }
}

$scope.prototype.$$digest = function() {
  var dirty = true;
  var checkTimes = 10;
  while(dirty) {
    dirty = this.$$digestOnce();
    checkTimes++;
    if (checkTimes > 10 && dirty) {
      throw new Error("检测超过10次。");
    }
  }
}
```

### 3. AngularJS中Controller之间如何通信
1. 作用域嵌套，当前作用域中无法找到某个属性时，就会在父级作用域中进行查找，若找不到，一直向上找到`$rootScope`。
2. `$broadcast`、`$emit`、`$on`。
3. service单例模式。


### 4. Angular中组件间通信方式
1. 子组件通过`@Input`获取父组件的数据和方法。 <br>
（1）父组件调用子组件的时候传入数据。 <br>
```html
<app-child [msg]="msg" [run]="run"></app-child>
```
（2）子组件引入**Input模块**。 <br>
```typescript
import {Component, OnInit, Input} from "@angular/core";
```
（3）子组件中使用`@Input`装饰器接收父组件传过来的数据。 <br>
```typescript
export class ChildComponent implements OnInit {
  @Input msg:string; // 声明接收：数据
  @Input run:function; // 声明接收：方法

  foo() {
    console.log(this.msg);// 获取数据
    this.run(); // 执行方法
  }
}
```
2. 父组件通过`@ViewChild`获取子组件的数据和方法。 <br>
（1）父组件调用子组件的时候设置一个标记。 <br>
```html
<app-child #child></app-child>
```
（2）父组件中引入`@ViewChild`模块。 <br>
```typescript
import {Component, OnInit, ViewChild} from "@angular/core";
export class ParentComponent implements OnInit {
  @ViewChild child:any; // 子组件

  foo() {
    this.child.msg; // 获取子组件的数据
    this.child.childMethod(); // 执行子组件的方法
  }
}
```
3. 子组件通过`@Output`触发父组件的方法。 <br>
（1）子组件引入Output和EventEmitter。 <br>
```typescript
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
```
（2）子组件中实例化EventEmitter。 <br>
```typescript
@Output() private outer = new EventEmitter<string>();
```
（3）子组件通过EventEmitter对象outer广播数据。 <br>
```typescript
sentParent() {
  this.outer.emit("data from child");
}
```
（4）父组件调用子组件的时候，定义接收事件。 <br>
```html
<app-header (outer)="runParent($event)"></app-header>
```
（5）父组件接收到数据会调用自己的runParent方法，这个时候就能拿到子组件的数据。 <br>
```typescript
runParent(event) {
  console.log(event); // event: 子组件给父组件广播的数据。
}
```
4. 任意组件之间的通信方式。 <br>
- 可使用localStorage。 <br>
- service。 <br>
（1）使用angular-cli创建service。 <br>
```bash
ng g service services/storage
```
生成src/app/services目录，该目录下会生成storage.service.ts文件。 <br>
（2）`app.modules.ts`文件中引入并配置service。 <br>
```typescript
// 引入服务
import {StorageService} from "./services/storage.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    StorageService // 配置服务
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
```
（3）完善storage.service.ts文件。 <br>
```typescript
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  set(key:string, value:any) {
    // 使用localStorage做数据持久化
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key:string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
```
（4）还需要在用到服务的组件中引入StorageService服务。 <br>
```typescript
import {StorageService} from "../../services/storage.service";

export class SearchComponet implements OnInit {
  constructor(public storage:StorageService) { // 注入service
    console.log(this.storage.get('keyName')); // 调用service中的方法
  }

}
```

### 5. Rxjs异步数据流
1. 使用方法类似Promise。
```javascript
import {Observable} from "rxjs";

let stream = new Observable(observer => {
  setTimeout(() => {
    // 成功：返回数据，类似于Promise中的reslove函数
    observer.next("observable timeout");

    // 失败：类似于Promise中的reject函数
    // observer.error("error msg");
  }, 1000);
});

// 订阅数据，类似于Promise中的then函数
stream.subscribe(value => console.log(value));
```
2. promise创建之后动作无法撤回，但Observable可以通过`unsubscribe()`撤回。
```javascript
// 订阅
let timer = stream.subscribe(value => console.log(value));

setTimeout(() => {
  // 取消订阅
  stream.unsubscribe(timer);
}, 1000);
```
3. Rxjs订阅后可**多次执行**。
```javascript
// Promise版本
let p = new Promise((resolve) => {
  setInterval(() => {
    resolve("data"); // 每隔1秒执行一次
  }, 1000);
});

p.then(value => {
  console.log(value); // 只能执行一次！！！
});

// Observable版本
let stream = new Observable(observer => {
  let count = 0;
  setInterval(() => {
    observer.next(count++); // 每隔1秒执行一次
  }, 1000);
})

stream.subscribe(value => {
  console.log(value); // 每隔1秒执行一次
});
```

4. Rxjs的工具函数。 <br>
（1） map <br>
（2）filter <br>
```javascript
import {map, filter} from "rxjs/operators";

let stream = new Observable(observer => {
  let count = 0;
  setInterval(() => {
    observer.next(count++); // 每隔1秒执行一次
  }, 1000);
})

stream
  .pipe( // 管道
    filter(value => value % 2 === 0),
    map(value => value * value)
  )
  .subscribe(value => {
    console.log(value); // 只输出偶数*偶数 4, 16, 36...
  });
```


### 6. Angular请求数据。
1. `app.module.ts`文件中引入`HttpClientModule`并注入。
```javascript
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule // 注入HttpClientModule
  ],
  providers: [
    StorageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
```
2. 在用到的地方引入HttpClient并在构造函数中声明。
```javascript
import {HttpClient} from "@angular/common/http";

constructor(public http:HttpClient) {} // 注入
```
3. 发送get/post请求。
```javascript
import {HttpClient, HttpHeaders} from "@angular/common/http";

constructor(public http:HttpClient) {} // 注入

ngOnInit() {
  // get 请求
  this.http
    .get("http://xx.xx.xx.xx/api/getData")
    .subscribe(response => {
      console.log(response);
    });
}

submit() {
  // post 请求
  this.http
    .post("http://xx.xx.xx.xx/api/add", {
      userName: "xxx",
      age: 18
    }, {
      headers: new HttpHeaders({"Content-Type": "application/json"})
    })
    .subscribe(response => {
      console.log(response);
    });
}
```
4. 引入`HttpClientJsonpModule`模块，使用`this.http.jsonp()`发送请求。


===================================================================
# tiansu

### 1. 常用的行内元素。
1. 块记元素。
- div
- h1
- p
- form
- table
- ul
- ol
- hr
2. 行内元素。
- span
- label
- a
- i
- strong
3. 行内块元素。
- button
- img
- input
- textarea
- select

### 2. 伪元素与伪类的区别。有哪些伪元素？使用场合。
CSS引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是为了修饰不在文档树中的部分。<br>
比如：一句话中的第一个字母或者列表中的第一个元素。<br>
1. 伪类用于**当已有元素处于某个状态时**，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如：鼠标悬停，可以通过:hover来描述这个元素的状态。也就是说，只有处于**dom树无法描述的状态**下才能为元素添加样式。
- :active
- :checked
- :disabled
- :enabled
- **:first-child**
- **:last-child**
- :focus
- :hover
2. 伪元素用于**创建不在文档树中的元素**，并为其添加样式。比如，我们可以通过::before在一个元素的前面增加一些文本，并添加样式。**虽然用户可以看到这些文本，但这些文本实际不在dom树中**。
- ::after
- ::before
- **::first-letter**
- **::first-line**
- ::selection
- ::placeholder

### 3. 浏览器如何渲染页面的？
1. 构建DOM树。如果遇到加载js，默认同步加载，会阻塞DOM树的创建。如果指定async/defer，则进行异步加载。js加载完成之后，默认要等CSSOM构建完成之后执行，因为js即可以修改DOM也可以修改CSSOM。
2. 构建CSSOM。
3. 构建render树。
4. 页面布局。
5. 页面绘制。

### 4. 如何用CSS实现三角形？
利用border实现。
```html
<style>
.triangle {
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-bottom-color: red;
}
</style>

<div class="triangle"></div>
```

### 5. WebP
是一种同时提供了有损压缩和无损压缩的**图片文件格式**。同样的分辨率，大小比jpg、png小25%以上，大大提高网站的访问速度。

### 6. 浏览器tab页之间通信方式有哪几种？
1. 使用localStorage存储数据，同源页签之间可以通过监听`storage`事件来进行通信。
```javascript
// 其他页面使用localStorage.setItem("keyName")更新数据的时候，本页面会监听到值的变化。
window.addEventListener("storage", (event) => {
  // 打印变化的key名和最新的value值
  console.log(event.key, event.newValue);
});
```
2. cookie + setInterval 轮询
3. web socket 服务器推送，建立长连接
4. SharedWorker


### 7. iframe里面能不能获取到外面页面的cookie？
面试官说不能，我自己试了一下，好像是可以的啊，搞不懂。

### 8. try里面return了，还会不会执行finally？内部实现原理

### 9. Web安全
1. XSS (Cross Scripting) 跨站脚本攻击
- 过滤非法字符
2. CSRF(Cross Site Request Forgery) 跨站请求伪造
- 验证码
- 验证请求头中的referer
- anti CSRF token

### 10. 海量数据处理 算法


### 11. 说说比较有意思的项目，有什么亮点？


### 12. 地址栏输入到页面渲染的流程
1. 域名解析
2. 建立tcp连接
3. 发送http请求
4. 服务端响应
5. 客户端渲染

### 13. tcp三次握手
比如：A与B建立连接<br>
A先发报文给B，B接收到之后，再发报文给A，这样A就能确定：B已经收到我发的东西。<br>
那B怎么能确定它刚刚发的东西A有没有收到呢？所以A要再发一次报文给B，这样B就能确保：A已经收到了我发的东西。

### 14. 小长方形变成大长方形，前70%变化的慢，后30%变化的快。css transition 具体怎么实现？
`animation-timing-function`属性指定**动画的速度曲线**。 <br>
- ease：指定从慢速开始，然后加快，然后缓慢结束的动画。（默认）
- linear：规定从开始到结束的**速度相同**的动画。
- ease-in：规定慢速开始的动画。
- ease-out：规定慢速结束的动画。
- ease-in-out：指定开始和结束较慢的动画。
- cubic-bezier(n, n, n, n)：运行在三次贝塞尔函数中定义的自己的值。
```html
  <style>
    .effect {
      width: 100px;
      height: 30px;
      background-color: red;
      animation-name: change;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }
    @keyframes change {
      from {
        width: 100px;
      }
      to {
        width: 150px;
      }
    }
  </style>
  <div class="effect"></div>
```

### 15. vue 组件通信
1. 父子组件通信：props
2. 任意组件通信
- 全局事件总线
- 消息订阅与发布的插件，比如：pubsub.js
- vuex 集中式状态管理

### 16. vue 双向数据绑定
1. vue2中`Object.definePropoty`
2. vue3中`Proxy`和`Reflect`

### 17. es6的新特性
1. let/const
2. 箭头函数
3. 扩展运算符
4. 解构赋值
5. Set/Map
6. Promise
7. async/await
8. Proxy
9. Class
10. export/import


### 18. @import 和 link引入css的区别
1. link是html标签，不仅可以进入css文件，也可以引入其他类型的文件。`@import`是css的语法，只能引入css文件。
2. 兼容性：link没有兼容性问题；`@import`在IE5之前不支持。
3. 加载顺序：页面加载的同时会加载link；**而`@import`引入的css会等到页面被加载完再加载**，所以在网速慢的情况下，会出现一开始没有css样式，闪烁一下出现样式的问题。

### 19. 如何优化首屏加载时间
1. 减少HTTP请求。
2. 压缩图片。
3. CDN加速。
4. gzip。
5. 浏览器缓存。
6. webpack （TreeShaking/按需加载）

### 20. js中的异步处理有哪些？
1. 回调函数。
2. 事件监听。
3. 定时器。
4. Promise。

### 21. 域名解析干了啥？
域名 => IP地址

### 22. 闭包
### 23. 回流和重绘

### 24. 浏览器的垃圾回收机制
1. **引用计数** <br>
基本类型存放在栈内存中，引用类型本身存放在堆内存中，引用类型的地址存放在栈中。<br>
JS引擎每隔一段时间，检查一下**堆内存中对象的被引入次数**，如果为0的话，就释放该对象。<br>
解决：
- 被遗忘的定时器和回调函数。 解决：及时clear setTimeout setInterval。
- 没有清理DOM元素引用。 解决：及时赋值null。




# 其他

### 1. vue和angular的区别
1. 相同点
- 都支持**指令**
- 都支持**过滤器**
- 都是**双向数据绑定**
- 不支持低版本的浏览器
2. 不同点
- angular学习成本高，vue容易上手
- angular脏检查机制，watch比较多，在某些场景下性能可能不如vue。vue使用数据劫持实现双向数据绑定，独立触发视图的更新。


### 2. 文件或者blob转base64
```javascript
// 预览上传的图片
function previewFile() {
  var preview = document.querySelector('img');
  var file = document.querySelector('input[type=file]').files[0];

  var reader = new FileReader();
  reader.addEventListener('load', function() {
    // 使用base64显示图片，格式如下：
    // data:image/jpeg;base64,......
    preview.src = reader.result;
  });

  if (file) {
    /*
      readAsDataURL 方法会读取指定的 Blob 或 File 对象。
      读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend 事件，
      同时 result 属性将包含一个data:URL 格式的字符串（base64 编码）以表示所读取文件的内容。
    */
    reader.readAsDataURL(file);
  }
}
```

### 3. H5地理定位
```javascript
// geolocation在navigator对象上
navigator.geolocation.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);
});
```

### 4. requestAnimationFrame
```javascript
  // 用法和功效都类似setTimeout。
  // 但setTimeout的时间需要程序员指定，
  // requestAnimationFrame不需要指定间隔时间，以系统间隔时间为准。
  // 浏览器每隔一秒刷新页面60次，所以requestAnimationFrame执行的默认间隔时间为：1000/60=16.67ms
  requestAnimationFrame((timestamp) => {
    // timestamp为执行回调函数时performance.now()的值
    console.log(timestamp);
  });

  // 上面的代码相当于
  setTimeout(() => {console.log('xxx')}, 16.7);
```

### 5. Canvas裁剪图片
```javascript
  // 注意要在http协议上展示页面，否则toDataURL方法无法使用，会有跨域问题。
  window.onload = function() {
    var c = document.querySelector("#xxx");
    var ctx = c.getContext("2d");

    var imgBefore = document.querySelector("#before");
    // imgBefore.crossOrigin = "anonymous";
    ctx.drawImage(imgBefore, 250, 250, 150, 150, 0, 0, 150, 150); // 裁剪图片在画布上展示

    var imgAfter = document.querySelector("#after");
    // imgAfter.crossOrigin = "anonymous";
    // 将裁剪后的图片使用base64展示，注意toDataURL是canvas对象上的方法，不是context上的。
    imgAfter.src = c.toDataURL();
  };
```



# yongzhong1

### 1. 设计模式
自己如何实现消息订阅与发布模式？

### 2. V8引擎垃圾回收
1. 内存大小　 <br/>
V8引擎默认占用**1.4G内存**，可以扩展。 <br/>
64位OS：新生代64M，老生代1400M <br/>
32位OS：新生代32M，老生代700M <br/>

2. 垃圾回收算法 <br/>
（1）**新生代**算法：`Copy（复制） Scavenge（新生代互换）` <br/>
`Semi space From <=> Semi space To` <br/>
from空间和to空间各占内存32M。 <br/>
变量先一个一个存在from空间中，其中有一些可能已经不用了，但是内存中并没有删除，只是做了标记。当from空间使用的一定程度时，发现不够用了，启动垃圾回收机制，将仍然使用的变量和新的要存储的变量一起copy到to空间中，清空原有from空间的内存。随后，to空间改为from空间，原来的from空间改为to空间。注意，通常情况下，新生代总有一半的内存空间是不被使用的。 <br/>
- 为什么新生代要采用复制互换的形式？ <br/>
新生代占用内存空间比较小，采用空间换时间，来降低时间复杂度，因为copy效率非常高。 <br/>
- 为什么老生代不采用复制互换的形式？ <br/>
老生代占用内存空间比较大，浪费700M非常不划算。 <br/> <br/>

（2）**老生代**算法：`标记整理清除: Mark-Sweep（标记清除）、Mark-Compact（标记整理）` <br/>
有一个GC root节点，所有的变量都会被这个根节点引用。 <br/>
- 标记清除： <br/>
采用**广度扫描**对每一个变量进行标记，有用的变量和垃圾变量，然后进行垃圾清除。 <br/>
- 标记整理： <br/>
先**广度扫描**进行标记，然后将有用的变量移动到**连续的位置**，最后再清除垃圾。 <br/>
- 为什么要**先整理再清除**？ <br/>
因为整理的过程中，会将一些垃圾变量覆盖掉，这样最后要清除的垃圾就会变少。 <br/>
- 为什么**需要连续的内存空间**？ <br/>
碎片整理，腾出大空间。（例如：大数组等连续空间） <br/> <br/>

早期V8引擎采用：**全停顿标记** <br/>
现在V8引擎采用：**增量标记&三色标记法** 线程切换（执行主线程代码和垃圾回收）的更加频繁，每次标记需要的时间更短，页面渲染运行更加流畅。<br/> <br/>

（3）新生代如何晋升为老生代？ <br/>
是否经历过一次scavenge回收？没有的话，互换位置。 <br/>
经历过的话，semi space to空间是否已经使用了25%？ <br/>
不是的话，互换位置。 <br/>
是的话，晋升为老生代。 <br/>

（4）如何查看内存使用情况？ <br/>
- node：`process.memoryUsage()` <br/>
- 浏览器：`window.performance.memory` <br/>

（5）node执行的时候可以通过指定选项`--max-old-space-size=4096`来增大V8引擎的内存空间限制（node中V8引擎默认占用空间最大是2G）。 <br/>
```shell
node --max-old-space-size=4096 test.js
```

### 3. 二分查找
**有序列表**，跟数组中间的值比较。

### 4. vue数据劫持 依赖收集
数据劫持： `Object.defineProperty`
依赖收集：<br>
在getter中进行依赖收集，当依赖的数据被设置时，setter能获得通知，告诉render函数进行重新计算。<br>
在setter中进行notify动作，在getter中进行addObserver动作。<br>

1. 角色<br>
Vue源码中实现依赖收集有三个类：<br>
- **Dep类：观察目标**，每一个数据都有一个Dep实例对象，内部有一个subs队列，保存依赖本数据的观察者，当本数据变更时，调用`dep.notify()`通知观察者。<br>
- **Watcher类：观察者**，进行观察者函数的包装处理。如render函数会被包装成一个Watcher实例对象。**视图、计算属性、侦听器等都是Watcher**。<br>
- **Observer类：辅助的可观测类**，数组/对象通过它的转化，成为可观测数据。<br>
2. **每一个数据都有一个Dep实例对象。**<br>
访问`Dep.target`就能知道当前的观察者是谁。在后续的依赖收集中，getter中会调用`dep.depend()`,setter中会调用`dep.notify()`。
3. 将Observer类的实例挂在在`__ob__`属性上。<br>
4. 如何观测对象和数组的变化？<br>
- 对象：`Object.defineProperty()`
- 数组：Array的方法 shift,unshift,push,pop,splice,reverse,sort等等
5. Watcher

### 5. promise与async await的区别
### 6. 闭包引起的内存泄漏，还有哪些操作回引起内存泄漏？
### 7. 事件循环Event Loop（宏任务和微任务）


# yongzhong2
### 1. react性能优化，精准更新。
```javascript
import React from "react";
import Foo from "./components/Foo";

// React默认的情况下，不管子组件有没有使用到父组件的数据，只要父组件重新render，子组件必定会重新渲染。
// React.memo()：检查组件所依赖的数据是否有变化，没变化的情况下，不会重新渲染。
// React.memo()是高阶组件，传入一个组件，返回一个组件。
const PureFoo = React.memo(Foo);

function App() {
  const [time, setTime] = React.useState(Date.now());

  const [base, setBase] = React.useState("base");
  // 页面每次渲染的时候，都会重新执行以下语句，导致data每次都是一个新的引用地址，从而会引发PureFoo组件的重新渲染。
  // const data = {base};
  // React.useMemo()函数会缓存data数据，这样页面重新渲染app组件的时候，不会重新执行上一行代码。
  // 只有data依赖的base变量的值更新了，才会重新赋值data数据。
  const data = React.useMemo(() => ({base}), [base]);

  // 函数也是一个引用类型，所以页面每次渲染的时候，都会重新执行如下语句，导致每次bar的值都指向一个新的地址，从而引发PureFoo组件的重新渲染。
  // const bar = () => {
  //   console.log("bar function");
  // };
  // 可以使用useMemo返回一个函数的方式，缓存函数。
  // const bar = React.useMemo(() => {
  //   return () => {
  //     console.log("bar function");
  //   }
  // }, []);
  // React.useCallback()函数是useMemo的语法糖，专门缓存函数的，比较简洁。
  const bar = React.useCallback(() => {
    console.log("bar function");
  }, []);


  React.useEffect(() => {
    setTimeout(() => {
      setTime(Date.now());
    }, 1000);
  }, [time]);

  return (
    <div>
      <h1>App组件</h1>
      <b style={{color: "red"}}>{time}</b>
      <PureFoo data={data} func={bar}/>
    </div>
  );
}

export default App;
```

### 2. 用过的webpack插件和loader有哪些？
1. plugins
- `ESLintPlugin`
- `HtmlWebpackPlugin`：以指定的html文件为模版，创建一个新的html文件，并自动引入打包后的资源。
- `MiniCssExtractPlugin`：替换style-loader，提取css到单独的文件，通过link标签引入 。
- `CssMinimizerPlugin`：压缩css文件。
- `TerserWebpackPlugin`：压缩js文件。
2. loaders，loader的执行顺序，**从右到左**。
- style-loaer：将js中的css资源通过创建style标签的形式添加到html文件中。
- css-loader：将css资源编译成commonJS模块到js文件中。
- less-loader：将less编译成css。
- sass-loader：将sass/scss编译成css。
- webpack内置的Asset Modules可以加载图片、音频、视频、字体等资源。可以将图片转成base64。
- thread-loader：多线程打包。
- babel-loader：es6转es5。

### 3. promise伪代码
```javascript
  // 同时发请求a和b。
  // a：有可能2秒内返回，也有可能大于2秒返回。
  // b：一定在2秒内返回。
  // 需求：a在2秒内返回的时候，就使用a的值。a大于2秒返回的时候，就使用b的值。
  const a = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "a");
  });
  const b = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "b");
  });
  const timer = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "timer");
  });
  Promise.race([a, timer]).then(value => {
    if (value === "timer") {
      // a大于2秒返回的，舍弃
      // 使用b的数据
      b.then(data => {
        console.log("使用B: ", data);
      })
    } else {
      // a小于2秒返回的
      // 使用A的返回值
      console.log("使用A: ", value);
    }
  });
```

### 4. 用过哪些调试工具？
### 5. 如何性能优化？
1. 减少请求
2. 加快渲染
### 6. web安全
### 7. 组件划分的粒度
layout组件，功能组件
### 8. 如何减少内存的使用？
### 9. 鼠标有哪些事件？
### 10. 如何自己实现鼠标双击的事件？
### 11. 事件捕捉，事件冒泡，如何阻止冒泡？
最高冒到document。
### 12. f12中缓存数据在哪里看到？除了缓存还有什么东西？
Application页签
### 13. get与post的区别？application/json和form-url-encoded有什么区别？
1. form-data形式：key1=value1&key2=value2
2. application/json形式：request payload：json字符串（浏览器中可parse成json对象以方便查看）
### 14. 有没有调试过内存相关的东西？
window.performance.memory
### 15. 项目中有没有遇到什么问题？都是怎么解决的？


































  

