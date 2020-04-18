# Vue基本使用

## 插值和指令

数据绑定最常见的形式就是使用Mustache语法(双大括号)的文本插值：

```html
<span>Message:{{msg}}</span>
```

Mustache标签将会被替换为数据对象上的`msg`属性的值。通过`v-once`指令，你也可以执行一次性地插值，当数据改变时，插值处的内容不会更新。

```html
<span v-once>这个将不会改变：{{msg}}</span>
```

### v-html

双大括号会将数据解释为普通文本，而非HTML代码。为了输出真正的HTML，你需要使用`v-html`

```html
<p>
    Using v-html directive：<span v-html="rawHtml"></span>    
</p>
```

在站点动态渲染HTML可能会非常危险，容易导致XSS攻击，只能对可信内容使用HTML插值，绝不要对用户提供的内容使用插值

### Attribute

插值语法不能用在HTML attribute上，遇到这种青桔昂应该使用`v-bind`指令

```html
<div v-bind:id="dynamicId"></div>
```

### 使用JavaScript表达式

对于所有的数据绑定，vue都提供了完全的JavaScript表达式支持。

```html
{{number +1}}
{{ok ?'YES':'NO'}}
{{message.split('').reverse().join('')}}
<div v-bind:id="'list'+id"></div>
```

有个限制就是，每个绑定只能包含单个的表达式，不能是语句



```html
<!———这是语句，不是表达式 -->
{{var a=1}}
<!———流控制也不会生效，请使用三元表达式 -->
{{if(ok){return message}}}
```

指令是带有`v-`前缀的特殊attribute。指令的值预期是单个JavaScript表达式指令的职责是，当表达式的值改变时。将其产生的连带影响，响应地作用于DOM

```html
<p v-if="seen">我现在看到你了</p>
```

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind`指令可以用于响应式地更新HTML

```html
<a v-bind:href="url">...</a>
```

用`v-on`监听DOM事件

```html
<a v-on:click="doSometing"></a>
```

### 动态参数

```html
<a v-bind:[attributeName]="url">....</a>
```

`attributeName`会被作为一个JavaScript表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的Vue实例有一个`data`属性`attributeName`，其值为`href`，那么这个绑定将等价于`v-bind:href`

### 修饰符

修饰符是以半角句号`.`指明的特殊后缀，用于指出一个指令应该以特俗方式绑定。例如,`.prevent`修饰符告诉`v-on`指令对于触发的使用调用`event.preventDefault()`

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

### 缩写

```html
<!——— v-bind缩写 -->
<a :href="url"></a>
<!——— v-on缩写 -->
<a @click="doSomething"></a>
```

## computed 和watch

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
<script>
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
</script>
```

计算属性是基于vue的响应式依赖进行缓存的。只在相关响应式依赖发生改变时，他们才会重新求值。这就意味着只要`message`还没有发生改变多次方位`reversedMessage`计算属性会立即返回之前的计算结果，而不必再次执行函数。

### watch的高级用法

#### immediate 和handler

```html
<div id="demo">{{ fullName }}</div>
<script>
    var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      console.log('第一次没有执行～')
      this.fullName = val + ' ' + this.lastName
    }
  }
})
</script>	
```

初始化的时候watch是不会执行的，只有当firstName的值改变的时候才会执行监听计算。如果想要在第一次绑定就执行需要用到`immediate`和`handler`

```javas
 watch: {
    firstName: {
      handler(val) {
        console.log('第一次执行了～')
        this.fullName = val + ' ' + this.lastName
      },
      // 代表在watch里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  }
```

`immediate:true`代表如果在watch里生命了firstName之后，就会立即先去执行里面的handler方法，如果为false就不会绑定的时候就执行

### deep属性

watch里还有一个deep属性代表是否开启深度监听，默认为false

```html
<div id="app">
  <div>obj.a: {{obj.a}}</div>
  <input type="text" v-model="obj.a">
</div>
<script>
var vm = new Vue({
  el: '#app',
  data: {
    obj: {
    	a: 1
    }
  },
  watch: {
    obj: {
      handler(val) {
       console.log('obj.a changed')
      },
      immediate: true
    }
  }
})
</script>
```

当我们在input输入框输入数据改变obj.a的值时。我们会发现控制台没有打印出`obj.a changed`受现代JavaScript的限制，Vue不能检测到对象属性的添加或删除

默认情况下，在handler方法中只监听obj这个属性它的引用的变化，我们只有给obj复制的时候，才会监听到，比如在mounted事件钩子函数中对obj进行重新赋值

```jav
mounted(){
   this.obj={
     a:'123'
   }
}
```

我们需要监听Obj里的属性值，需要加上deep：true就能深度监听obj里的属性值

```javascript
watch: {
    obj: {
      handler(val) {
       console.log('obj.a changed')
      },
      immediate: true，
      deep: true
    }
  }
```

## class和style

我们可以传`v-bind:class`一个对象，以动态地切换class:

```html
<div v-bind:class="{active:isActive}"></div>
```

也可以在对象中传入多个属性来动态切换多个classs。此外`v-bind:class`指令也可以与普通的class属性共存

```html
<div class="static" v-bind:class="{active:isActive,'text-danger':hasError}">
</div>
```

结果渲染为：

```html
<div class="static active"></div>
```

也可以在这里绑定一个返回对象的计算属性

```html
<div v-bind:class="classObject"></div>
```

```javascript
data:{
    isActive:true,
        error:null
},
computed:{
    classObject:function(){
        return {
            active:this.isActive && !this.error,
            'text-danger':this.error && this.error.type === 'fatal'
        }
    }

```

### 数组语法

可以把一个数组传给`v-bind:class`，以应用一个class列表：

```html
<div v-bind:class="[activeClass,errorClasss]"></div>
```

```javascript
data:{
    activeClass:'active',
        errorClass:'text-danger'
}
```

渲染为：

```html
<div class="active text-danger"></div>
```

可以用三元表达式

```html
<div v-bind:class="[isActive? activeClass:'',errorClass]"></div>
```

当你在一个自定义组件中使用`class`属性时，这些class将被添加到该组件的根元素上面。这个元素上已经存在的class不会被覆盖

```javascript
Vue.component('my-component',{
    template:'<p class="foo bar">hi</p>'
})
```

然后在使用它的时候添加一些class：

```html
<my-component class="baz boo"></my-component>
```

HTML将被渲染为：

```html
<p class="foo bar baz boo"></p>
```

对于带数据绑定class也同样适用

```html
<my-component v-bind:class="{active:isActive}"></my-component>
```

当`isActive`为true时，HTML将被渲染成为：

```html
<p class="foo bar active">Hi</p>
```

`v-bidn:style`的对象语法非常像CSS，但其实是一个JavaScript对象，CSS属性名可以用驼峰式或段横线分割

```html
<div  v-bind:style="{color:active，fontSize: fontSize+'px'}"></div>
```

```javascript
data:{
    activeColor:'red',
    fontSize:30
}
```

直接绑定一个样式对象

```html
<div v-bind:style="styleObject"></div>
```

```javascript
data:{
    styleObject:{
        color:'red',
        fontSize:'13px'    
    }
}
```

`v-bind:style`的数组语法可以将多个样式应用到同一个元素上：

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

## 条件渲染

`v-if`如果在初始渲染时条件为假，则什么也不做一直到条件第一次变为真时，才开始渲染条件快。

相比之下，`v-show`就简单得多---不管初始条件是什么，元素总是会被渲染，并且知识简单地CSS进行切换

通过控制display属性，实现显示隐藏，如果更新不是频繁，推荐使用`v-if`，如果需要频繁更新，推荐使用`v-show`

`v-if`和`v-for`不推荐在一个节点上同时使用，当`v-if`与`v-for`一起使用时，`v-for`具有比`v-if`更高的优先级，

如果当前条件为假，也会执行`v-for`循环渲染，因此会大量消耗性能。

## 循环(列表)渲染

+ 为什么使用`key`

  当Vue正在更新使用`v-for`渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地更新每个元素，并且确保他们在每个索引位置正确渲染。

  这个默认的模式是高效的，但是只是适用于不依赖子组件或临时DOM状态的列表渲染

  为了给Vue一个提示，以便他能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一的`key`属性

  不要使用对象或数组之类的非基本类型作为`v-for`的`key`请用字符串或数组类型的值。

 ### 数组更新检测
  Vue将被侦听的数组的变异方法进行了包裹，他们也将会触发视图更新
  + push()    在数组结尾处向数组添加一个新的元素
  + pop()       从数组中删除最后一个元素 
  + shift()      删除首个数组元素，并且把所有元素位移到更低的索引
  + unshift()     在开头向数组添加新元素
  + splice()         为数组删除，插入和替换
  + sort()       按升序排列数组项----即最小的值位于最前面，最大的值排在最后面
  + reverse()   翻转数组项的顺序

上述数组方法属于变异方法，就是，会改变调用了这些方法的原始数组，相比之下，也有非变异方法，例如`filter()`，`concat()`和`slice()`·他们不会改变原始数组，而总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

## 事件

需要在内联语句处理器中访问原始的DOM事件。可以用特殊变量`$event`把它传入方法：

```html
<button v-on:click=warn('Form cannot be submitted yet.',$event)>
</button>
```

```javascript
methods:{
    warn:function(message,event){
        if(event){
            event.preventDefault()
        }
        alert(message)
    }
}
```

### 事件修饰符

为了处理DOM事件细节。Vue.js为`v-on`提供了事件修饰符。修饰符是由点开头的指令后缀来表示的

+ `.stop`
+ `.prevent`
+ `.capture`
+ `.self`
+ `.once`
+ `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="dothis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="dothis"></a>

<!-- 添加事件监听时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="dothis"></div>

<!-- 只当在event.target是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部触发的 -->
<div v-on:click.self="doThat">...</div>
```

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。`v-on:click.prevent.self`会阻止所有的点击

而`v-on:click.self.prevent`只会阻止对元素自身的点击

新增修饰符

```html
<!-- 滚动事件的默认行为(即滚动行为)将会立即触发 -->
<!-- 而不会等待onScroll完成 -->
<!-- 这其中包含`event.preventDefault()`的情况 -->
<div v-on:scroll.passive="onScroll"></div>
```

`.passive`修饰符尤其能提升移动端的性能

## 表单

`v-model`会忽略所有表单元素的`value`，`checked`,`selected`的初始值，而是将vue实例的数据作为数据来源。

`v-model`在内部为不同的输入元素使用不同的属性并跑出不同的事件：

+ text和textarea元素使用`value`属性和`input`事件
+ checkbox和radio使用`checked`属性和`change`事件
+ select字段将`value`作为`prop`并将`change`作为事件

### 修饰符

+ `.lazy`

在默认情况下，`v-model`在每次`input`事件触发后将输入框的值与数据进行同步。输入的时候不进行处理，输入结束的时候进行处理

```html
<!-- 在输入结束的时候更新 -->
<input v-model.lazy="msg">
```

+ `.number`

如果想自动将用户的输入值转为数值类型，如果这个值无法被`parseFloat()`解析，则返回原始的值。

```html
<input v-model.number="age" type="number">
```

+ `.trim`

如果要自动过滤用户输入的首尾空白字符，可以给`v-model`添加`trim`修饰符：

```ht
<input v-model.trim="msg">
```

