# Vue原理

## Vue工作机制

### 初始化

在`new Vue()`之后，Vue会调用进行初始化，会初始化生命周期，事件，props，methods，data，computed 

与watch等。其中最重要的是通过`Object.defineProperty`设置`setter`与·`getter`，用来实现响应式以及依赖收集

初始化之后调用`$mounted`挂载组件



![1590055030192](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1590055030192.png)

简化版

![1590055311555](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1590055311555.png)

### 编译

编译模板分为三个阶段：

1. parse

使用正则解析template中的vue的指令(v-xxx)变量等等形成语法树AST

2. optimize

标记一些静态节点，用作后面的性能优化，在diff的时候直接略过

3. generate

在第一部分生成的AST转化为渲染函数render function

