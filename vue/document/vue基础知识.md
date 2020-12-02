# vue基础知识

## vscode插件

+ vetur 

用于初始化vue基本结构

例如生成基本的vue文件结构 可以在编辑器中输入

```javascript
vbase   基本结构包含template script style
vfor    生成for循环
vdata   生成data属性
```

+ vue vscode snippets

主要用于检查，高亮

## hello vue

### 理解Vue的设计思想

+ 数据驱动应用
+ MVVM模式的践行者

![1604917731458](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1604917731458.png)

MVVM框架的三要素：响应式，模板引擎及其渲染

响应式：vue如何监听数据变化？

模板：vue的模板如何编写和解析？

渲染：vue如何将模板转换为html？

## 模板语法

### 插值文本

数据绑定最常见的形式就是双大括号的文本插值

```html
<template>
  <div>
    <!-- 插值文本 -->
     {{title}}
  </div>
</template>

<script>
  export default {
     data() {
       return {
         title:'hello vue'
       }
     },
  }
</script>     
```

#### 特性

HTML特性不能用双大括号的形式，应该用v-bind指令

```html
<template>
<!-- 特性，属性值绑定使用v-bind指令 -->
  <div v-bind:title="title">
    <!-- 插值文本 -->
     {{title}}
  </div>
</template>
```

### 列表渲染

我们通常用`v-for`指令基于一个数组来渲染一个列表。`v-for`指令需要用`item in items`形式特殊语法，其中`items`是源数组，而`item`则是被迭代的数组元素的别名

```html
 <!-- 列表渲染 -->
     <ul>
       <li v-for="c in courses" :key="c.id">
       {{ c }}
     </li>
      <script>
  export default {
     data() {
       return {
         courses: ['web全栈','web高级']
       }
     },
  }
</script> 
```

### 表单输入绑定

可以通过使用 `v-model`指令在表单`<input>`，`<textarea>`及`<select>`元素上创建双向数据绑定。它会根据控件类型自动选择正确的方法来更新元素。 `v-model`本质上是语法糖。它将转换为输入事件以更新数据。

```html
<!-- 表单输入绑定 -->
 <input v-model="course" type="text" v-on:keydown.enter="addCourse">{{ course }}
<script>
  export default {
     data() {
       return {
         course:''
       }
     },
     methods:{
        addCourse(){
            //1.添加course到数组
            this.courses.push(this.course)
            //2.清空course
            this.course =''
        }
     }
  }
</script>
```

###  class与style绑定

```html
     <ul>
       <li v-for="c in courses" :key="c.id" :class="{active : selectedCourse === c}" @click="selectedCourse = c">
       {{ c }}
     </li>
     </ul>
```

### 模板语法的实现

在底层的实现上，vue将模板编译成虚拟DOM渲染函数，结合响应系统，Vue能够智能地计算出最少需要渲染多少组件，并把DOM操作次数减到最少

```javascript
//输出vue替我们生成的渲染函数
console.log(app.$option.render)
```

```javascript
// 它长这个样子
(function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('h2',{attrs:
{"title":title}},[_v("\n "+_s(title)+"\n ")]),_v("
"),_c('input',{directives:[{name:"model",rawName:"v-model",value:
(course),expression:"course"}],attrs:{"type":"text"},domProps:{"value":
(course)},on:{"keydown":function($event)
{if(!$event.type.indexOf('key')&&_k($event.keyCode,"enter",13,$event.key,"Enter"
))return null;return addCourse($event)},"input":function($event)
{if($event.target.composing)return;course=$event.target.value}}}),_v("
"),_c('button',{on:{"click":addCourse}},[_v("新增课程")]),_v(" "),(courses.length
== 0)?_c('p',[_v("没有任何课程信息")]):_e(),_v("
"),_c('ul',_l((courses),function(c){return _c('li',{class:{active:
(selectedCourse === c)},on:{"click":function($event){selectedCourse = c}}},
[_v(_s(c))])}),0)])}
})
```

结论：Vue通过它的编译器将模板编译成渲染函数，在数据发生变化的时候再次执行渲染函数，通过对比两次执行结果得出要做的dom操作。

## 计算属性和侦听器

```html
  <!-- 商品总数 -->
  <p>
       <!--表达式 -->
       课程总数： {{courses.length + '门'}}
       <!-- 计算属性 -->
       课程总数：{{total}}
  </p>
<script>
    export default{
      computed: {
       total() {
         //计算属性有缓存性，如果值没有发生变化，则页面不会重新渲染
         return this.courses.length +'门'
       }
     },
    }
</script>	
```

实际开发中能用computed，尽量使用computed。一个值，会影响到多个值的情景适合watch。一个值由其他值得来的，这些值变了，我也要变化，适合做多个值影响一个值

```javascript
//一个值，会影响到多个值的情景适合watch。
watch:{
    firstName(newValue,oldValue){
        this.fullName = this.firstName +' '+ this.lastName
    },
    lastName(newValue,oldValue){
        this.fullName = this.firstName+ ' '+this.lastName
    }    
}
//一个值由其他值得来的，这些值变了，我也要变化，适合做多个值影响一个值
computed:{
    fullName(){
        return this.firstName +' '+this.lastName 
    }
}
```

+ 计算属性有缓存性，计算所得的值如果没有变化不会重复执行
+ 监听选项提供了更通用的方法，适合执行异步操作或较大开销操作的情况

## 生命周期

每个Vue实例在被创建时都要经过一系列的初始化过程---例如,需要设置数据监听，编译模板，将实例挂载到DOM并在数据变化时更新DOM等，称为Vue的生命周期

从一道面试题开始

```
关于vue的生命周期，下列哪项是不正确的?(B)[单选题]
A.Vue实例从创建到销毁的过程，就是生命周期
B.页面首次加载会触发beforeCreate，created,beforeMount,Mounted,beforeUpdate,updated
C.created表示完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
D.DOM渲染在mounted中就已经完成了
```

测试代码

```javascript
<template>
  <div>
     <h1>生命周期</h1>
     <p>{{ foo }}</p>
  </div>
</template>

<script>
  export default {
   data() {
     return {
        foo: 'foo'
     }
   },
    beforeCreate(){
      console.log('beforeCreate')
    },
    created(){
      console.log('created')
    },
    beforeMount(){
      console.log('created'+ this.$el)
    },
    mounted(){
      setTimeout(()=>{
        this.foo ='foooo'
      },2000)
      console.log('mounted'+ this.$el)
    },
    beforeUpdated(){
        console.log('beforeUpdate')
    },
    updated(){
       console.log('updated')
    }
  }
</script>
```

使用场景分析

```
{
 beforeCreate(){} //执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
 created(){} //组件初始化完毕，各种数据可以使用，常用于异步数据获取
 beforeMounted(){} //未执行渲染，更新，dom未创建
 mounted(){}  //初始化完毕，dom已创建，可用于获取访问数据和dom元素
 beforeUpdate(){} //更新前，可用于获取更新前的各种状态
 updated(){} //更新后，所有状态以是最新的
 beforeDestory(){} //销毁前，可用于一些定时器或订阅的取消
 destory(){} //组件已销毁
}
```

## 组件化

![1604928448133](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1604928448133.png)

组件是可复用的Vue实例，带有一个名字，我们可以通过`new Vue`创建的vue根实例中，把这个组件当做自定义元素来使用

### 组件注册，使用及数据传递

`Vue.component(name,options)`可用于注册组件。





### 插槽

通过使用vue提供的`<slot>`元素可以给组件传递内容。

插槽就是子组件中提供给父组件使用的一个占位符，用`<slot></slot>`表示，父组件可以在这个占位符中填充任何模板代码，如HTML，组件等，填充的内容会替换子组件中`<slot></slot>`标签

最常见的使用时弹窗，在子组件中生成弹窗，但是在父组件中定义弹窗的内容



## vue必会API盘点

### 数据相关API

当data中定义一个对象的时候例如:foo:{foo:''},如果再想在对象上添加属性或方法，并且实现响应式的话，直接在对象上添加方法将无法实现，因此需要用到Vue.set()或者删除时用Vue.delete()

+ Vue.set

向响应式对象中添加一个属性，并确保这个属性同样是响应式的，且触发视图更新

使用方法：`Vue.set(target,propertyName/index,value)`

+ Vue.delete

删除对象的属性，如果对象是响应式的，确保删除能触发更新视图

使用方法：`Vue.delete(target,propertyName/index)`

### 事件相关API

+ vm.$on

监听当前实例上的自定义事件，事件可以由`vm.$emit`触发，回调函数会接收所有传入事件触发函数的额外参数

```javascript
//相当于模板中书写 @test="callback"
vm.$on('test',function(msg){
    console.log(msg)
})
```

+ vm.$emit

触发当前实例上的事件，附加参数都会传给监听器回调

```javascript
//父子组件中的通讯，子组件向父组件中传递消息
vm.$emit('test'.'hi')
```

典型应用：事件总线

通过在Vue原型上添加一个Vue实例作为事件总线，实现组件间相互通信，而且不受组件间关系的影响

```javascript
vue.prototype.$bus = new Vue()
```

这样做可以在任意组件中使用`this.$bus`访问到该Vue实例





+ vm.$once

监听一个自定义事件，但是只触发一次，一旦触发之后，监听器就会被移除。

```javascript
vm.$once('test',function(msg){
    console.log(msg)
})
```

+ vm.$off

移除自定义事件监听器

+ 如果没有提供参数，则移除所有事件监听器
+ 如果只提供了事件，则移除该事件所有监听器
+ 如果同时提供了事件与回调，则只移除这个回调的监听器

```javascript
vm.$off(); //移除所有的事件监听器
vm.$off('test');//移除该事件所有的监听器
vm.$off('test',callback);//只移除这个回调的监听器
```

### 组件或元素引用

+ ref和vm.$refs

refs被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的`$refs`对象上。如果在普通的DOM元素上使用，引用指向就是DOM元素；如果用在子组件上，引用就指向组件实例

范例：设置输入框焦点

```vue
<input type="text"  ref="inp">

<script>
    export default{
        mounted(){
            //mounted之后才能访问inp
            this.$refs.inp.focus()
        }
    }
</script>    
```

注意

+ ref是作为渲染结果被创建的，在初始渲染时不能访问他们
+ `$refs`不是响应式的，不要试图用它在模板中做数据绑定
+ 当`v-for`用于元素或组件时，引用消息将包含DOM节点或组件实例的数组

## 过滤器

vue允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和v-bind表达式。过滤器应该被添加在JavaScript表达式的尾部，由`|`管道符号表示

```vue
<!--- 在双花括号中 -->
{{message | capitalize}}   //将message内容大写

<!--- 在`v-bind`中 --->
<div v-bind:id="rewId | formatId">
```

范例：course-list 显示价格使用货币符号

```javascript
{{c.price | currency('RMB')}}
filters:{
    currency(value, symbol = '￥'){
       return symbol +value;
    }
}
```

## 自定义指令

除了核心功能默认内置的指令(v-model和v-show)，vue也允许注册自定义指令，注意，在vue2.0中代码复用和抽象的主要形式是组件。然而有的情况下，你任然需要对普通DOM元素进行底层操作，这时候就会用到自定义指令

```vue
vue.directive('focus',{
   inserted(el){
     el.focus()
   }
})
```

使用 

```html
<input v-focus>
```

## 渲染函数

Vue推荐在绝大多数情况下使用模板来创建你的HTML。然而在一些场景中，你真的需要JavaScript的完全编程的能力，这时你可以用渲染函数，它比模板更接近编译器

基础

```javascript
render:function(createElement){
    //createElement函数返回结果是vnode
    return createElement(
       tag,  //标签名称
       data, //传递数据
       children //子节点数组 
    )
}
```

实例： 编写一个heading组件

`<heading :level="1" :title="title">{{title}}</heading>`

```javascript
Vue.component('heading',{
    props:{
        level:{
            type:String,
            required:true
        }
    },
    render(h){
      return  h(
       'h'+ this.level,  //参数1：tagname  标签名称   
       this.$slots.default // 参数3：子节点vNode数组  
      )
    }
})
```

在template中书写heading组件

```vue
<heading level="1">{{title}}</heading>
```

## 虚拟DOM

vue通过建立虚拟DOM来追踪自己要如何改变真实DOM

范例：输出虚拟DOM观察期结构

```javascript
Vue.component('heading',{
    props:{
        level:{
            type:String,
            required:true
        }
    },
    render(h){
      const vnode = h(
       'h'+ this.level,  //参数1：tagname  标签名称   
       this.$slots.default // 参数3：子节点vNode数组  
      )
      console.log(vnode)
      return vnode
    }
})
```

##  createElement参数

如何在`createElemet`函数中使用模板中的那些功能。这里是createElement接受的参数：

```javascript
//@ returns {vnode}
createElement(
   //{String|Object|Function}
  //一个HTML标签名，组件选项对象，或者
  //resolve了上述任何一种的一个async函数，必填项
  'div',
    
)
```





## 函数式组件

组件没有`管理任何状态`也没有监听任何传递给它的状态，也没有生命周期方法时，可以将组件标记为`functional`，这意味它状态(没有响应式数据)，也没有实例（没有this上下文）。可以使组件更加轻量，优化组件。

```javas
Vue.component('heading',{
  functional:true, //标记函数式组件
  props:['level','title','icon'],
  render(h,context){  //上下文传值
    let children =[];
    //属性获取
    const {icon,title,level} = context.props
    if(icon){
      children.push(h(
        'svg',
        {class:'icon'},
        [h('use',{attrs:{'xlink:href':'#icon-'+icon}})]
      ))
      //子元素获取
      children = children.concat(context.children)
    }
    vnode =h(
    'h'+ level,
    {attrs:{title}},
    children
    )
    return vnode
  }
})
```

函数式组件需要的一切都是通过`context`参数传递；

+ `props`：提供所有prop的对象
+ `children`:VNode子节点的数组
+ `slots`:一个函数，返回了包含所有插槽的对象

## 混入

混入(mixin)提供了一种非常灵活的方式，来分发Vue组件中的可复用功能。一个混入

对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混合进入该组件本身的选项

```javascript
//定义一个混入对象
var myMixin = {
    created:function(){
        this.hello()
    },
    methods:{
        hello:function(){
            console.log('hello from mixin!')
        }
    }
}
//定义一个使用混入对象的组件
Vue.component('comp',{
    mixins：[myMixin]
})
```

混入mixin时，如果都含有data数据的时候，将data数据合并，但是如果data定义重复。例如都是title的时候，优先使用组件中的data。生命周期,方法methods,计算属性等也是合并在一起，都会执行

## 插件

插件通常用来为Vue添加全局功能。插件的功能范围一般有以下几种：

1. 添加全局方法或者属性。如：vue-custom-element
2. 添加全局资源：指令/过滤器/过渡等如vue-touch
3. 通过全局混入来添加一些组件选项。如vue-router
4. 添加vue实例方法，通过他们添加到vue.prototype上实现
5. 一个库，提供自己的API，同时提供上面提到的一个或等多个功能。如vue-router

### 插件声明

vue.js的插件应该暴露一个install方法，这个方法的第一个参数是vue构造器，第二个参数是一个可选的选项对象：

```javascript
//插件需要实现install
MyPlugin.install =function(Vue,options){
    //1.添加全局方法或属性
    Vue.myGlobalMethod = function(){
        
    }
    //2.添加全局资源
    Vue.directive('my-directive',{})
    //3.注入组件选项
    Vue.mixin({
        created:function(){
            //逻辑...
        }
    })
    //4.添加实例方法
    Vue.prototype.$myMethod =function(methodOptions){}
}


//使用插件
if(type window!=='undefined' && window.Vue){
    //使用插件使用Vue.use()
    window.Vue.use(MyPlugin)
}
```

