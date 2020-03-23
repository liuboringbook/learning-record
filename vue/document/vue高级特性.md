# Vue高级特性

+ 不是每个都很常用，但用到的时候必须知道
+ 考察候选人对Vue的掌握是否全面，且有深度
+ 考察做过的项目是否有深度和复杂度(至少能用到高级特性)

## 常用的高级特性

### 自定义v-model



### $nextTick



### slot

### 动态，异步组件

+ :is="component-name"用法

+ 需要根据数据，动态渲染的场景。即组件类型不确定

  ![1584947978816](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1584947978816.png)

  必须用动态的属性，用静态属性会报错
#### 异步组件
+ import()函数
+ 按需加载，异步加载大组件

```html
//异步组件
<FormDemo v-if="showFormDemo"></FormDemo>
<button @click="showFormDemo =true">show form Demo</button>
//同步组件
<slotDemo></slotDemo>
```

```javascript
import slotDemo from './slotDemo.vue'  //常用的加载模式
export default{
    components:{
        FormDemo:()=>import('./fromDemo') //组件按需加载
    }
}
```

打包的时候会分开进行打包，在页面渲染的时候不会加载FormDemo组件，会大大加快加载速率。

### keep-alive

+ 缓存组件
+ 频繁切换，不需要重复渲染
+ Vue常见性能优化

如果需要切换A,B,C三个组件时，当从A切换到B的时候，组件A会被销毁，当再次重B切换到A的时候，A将再次被创建，会消耗大量性能，此时，我们自需要将A组件隐藏，使用keep-alive组件的时候，A组件就不会被频繁的创建和销毁

### mixin

+ 多个组件有相同的逻辑，抽离出来
+ mixin并不是完美的解决方法，会有一些问题
+ Vue 3提出的Composition API旨在解决这些问题

```javascript
//将公共方法和属性抽离到mixin.js文件，然后通过mixins方法获取mixin下的属性和方法
import mixin from './mixin.js'
  export default {
    mixins:[mixin],
    data(){
      return{
      }
    },
    methods:{
    },
  }
```

mixin的问题

+ 变量来源不明确，不利于阅读
+ 多mixin可能会造成命名冲突
+ mixin和组件可能出现多对多的关系，复杂度较高

## 总结

### 相关的面试技巧

+ 可以不太深入，但必须知道
+ 熟悉基本用法，了解使用场景
+ 最好能和自己的项目经验结合起来

