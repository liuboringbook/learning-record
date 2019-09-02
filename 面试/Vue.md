# 面试题

1. MVC和MVVM的区别
   - MVC数据传递的方式是单向的
   - MVVM数据传递的方式是双向的
   MVC
   M 指的是Model(模型)是后端传递的数据，V指的是View(视图)所看到的页面，
   C指的是Controller是应用程序中处理用户交互的部分
   MVC数据传递的方式
   1. view传递指令引导Controller
   2. Controller完成业务逻辑后，要求Model改变状态
   3. Model将新的数据发送到view，用户得到反馈
   
   如果用原生的HTML+JS来比喻形容的话，可以把用户通过HTML(view)层操作。JS(controller)通过事件监听，监听到view的变化，然后通过Ajax(model)进行数据的交互(向服务端的接收和发送),随即更新数据

   MVVM
   VM指的是连接view和model的桥梁，他有两个方向，一个是将模型转化为视图，即将后端传递的数据转化为所看到的页面，实现的方式是数据绑定
   二是将视图转化为模型，即将所看到的页面转化为后端的数据，实现的方式是DOM监听 
2. react和Vue的区别和共同点
   - 相同点
     + 都是通过虚拟DOM实现快速渲染
     + 轻量级
     + 响应式组件
     + 服务端渲染
     + 易于集成路由工具，打包工具以及状态管理工具
     + 优秀的支持和社区
   - 区别
      + Vue 模板和渲染函数的弹性选择，简单的语法以及项目创建，更快的渲染速度和更小的体积
      + React 更适合大型应用和更好的可测试性 同时适用于webduan和原生APP，更大的生态圈带来更多支持和工具
3. 你对Vue生命周期的理解
  
  Vue实例有一个完整生命周期，也就是从开始创建，初始化数据，编译模板，挂载Dom，渲染，更新，卸载等一系列过程，我们称这是Vue的生命周期

![生命周期图示](https://user-gold-cdn.xitu.io/2019/8/1/16c498ca0e16ac26?imageslim)  
 
 异步请求适合在哪个生命周期调用?

 官方实例的异步请求是在mounted生命周期中调用的，实际上也可以在created生命周期中调用

4. computed和watch有什么区别
  
computed：

- computed是计算属性，也就是计算值，它更多用于计算值得场景
- computed具有缓存性，computed的值在getter执行过程后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值是才会重新调用对应的getter来计算
- computed适用于计算比较消耗性能的就是那场景

watch：

- 更多的是观察的作用，类似于某些数据的监听回调，用于观察props $emit或者本组件的值，当数据变化时来执行回调进行后续操作
- 无缓存性，页面重新渲染时值不变化也会执行

5. Vue组件如何通信

- props/emit+v-on: 通过props将数据自上而下传递，而通过$emit和v-on来向上传递信息。
- EventBus: 通过EventBus进行信息的发布与订阅，也叫观察者模式，总线机制

6. Vue的双向数据绑定原理
   
   vue是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter,getter，在数据变动时发布消息给订阅者，触发相应的监听回调

   - 当一个普通点JavaScript对象传给Vue实例来作为它的data选项时，Vue将遍历它的属性，用Object.defineProperty都加上setter和getter这样的话，给这个对象的某个值复制，就会触发setter，那么就能监听到数据变化
   - complie解析模板指令，将模版中的变量替换成数据，然后初始化渲染页面视图，并将
   - 每个指令对应的节点绑定到更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知更新视图
   - Watcher订阅者是Observer和Complie之前的通信桥梁，主要做的事情是：1，在自身实例化是网属性订阅器添加自己2，自身必须有一个update()方法3，待属性变动dep.notice()通知时，调用自身的update()方法，并触发compile中绑定的回调
   - MVVM作为数据绑定的入口，整合了Observer,Compilem,Watch三者，通过Observer来监听自己的Model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起
   Observer和Complie之间的通信桥梁，达到数据变化-》视图更新；视图交互变化->数据model变更的双向绑定效果

7. Proxy相比defineProperty的优势

Object.defineProperty()的问题主要有是三个：

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套对象

Proxy还拥有的优势proxy的第二个参数可以有13中拦截方式，这比Object.defineProperty（）要更加丰富

8. Vue的路由实现：hash模式和history模式

前端路由：就是在保证只有一个HTML页面，且与用户交互时不刷新和跳转页面的同时，为SPA中每个视图展示形式匹配一个特殊的url。在刷新，前进和后退时均通过这个特殊的url来实现

需要做到两点
- 改变url且不让浏览器像服务器发送请求
- 可以监听到url变化

hash模式

hash指的就是url后的#号以及后面的字符。hash值的变化不会导致浏览器向服务器发送和请求，而且hash的改变会触发hashchange事件，浏览器的前进后退也能对其进行控制

history模式

在HTML5之前，浏览器已经有了history对象，但是早期的history只能用于多页面的跳转

```
   history.go(-1);// 后退一页
   history.forward();//前进一页
   history.back();//后退一页
   history.pushState(); //添加新的状态到历史状态栈
   history.replaceState(); //用新的状态代替当前状态
```

hash,histroy如何抉择

hash模式相比history模式的优点：
1. 兼容性更好，可以兼容到IE8
2. 无需服务端配合处理非单页的Url地址

hash模式相比于history模式的缺点:
1. 看起来更丑
2. 会导致锚点功能失效
3. 相同hash值不会触发动作将记录到历史栈中，而pushState则可以




    