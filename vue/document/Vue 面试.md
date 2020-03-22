# Vue 面试

## 常见面试题

+ V-show和v-if的区别
+ 为何v-for中要用到key关键词
+ 描述Vue组件生命周期(有父子组件的情况)
+ Vue组件如何通讯
+ 描述组件渲染和更新的过程
+ 双向数据绑定v-model的实现原理

+ 基于Vue设计一个购物车(组件结构，vuex state数据结构)

+ 前端代码为何要进行构建和打包？
+ module chunk bundle 分别什么意思·，有何区别？
+ loader和plugin 的区别
+ webpack如何实现懒加载
+ webpack常见性能优化
+ babel-runtime 和babel-polyfill的区别

## 如何应对上述面试题

+ 框架的使用(基本使用，高级特性，周边插件)
+ 框架的原理(基本原理的了解，热门技术的深度，全面性)
+ 框架的实际应用，即设计能力(组件结构，数据结构)

## 面试官为何要这样考察？

+ 保证候选人能正常工作 ----考察使用
+ 多个候选人竞争，选择有技术追求的-----考察原理
+ 看候选人是否能够独立承担项目-----考察设计能力

## Vue使用

+ 基本使用，组件使用----常用，必须会
+ 高级特性 -----不常用，但体现深度
+ Vuex和Vue-router使用

看文档学习

可以，但是最低效的方式，文档是一个备忘录，给会用的人查阅，并不是入门教程，文档全面冗长且细节过多，不能突出面试考点

### Vue基础使用

+ 日常使用，必须掌握，面试必考
+ 梳理知识点，从冗长的文档中摘出考点和重点
+ 考察形式不限(参考后面的面试真题)，但都在范围之内

#### 指令，插值

+ 插值，表达式
+ 指令，动态属性
+ v-html: 会有XSS风险，会覆盖子组件

#### computed和watch

+ computed有缓存，data不变则不会重新计算
+ watch如何深度监听
+ watch监听应用类型，拿不到oldVal

#### class和style

+ 使用动态属性
+ 使用驼峰式写法

#### 条件渲染

+ v-if v-else 的用法，可使用变量，也可使用=== 表达式
+ v-if 和v-show的区别
+ v-if和v-show的使用场景

用v-if，如果条件不符合，页面将不会渲染该节点，用v-show的话，如果条件不符合会渲染，然后用display:none，将节点隐藏

如果更新不是很频繁，推荐使用v-if,如果需要频繁更新，推荐使用v-show

 #### 循环(列表) 渲染

+ 如何遍历对象？ ----- 也可以用v-for
+ key的重要性。key不能乱写(如random或者index)
+ v-for和v-if不能一起使用

#### 事件

+ event参数，自定义参数
+ 事件修饰符，按键修饰符
+ [观察]事件被绑定到哪里？

```html
//事件修饰符
//阻止单击事件继续传播
<a v-on:click.stop="doThis"></a>
//提交事件不再重载页面
<form v-on:submit.prevent="onSubmit"></form>
//修饰符可以串联
<a v-on:click.stop.prevent="doThat"></a>
//只有修饰符
<form v-on:submit.prevent></form>
//添加事件监听器时使用事件捕获模式
//即内部元素触发的事件先在此处理，然后才交由内部元素进行处理
<div v-on:click.capture="dothis">...</div>
//只有当event.target是当前元素自身时触发处理函数
//即事件不是从内部元素触发的
 <div v-on:click.self="dothat">...</div>    
```

#### 表单

+ v-model
+ 常见表单项 texttarea checkbox radio select
+ 修饰符 lazy(输入的时候不进行处理，输入结束的时候进行处理) number(将输入的内容转换成数组类型) trim(截取输入框两端的空格)

#### 总结

+ 必须掌握，否则面试不会通过
+ 重点和考点

### Vue组件使用

+ props和$emit
+ 组件间通讯---自定义事件 

+ 组件生命周期



