# Express

## Express框架是什么？

Express是一个基于Node平台的web应用的web开发框架，它提供了一系列的强大特性，帮助你创建各种web应用。

## Express框架特性

+ 提供了方便简洁的路由定义方式
+ 对获取http请求参数进行了简化处理
+ 对模板引擎支持度高，方便渲染动态HTML页面
+ 提供了中间件机制有效控制HTTP请求
+ 拥有大量第三方中间件对功能进行扩展

## Express框架简介及初体验

![1581238318402](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1581238318402.png)

send()方法：

+ send方法内部会检测响应内容的类型
+ send()方法会自动设置http状态码
+ send()方法会帮我们自动设置响应的内容类型及编码



## 中间件

中间件就是一堆方法，可以接收客户端发来的请求，可以对请求作出响应，也可以将请求继续交给下一个中间件继续处理。

![1581305926635](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1581305926635.png)

## 什么是中间件

中间件主要由两部分构成，中间件方法以及请求处理函数

中间件方法由Express提供，负责拦截请求，请求处理函数由开发人员提供，负责处理请求

```javascript
app.get('请求路径','处理函数') //接收并处理get请求
app.post('请求路径','处理函数') //接收并处理post请求
```

可以针对同一个请求设置多个中间件，对同一个请求进行多次处理

默认情况下，请求从上到下依次匹配中间件，一旦匹配成功，终止匹配.

可以调用next方案将请求的控制权交给下一个中间件，知道遇到结束请求的中间件。

```javascript
app.get('/request',(req,res,next)=>{
    req.name ="张三";
})
app.get('/request',(req,res)=>{
    res.send(req.name);
})
```

## app.use中间件用法

app.use 匹配所有的请求方式，可以直接传入请求处理函数，代表接收所有的请求。

```javascript
app.use((req,res,next)=>{
    console.log(req.url);
    next();
})
```

app.use 第一个参数也可以请求地址，代表无论什么请求方式，只要是这个请求地址就可以接收这个请求。

```javascript
app.use('/admin',(req,res,next)=>{
    consol.log(req.url);
    next();
})
```

## 中间件应用

+ 路由保护，客户端在访问需要登录的页面时，可以先使用中间件判断用户登录状态，用户如果为登录，则拦截请求响应，禁止用户进入需要登录的页面
+ 网站维护公告，在所有路由的最上面定义接收所有请求的中间件，直接为客户端做出响应，网站正在维护中。
+ 自定义404页面

## 错误处理中间件

在程序执行的过程中，不可避免的会出现一些无法预料的错误，比如文件读取失败，数据库连接失败，错误处理中间件是一个集中处理错误的地方。

```javascript
app.use((err,req,res,next)=>{
    res.status(500).send('服务器端错误')
})
```

## 捕获错误

在node.js中，异步API的错误信息都是通过回调函数获取的，支持Promise对象的异步API发生错误可以通过catch方法捕获。

try catch可以捕获异步函数以及同步代码在执行过程中发生的错误，但是不能捕获其他类型的API发生的错误。

```javascript
app.get("/",async(req,res,next)=>{
    try{
        await User.find({name:"张三"})
    }catch(ex){
        next(ex)
    }
});
```

## 构建模块化路由

```javascript
const express = require('express');
//创建路由对象
const home = express.Router();
//将路由和请求路径进行匹配
app.use('/home',home);
//在home路由下继续创建路由
home.get('/index',()=>{
    // /home/index
    res.send('欢迎来到博客展示页面')；
})
app.use('/home',home)
```

![1581319716174](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1581319716174.png)

### GET参数的获取

Express框架中使用req.query即可获取GET参数，框架内部会将GET参数转换为对象并返回

```javascript
//接收地址栏中问好后面的参数
//例如：http://localhost:3000/?name=zhangsan&age=30
app.get('/',(req,res)=>{
    console.log(req.query); //{"name":"zhangsan","age":"30"}
});
```

## POST参数的获取

Express中接收post请求参数需要借助第三方包 body-parser

```javascript
//引入body-parser模块
const bodyParser =require('body-parser');
//配置body-parser模块
app.use(bodyParser.urlencoded({extended:false}));

//接收请求
app.post('/add',(req,res)=>{
    //接收请求参数
    console.log(req.body)
})
```

extended：false  方法内部使用querystring模块处理请求参数的格式

extended：true 方法内部使用第三方模块qs处理请求参数的格式

## Expres路由参数

```javascript
app.get('/find/:id',(req,res)=>{
    console.log(req.params);//{id:123}
});

```

## 静态资源的处理

通过Express内置的express.static可以方便地托管静态文件，例如img,css,javascript 文件等

```javascript
app.use(express.static('public'));
```

现在，public目录下main的文件就可以访问了。

+ http://localhost:3000/images/kitten.jpg
+ http://localhost:3000/css/style.css
+ http://localhost:3000/js/app.js
+ http://localhost:3000/images/bg.png

## express-art-template 模板引擎

app.locals对象

将变量设置到app.locals对象下面，这个数据在所有的模板中都可以获取到

```javascript
app.locals.users=[{
    nameL:'张三',
    age:20
},{
    name:'李四'，
    age:20
}]
```

