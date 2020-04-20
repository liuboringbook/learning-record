#  Vue高级特性

+ 不是每个都很常用，但用到的时候必须知道
+ 考察候选人对Vue掌握是否全面，且有深度
+ 考察做过的项目是否有深度和复杂度(至少能用到高级特性)

##  常用的高级特性

### 自定义v-model

`v-model`本质上就是语法糖，即易用v-model绑定数据后，其实就是既绑定了数据，有添加了一个input事件监听，如下：

![img](https://img2018.cnblogs.com/blog/1532111/201901/1532111-20190112161855413-368712313.png)

当在input元素中使用`v-model`实现双向数据绑定，其实就是在输入的时候，触发元素的input事件，通过这个语法糖，也能够实现父子组件数据的双向绑定，代码如下：

自定义组件的v-model

```html
//父组件
<template>
   <div>
       //自定义v-model
       <children v-model="name"></children>
    </div>
</template>
<script>
    import Children from './children'
    export default{
        components:{
           Children
        }，
        data(){
            return{
                name:'双越'
            }
        }
    }
    //1, 上面的input使用了:value而不是v-model
    //2. 上面的change和model.event要对应起来
    //3. text属性对应起来
</script>
```

```html
//子组件
<template>
    //例如： vue颜色选择
    <input type="text" :value="text" @input="$emit('change',$event.target.value)">
</template>
<script>
   export default{
       model:{
           prop:'text'.
           event:'change'
       }
       props:{
           text:String,
           default(){
               return ''
           }
       }
   }
</script>
```

### $nextTick

在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM

```javascript
//修改数据
vm.msg= 'Hello'
//DOM还未更新
Vue.nextTick(function(){
    //DOM更新
})
```

### slot

除非子组件模板包含至少一个`<slot>`插口,否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的DOM位置，并替换掉插槽标签本身

假定my-component组件有如下模板：

```html
<div>
<h2>
 <slot>
 只有在没有要分发的没容时才会显示
  </slot>    
</h2>
</div>
```

```html
//父组件模板
<div>
  <h1>
   我是父组件的标题   
   </h1>
   <my-component>
      <P>这是一些初始内容</P>
      <p>这是更多的初始内容</p> 
   </my-component> 
</div>
```

渲染结果：

```html
<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </div>
</div>
```

#### 具名插槽

`<slot>`元素可以用特殊的特性name来进一步配置如何分发内容。多个插槽可以有不同的名字。具名插槽将匹配内容片段中对应slot特性的元素。

仍然可以有一个匿名插槽，它是默认插槽，作为找不到匹配的内容片段的备用插槽。如果没有默认插槽，这些找不到匹配的内容片段将被抛弃

例如，假定我们有一个app-layout组件，它的模板为：

```html
<div class="container">
    <header>
     <slot name="header"></slot>
    </header>
    <main>
    <slot></slot>
    </main>
    <footer>
     <slot name="footer"></slot>
    </footer>
</div>
```

父组件模板：

```html
<app-layout>
    <h1 slot="header">
       这里可能是一个页面标题 
    </h1>
    <p>
        主要内容的一个段落
    </p>
    <p>另一个主要段落</p>
    <p slot=“footer”>这里有一些联系信息</p>
</app-layout>
```

渲染结果为：

```html
<div class=“container”>
  <header>
      <h1>这里可能是一个页面标题</h1> 
   </header>
    <main>
     <p>主要内容的一个段落</p>
     <p>另一个主要段落</p>
    </main>
    <footer>
     <p>这里有一些联系信息</p> 
    </footer>
</div>
```

#### 作用域插槽

在作用域内，父组件可以拿到子组件的数据，子组件可以在slot标签上绑定属性值

```html
<slot :nickName="'Tusi'"></slot>
```

而父组件通过`slot-scope`绑定的对象拿到nickName的值：

```html
<template>
   <section>
      <slot-child>
       <template slot-scope="scope">
           <div>{{scope.nickName]}}</div>  
        </template>
       </slot-child>
    </section>
</template>
```

这里大家应该都有疑问。这有什么用？我在子组件用$emit向父组件传递数据不就行了？

我觉得要从组件之间的数据流向来思考作用域插槽的应用场景.

假设第一个场景，需要你写一个商品卡片组件，并通过循环去展示多个卡片，并且要求能响应每个卡片上的图片或者其他内容的点击事件而跳转到商品详情页，你会怎么写？

![淘宝商品列表](https://user-gold-cdn.xitu.io/2019/4/3/169e0e9484441d4c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

我会使用如下的处理方式，首先将商品卡片写成一个组件Commodity.vue，而在Commodity.vue中用一个v-for来处理商品卡片列表的展示。

```html
<commodity v-for="(item,index) in commodities" @clickCommodity="onCommodityClick"></commodity>
```

Commodity组件通过$emit像父组件传递clickCommodity事件，并携带商品数据，父组件即可在 onclickCommodity方法中得到数据，进行业务处理，这样便完成了一个基本的由子到父的数据传递。

如果再往上抽象一下呢？比如我有多个运营栏目，像淘宝首页有“有好货”，“爱逛街”这样两个栏目，每个栏目下都需要有一个商品卡片列表，那么商品卡片列表CommodityList.vue就要抽成组件了。而这个包含多个运营栏目的vue组件我假设它叫ColumnList.vue，在其中通过v-for调用了CommodityList组件。

![淘宝运营栏目列表](https://user-gold-cdn.xitu.io/2019/4/3/169e0e94cee02534?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**注意**：业务来了，我希望把点击商品卡片的业务放在ColumnList.vue中处理。你们想象一下要怎么做？一种土办法就是商品按钮点击时，Commodity组件$emit通知CommodityList.vue，而CommodityList接着把事件用$emit往上抛，那么ColumnList.vue就能处理这个点击事件了。这样做完全没有问题，但是显得子组件很不纯粹，跟业务都扯上关系了。

通过作用域插槽将本应该由CommodityList处理的商品卡片点击业务onCommodityClick提升到ColumnList处理。

```html
<el-row :gutter="20">
        <el-col :span="12" v-for="(column, index) in columnList" :key="index">
            <el-card class="box-card card-column">
                <div slot="header" class="clearfix">
                    <span>{{column.columnName}}</span>
                </div>
                <commodity-list :commodities="column.commodityList">
                    <template slot-scope="scope">
                    <!-- 这里只需要给Commodity组件传入数据，响应Commodity组件的clickCommodity事件即可。
                        事件不必携带参数，完全符合父到子的数据流向，而不会发生子组件又给父组件反向发数据的情况 -->
                        <commodity :modityData="scope.row" @clickCommodity="onCommodityClick(scope.row)"></commodity>
                    </template>
                </commodity-list>
            </el-card>
        </el-col>
</el-row>

```

而CommodityList组件内部应该是改造成这样，slot接收来自父组件的商品卡片组件，这里面不涉及关于商品组件的业务，值关注其他业务和布局即可。最终就实现了组件和业务的剥离，这也就是组件化的精髓所在

```html
<el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in commodities" :key="index" style="margin-top:20px;">
            <slot :row="item"></slot>
        </el-col>
</el-row>
```

总结一下，作用域插槽适合的场景是至少包含三级以上的组件和层级，是一种优秀的组件化方案

### 动态，异步组件

+ `:is="component-name"`用法
+ 作用是为了让多个组件使用同一个挂载点，并动态切换
+ 常用在需要根据数据，动态渲染的场景。即组件类型不确定

![1584947978816](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1584947978816.png)

#### 异步组件

+ 通过import()函数导入
+ 按需加载，异步加载大组件

```html
//异步组件
<FormDemo v-if="showFormDemo"></FormDemo>
<button @click="showFormDemo=true">show form Demo</button>
//同步组件
<slotDemo></slotDemo>
```

```javascript
import slotDemo from './slotDemo.vue' //常用的加载模式
export default{
    components:{
        FormDemo:()=>import('./formDemo')
    }
}
```

打包的时候会分开进行打包，在页面渲染的时候不会加载FormDemo组件，会大大加开加载速率

### keep-alive

+ 缓存组件，是vue内置的一个组件，可以使被包含的组件保留状态，避免重新渲染
+ 一般结合路由和动态组件一起使用，用于缓存组件；
+ 提供了include和exclude，两者都支持字符串和正则表达式，include表示只有名称匹配的组件会被缓存，exclude表示任何名称匹配的组件都不会被缓存，其中exclude的优先级比include高

### mixin

+ 多个组件有相同逻辑，抽离出来节省代码，方便维护
+ mixin并不是完美的解决方法，会有一些问题

基础实例：

现在有一对不同的组件，他们的作用是切换一个状态布尔值，一个模态框和一个提示框。这些提示框和模态框除了功能上，没有其他共同点：他们看起来不一样，用法不一样，但是逻辑一样

```javascript
//模态框
const Model= {
    template:'#model',
    data(){
      return{
        isShowing:false   
      }
    },
    methods:{
        toggleShow(){
            this.isShowing =!this.showing;
        }
    },
    components:{
        appChild:Child
    }
}

//提示框
const Tooltip ={
    template:'#tooltip',
    data(){
        return {
            isShowingL:false
        }
    },
    methods:{
        toggleShow(){
            this.isShowing =!isShowing;
        }
    },
    components:{
        appChild:child
    }
}
```

我们可以提取出这个逻辑并创建可以被重用的项

```javascript
const toggle = {
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  }
}

const Modal = {
  template: '#modal',
  mixins: [toggle],
  components: {
    appChild: Child
  }
};

const Tooltip = {
  template: '#tooltip',
  mixins: [toggle],
  components: {
    appChild: Child
  }
};
```

在component文件下创建mixins目录，创建这个文件的`.js`扩展名

```javascript
export const toggle ={
    data(){
        return {
            isShowing:false
        }
    },
    methods:{
        toggleShow(){
            this.showing =!this,isShowing;
        }
    }
}
```

接着在Model.vue中使用

```javascript
import Child from './Child'
import {toggle} './mixins/toggle'

export default{
    name:'model',
    mixins:[toggle],
    components:{
        apponents:Child
    }
}
```

### mixin的问题

+ 变量来源不明确
+ 多mixin可能造成命名冲突
+ mixin和组件可能出现多对多的关系，复杂度较高

