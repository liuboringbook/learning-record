# Vue原理(大厂必考)

+ 面试为何会考察原理 ？ 
+ 面试中如何考察？以何种方式?
+ Vue原理包括哪些 ?

## 面试为何会考察原理

+ 知其然知其所以然------各行业通用的道理
+ 了解原理，才能应用的更好(竞争激烈，择优录取)

+ 大厂造轮子(有钱有资源，业务定制，技术KPI)

## 面试如何查考原理

- 考察重点，而不是考察细节。掌握好2/8原则
- 和使用相关的原理，例如vdom，模板渲染
- 整体流程是否全面？热门技术是否有深度？

## Vue原理

+ 组件化
+ 响应式
+ vdom和diff
+ 模本编译
+ 渲染过程
+ 前端路由

### 组件化基础

很久以前就有组件化.nodejs中就存在模块化

数据驱动视图(MVVM,setState)

+ 传统组件，只是静态渲染，更新还要依赖于操作DOM
+ 数据驱动视图- Vue MVVM

#### MVVM模型

![1591603040363](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1591603040363.png)

## Vue响应式

+ 组件化的数据一旦变化，立即触发视图的更新
+ 实现数据驱动视图的第一步
+ 考察Vue原理的第一题

![1591603456489](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1591603456489.png)

数据变化是怎么被监听到的？ 

+ 核心API - `Object.defineProperty`

+ 如何实现响应式，代码演示

+ Object.defineProperty的一些缺点(vue3.0)

`Object.defineProperty`基本用法

```javascript
const data ={}
const name ='张三'
Object.defineProperty(data,"name",{
    get:function(){
        console.log('get')
        return name
    },
    set:function(newVal){
        console.log('set')
        name =newVal
    }
})
//测试
console.log(data.name)
data.name ='李四'
```

`Object.defineProperty`实现响应式

+ 监听对象，监听数组
+ 复杂对象，深度监听
+ 几个缺点

Object.defineProperty缺点

+ 深度监听，需要递归到底，一次性计算量大(在监听复杂对象的过程中)

+ 无法监听洗澡能属性/删除属性(Vue.set Vue.delete)
+ 无法原生监听数组，需要特殊处理(通过重新数组的原型实现)

## 虚拟DOM和diff

### vdom

+ vdom是实现vue和React的重要基石
+ diff算法是vdom中最核心，最关键的部分
+ vdom是一个热门话题，也是面试中的热门问题

存在原因：

+ DOM操作非常耗费性能

+ 以前用jQuery，可以自行控制DOM操作的时机，手动调整
+ Vue和React是数据驱动视图，如何有效控制DOM操作？

解决方案---vdom

+ 有了一定复杂度，想减少计算次数比较难
+ 能不能把计算，更多的转移为JS计算？因为JS执行速度很快
+ vdom-- 用JS模拟DOM结构，计算出最小的变更，操作DOM

用JS模拟DOM结构

```html
<div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size:20px">
       <li>a</li> 
    </ul>
</div>	
```

```javascript
{
    tag:'div',
    props:{
        className:'container',
            id:'div1'
    }
    children:[
        {
            tag:'p',
            className:'vdom'
        },
        {
            tag:'ul',
            props:{style:'font-size:20px'},
            children:[
                {
                    tag:'li',
                    children:'a'
                }
            ]
        }
    ]
}
```

通过snabbdom学习vdom

+ 简洁强大的vdom库，易学易用
+ Vue参考它实现的vdom和diff

### diff算法

+ diff算法是vdom中最核心，最关键的部分
+ diff算法能在日常使用vue React中体现出来(如key)
+ diff算法是前端热门话题，面试“宠儿”

diff算法描述

+ diff即对比，是一个广泛的概念，如linux diff命令，git diff等
+ 两个js对象也可以做diff
+ 两棵树做diff，如这里的vdom diff

![1591606828469](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1591606828469.png)

树diff的时间复杂度O(n^3)

+ 第一，遍历tree1；第二，遍历tree2
+ 第三，排序
+ 1000个节点，要计算1亿次，算法不可用

优化时间复杂度到O(n)

+ 只比较同一层级，不跨级比较
+ tag不相同，则直接删除重建，不再深度比较
+ tag和key，两者都相同，则认为是相同节点，不再深度比较

![1591607062848](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1591607062848.png)

![1591607080208](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1591607080208.png)

+ vdom 核心概念很重要: h,vnode,patch,diff,key等
+ vdom存在的价值更重要:数据驱动视图，控制DOM操作

## 模板编译

+ 模板是vue开发中最常用的部分，即与使用相关连的原理
+ 它不是html，有指令，插值，jS表达式，到底是什么？
  + 模板不是html，有指令，插值，JS表达式，能实现判断，循环
  + html是标签语言，只有JS才能实现判断，循环(图灵完备的)
  + 因此，模板一定是转换为某种JS代码，即编译模板

+ 面试不会直接问，但会通过“组件渲染和更新过程”考察

过程

前置知识：JS的with语法

+ 改变{}内自由变量的查找规则，当做obj属性来查找
+ 如果找不到匹配的obj属性，就会报错
+ with要慎用，它打破了作用域规则，易读性变差

vue template complier 将模板编译为render函数

```javascript
//插值
const template = `<p>{{message}}</p>`;
//with(this){return _c('p',[_v(_s(message))])}

//表达式
const template =`<p>{{flag ? message: 'no message found '}}</p>`;
// with(this){return _c('p',[_v(_s(flag ? message: 'no message found '))])}

//事件
const template =`<button @click="clickHandle">submit</button>`;
// with(this){return _c('button',{on:{"click":clickHandle}},[_v("submit")])}

```

执行render函数生成vnode

编译模板的过程

+ 模板编译为render函数，执行render函数返回vnode
+ 基于vnode再执行patch和diff
+ 使用webpack vue-loader,会在开发环境下编译模板(重要)

## 组件 渲染/更新过程

+ 一个组件渲染到页面，修改data触发更新(数据驱动视图)
+ 其背后原理是什么，需要掌握那些要点？
+ 考察对流程了解的全面程度

回顾之前的知识

+ 响应式 : 监听data属性getter setter(包括数组)
+ 模板编译：模板到render函数，再到vnode
+ vdom： patch(elem,vnode)和patch(vode,newVnode)

过程：

+ 初次渲染过程
  + 解析模板为render函数(或在开发环境已完成)
  + 触发响应式，监听data属性getter setter
  + 执行render函数，生成 vnode，patch(elem,vnode)
+ 更新过程
  + 修改data，触发setter(此前在getter中已被修改)
  + 重新执行render函数，生成new Vnode
  + patch(vnode,newVnode)
+ 异步渲染
  + 回顾nextTick(dom的渲染都是异步渲染的，nextTick会在DOM渲染完成后再回调，页面渲染时会将data的修改做整合，多次data修改只会渲染一次)
  + 汇总data的修改，一次性更新视图
  + 减少DOM操作次数，提高性能 
![1591686111932](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1591686111932.png)

## 前端路由原理

+ 稍微复杂一点的SPA,都需要路由
+ vue-router也是vue全家桶的标配之一
+ 属于“和日常使用相关联的原理”，面试常考

### hash的特点

+ hash变化会触发网页跳转，即浏览器的前进，后退
+ hash变化不会刷新页面，SPA必需的特点
+ hash永远不会提交到server端(前端自生自灭)

### H5 history

+ 用url规范的路由，但跳转时不刷新页面
+ history.puahsState
+ window.onpopState

![1591687626118](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1591687626118.png)

![1591687663046](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1591687663046.png)

两者选择

+ to B系统推荐用hash，简单易用，对url规范不敏感
+ to C系统，可以考虑选择H5 history，但需要服务端支持
+ 能选择简单的，就别用复杂的，要考虑成本和收益

