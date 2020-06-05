# koa

## 1，koa路由

路由是由URI和一个特定的HTTP方法组成的，涉及到应用如何响应客户端对某个网站节点的访问

通俗的讲：路由就是根据不同的URL地址，加载不同的页面实现不同的功能

在koa中我们需要安装对应的koa-router路由模块来实现

```javascript
npm install --save koa-router
```

使用koa-router

```javascript
const koa =require('koa');
const router =require('koa-router')(); // 注意：引入方式
const app = new koa()
router.get('/',function(ctx,next){
    ctx.body ="hello koa"
})
router.get('/news',function(ctx,next){
    ctx.body ='新闻page'
})
app.use(router.routes()); //作用:启动路由
app.use(router.allowedMethods())//这是官方文档推荐的用法，我们可以看到router.allowMethods()用在了路由匹配router.routes()之后，所以在当所有路由中间件最后调用，此时ctx.status设置response响应头
app.listen(3000,()=>{
    console.log('staring at port 3000')
})
```

在koa2 中GET传值通过request接收，但是接收的方法有两种：query和querystring

query：返回的是格式化好的参数对象

querystring：返回的是请求字符串

同时也可以通过 ctx里面的request获取get传值

ctx.request.url

ctx.request.query

ctx.request.querystring

### 动态路由

```javascript
router.get('/news/:aid',async(ctx)=>{
    //获取动态路由的传值
    console.log(ctx.params) //{aid:'456'}
    ctx.body ="新闻详情"
})
```

## 2，中间件

通俗的讲：中间件就是匹配路由之前或者匹配路由完成做的一系列的操作，我们就可以把它叫做中间件

中间件的功能包括：

执行任何代码

修改请求和响应对象

终结请求-响应循环

调用堆栈中的下一个中间件

如果我们的`get`，`post`回调函数中，没有next参数，那么就匹配上第一个路由，就不会往下匹配了。如果想往下匹配的话，那么需要写`next()`

`next()`当前路由匹配完成以后继续向下匹配

![1589939834492](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1589939834492.png)

```javascript
//中间件的执行顺序
app.use(async(ctx,next)=>{
    console.log('1,这是第一个中间件01')
    await next()
    console.log('5，匹配路由完成以后又会返回执行中间件')
})
app.use(async(ctx,next)=>{
    console.log('2,这是第一个中间件01')
    await next()
    console.log('4，匹配路由完成以后又会返回执行中间件')
})
router.get('/news',async(ctx)=>{
    console.log('3,匹配到了new这个路由');
    ctx.body = '这是一个新闻'
})
//1,这是第一个中间件01
//2,这是第一个中间件01
//3,匹配到了new这个路由
//4，匹配路由完成以后又会返回执行中间件
//5，匹配路由完成以后又会返回执行中间件
```



### 应用级中间件

```javascript
//匹配路由之前打印日期
app.use(async(ctx,next)=>{
    console.log(new Date());
    await next() //当前路由匹配完成以后继续向下匹配
})
```

### 路由级中间件

```javascript
//匹配到路由以后继续向下匹配路由
router.get('/',async(ctx,next)=>{
    console.log(1)
    next()
})
router.get('/',function(ctx)=>{
   ctx.body = "Hello koa"        
})
```

### 错误处理中间件

```javas
app.use(async(ctx,next)=>{
  next();
  if(ctx.status ==404){
     ctx.status =404;
     ctx.body = '这是一个404页面'
  }
})
```

### 第三方中间件



## 3，ejs模板引擎

1. 安装koa-views和ejs

```javascript
//安装koa-views
npm install koa-views --save
//安装ejs
npm install ejs --save
```

2. 引入koa-views配置中间件

```javascript
const views =require('koa-views');
app.use(view('views',{map:{html:'ejs'}})); //模板的后缀名必须是ejs
//或者
app.use(view(__dirname,{extension:'ejs'}))//模板的后缀名必须是html
```

3. koa中使用ejs

```javascript
router.get('/add',async(ctx)=>{
    let title ='hello koa2';
    await.ctx.render('index',{title})
})
```

### ejs语法

普通渲染

```html
<div>
    <%=title%>
</div>
```

循环数据

```html
<ul>
    <%for(vari=0;i<arr.length;i++){%>
    <li><%=arr[i]%></li>
    <%}%>    
</ul>	
```

判断数据

```javascript
<%if(num>24){%>
  大于24
<%}else{%>             
  小于24
<%}%>        
```

渲染html

```html
<%-content%>
```

注意： 我们需要在每一个路由的render里面都要渲染一个公共的数据

公共的数据放在这个里面，这样的话模板的任何地方都可以使用

```javascript
ctx.state ={ //放在中间件
    session: this.session,
    title:'app'
}
```

## POST提交数据

### 原生Nodejs获取提交数据

```javascript
new Promise(function(resolve,reject){
    try{
        let str ='';
        ctx.req.on('data',function(chunk){
            str+=chunk;
        })
        ctx.req.on('end',function(chunk){
            resolve(str)
        })
    }catch(err){
        reject(err)
    }
})
```

### koa中koa-bodyparser中间件的使用

1. 安装koa-bodyparser

```javascript
npm install koa-bodyparser --save
```

2. 安装 引入配置中间件

```javascript
var koa =require('koa');
var bodyParser = require('koa-bodyparser');
var app =new koa();
```

3. 使用

```javascript
app.use(bodyparser());
app.use(async ctx=>{
    ctx.body =ctx.request.body;
})
```

## 4，koa-static 静态资源

1. 安装

```javascript
npm install koa-static --save
```

2. 引入

```javascript
const static=require('koa-static')

```

3. 配置中间件

```javascript
//静态文件的路径可以指定多个
app.use(static(
  path.join(__dirname,'public')
))
```

## 5，art-template模板引擎

art-template是一个简约，超快的模板引擎

1. 安装

```javascript
npm install art-template --save
npm install koa-art-template --save
```

2. 引入

```javascript
const render =require('koa-art-template');
```

3. 配置

```javascript
render(app,{
    root:path.join(__dirname,'view'),
    extname:'.art',
    debug:process.ebv.NODE_ENV !=='production'
})
```

4. 使用

```javascript
app.use(async function(ctx){
    await ctx.render('user')
})
```

## 6，cookie

cookie是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据

1. koa中设置cookie值

```javascript
ctx.cookie.set(name,value,[options])
```

通过options设置cookie name的value

![1590052885224](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1590052885224.png)

2. koa中获取cookie的值

```javascript
ctx.cookie.get('name')
```

## 7, session

 Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上

工作流程：

当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key，value的键值对，然后将key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带key(cookie)，找到对应的session(value).客户的信息都保存在session中

1. 安装koa-session

```javascript
npm install kao-session --save
```

2. 引入koa-session

```javascript
const session = require('koa-session');
```

3. 设置官方文档提供的中间件

```javascript
app.key =['some secret hurr'];//保存的签名，默认即可
const CONFIG ={
    key:'koa:sess', //cookie key（default is koa:sess）
    maxAge:86400000, //cookie的过期时间 maxAge is ms(defalut is 1 days)
    overwrite: true, //是否可以overwrite (默认是default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not(default true)
    signed：true，// 签名默认true
    rolling:false, //在每次请求是强行设置cookie，这将重置cookie过期时间(默认:false),
    renew:false  //当session快要过期的时候重置过期时间(默认为false)
}
```

# mongodb

## nodejs操作mongodb数据库

1. 安装mongodb

```javascript
npm install mongodb --save
```

2. 引入mongodb下面的MongodbClient

```javascript
var mongodbClient =require('mongodb').MongoClient
```

3. 定义数据连接的地址，以及配置数据库 koa数据库名称

```javascript
var url='mongodb://localhost:27017/'
var dbName = 'koa'
```

4. node连接数据库

```javascript
MongoClient.connect(url,function(err,client){
    const db = client.db(dbName); //数据库db对象
})
```

5. 操作数据库

```javascript
db.userinsert
Mongodb.connect(url,function(){
    db.collection('user').insertOne({"name":"张三"},function(err,result){
        db.close()//关闭连接
    })
})
```



