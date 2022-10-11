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
4. 若使用async配合await这种写法：
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






