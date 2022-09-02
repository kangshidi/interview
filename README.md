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
1. 使用history的api（pushState，replaceState等），监听popstate事件。
2. 使用window.location.hash，监听hashchange事件。

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
```javascript
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
















