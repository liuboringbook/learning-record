## Node基础编程

### 特点

1. 基于Chrome V8引擎
2. 单线程
3. 使用JavaScript开发后端代码
4. 非阻塞I/O



课程：

1. 演示Common规范
2. 创建一个Http Server
3. 创建一个web容器，可以访问到HTML内容
4. Http模块客户端演示



### 引入和接收模块

```javascript
//1. 直接全部引用
module.exports = {
    userName:"jack",
    sayHello: function(){
        return "hello"
    }
}
//2. 部分引用
export.userName = "Tom";
export.sayHello =  function(){
    return ‘hello’
}
```

```javascript
//接收
let user = require('./User.js')
```



