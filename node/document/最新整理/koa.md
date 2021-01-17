# koa 

## koa快速开始

### 安装

+ 因为node.js v7.6x已经完全支持async/await语法，所以保证node的版本在7.6以上

```javascript
//初始化package.json
npm init -y
//安装koa2
npm install koa
```

### 一个hello world

新建一个index.js敲以下代码

```javascript
//index.js
const koa =require('koa')
const app =new koa()

app.use(async(ctx,next)=>{
    ctx.response.body ="你好，我是内地吴彦祖"
})
app.listen(3333,()=>{
    console.log('server is running at http://localhost:3333')
})
```

在命令行敲上

```javas
node index.js
```

就可以看到运行结果啦

![15371507388772](https://user-gold-cdn.xitu.io/2018/10/18/16685e0d2b333794?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 几个核心概念

中间件好基友ctx和next

+ ctx

ctx作为上下文使用，koa将node的request，response对象封装进一个单独对象。即ctx.request,ctx.response。koa内部又对一些常用的属性或者方法做了代理操作，使得我们可以直接通过ctx获取。比如，ctx.request.url可以写成ctx.url

+ next

next参数的作用是将处理的控制权转交给下一个中间件

![15371520197565](https://user-gold-cdn.xitu.io/2018/10/18/16685e0cf1aa54cc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

经典的洋葱概念能很好的解释next的执行，请求从最外层进去，又从最里层出来。我们可以看一个例子

```javascript
const koa = require('koa')
const app = new koa()

app.use(async(ctx,next)=>{
    let startTime =new Date().getTime()
    await next()
    let endTime = new Date().getTime()
    console.log(`此次的响应时间为:$(endTime-startTime)ms`)
})
app.use(async(ctx,next)=>{
    console.log(`111，然后doSomething`)
    await next()
    console.log(`111 end`)
})
app.use(async(ctx,next)=>{
    console.log(`222，然后doSomething`)
    await next()
    console.log(`222 end`)
})
app.use(async(ctx,next)=>{
    console.log(`333，然后doSomething`)
    await next()
    console.log(`333 end`)
})
app.listen(3333,()=>{
    console.log('server is running at http://localhost:3333')
})
```

看一下运行结果:

![15371528106452](https://user-gold-cdn.xitu.io/2018/10/18/16685e0d64c8c4c0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果将`222`函数的next()去掉的话，会发生什么呢?

![15371529369320](https://user-gold-cdn.xitu.io/2018/10/18/16685e0bb63d93c0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看到后面的`333`中间件直接不执行了。所以中间件的顺序对next的执行有很大的影响

## 路由koa-router

我们常用koa-router来处理URL

安装

```javascript
npm i koa-router --save
```

看一个例子

```javascript
const Koa =require('koa')
const app = new Koa()
const Router = require('koa-router')

const router =new Router()

router.get('/',async(ctx,next)=>{
    ctx.body = '你好，我这里是index页'
})
router.get('/user',async(ctx,next)=>{
    ctx.body = '你好,我这里是error页'
})
router.get('/error',async(ctx,next)=>{
    ctx.body = '你好，我这里是error页'
})
app.use(router,routes())

app.listen(3333,()=>{
    console.log('server is running at http://localhost:3333')
})
```

![15371540305250](https://user-gold-cdn.xitu.io/2018/10/18/16685e0c51054265?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![15371540448439](https://user-gold-cdn.xitu.io/2018/10/18/16685e0bb5f5af18?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![15371540585094](https://user-gold-cdn.xitu.io/2018/10/18/16685e0c80f10cc2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

koa-router也支持嵌套写法，通过一个总路由转载所有子路由，也非常的方便，看一个例子

```
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

//子路由1
let onRouter = new Router()

onRouter.get('/',async(ctx,next)=>{
    ctx.body = '你好，我这里是oneRouter页'
})

//子路由2
let twoRouter =new Router()
twoRouter.get('/',async(ctx,next)=>{
    ctx.body ='你好，我这里是twoRouter页'
}).get('/home',async(ctx,next)=>{
    ctx.body = '你好，我这里是home页'
})

//装载所有子路由
let indexRouter = new Router()

indexRouter.use('/one',oneRouter.routes(),oneRouter.allowedMethods())
indexRouter.use('/two',twoRouter.routes(),twoRouter.allowedMethods())

app.use(indexRouter,routes())
.use(indexRouter.allowMethods())

app.listen(3333,()=>{
   console.log('server is running at http://localhost:3333')
})
```

![15371560100616](https://user-gold-cdn.xitu.io/2018/10/18/16685e0ce06dbd54?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![15371560354693](https://user-gold-cdn.xitu.io/2018/10/18/16685e0cb1bb53e3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![15371560521654](https://user-gold-cdn.xitu.io/2018/10/18/16685e163044cfb0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 获取请求数据

koa-router提供了常见对的`.get`,`.post`，`.del`接口来处理各种需求。实际开发中我们用的比较多的是get和post，我们来看看get例子：

```javascript
const Koa =require('koa')
const app =new Koa()
const Router = require('koa-router')
const router = new Router

router.get('/data',async(ctx,next)=>{
    let url  =ctx.url
    
    //从ctx的request中拿到我们想要的数据
    let data = ctx.request.query
    let dataQueryString = ctx.request.querystring
    ctx.body ={
        url,
        data,
        dataQueryString
    }
  })
app.use(router.routes())

app.listen(3333，()=>{
    console.log('server is running at http://localhost:3333')
})
```

在浏览器里输入http://localhost:3333/data?user=wuyanzu&id=123456,可以看到运行结果

![15371636443212](https://user-gold-cdn.xitu.io/2018/10/18/16685e0c32cca535?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看到区别，`.query`返回的结果是对象，而`.querystring`返回的是字符串，这个很好理解。

如果想遵从RESTful规范比如请求是以`/use:/:id`的方式发出的话，我们可以用西面的例子来获取想要的数据

添加代码

```javascript
router.get('/data/:id',async(ctx,next)=>{
    //也从ctx中拿到我们想要的数据，不过使用的是params对象
    let data  = ctx.params
    ctx.body = body
})
```

浏览器运行http://localhost:3333/data/4396看到结果

![15371643392037](https://user-gold-cdn.xitu.io/2018/10/18/16685e0bb5d29f7a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

接下来我们看看post的例子

我们常用的请求post，数据是放在body当中的。这个时候就推荐一个非常常用且好用的中间件`koa-bodyparser`

首先安装

```javascript
npm i koa-bodyparser --save
```

然后我们在刚才的代码里添加

```javascript
router.get('/post',async(ctx,next)=>{
    //模拟一段提交页面
      let html = `    
    <form action="/post/result" method="post">
        <p>你长的最像哪位明星</p>
        <input name="name" type="text" placeholder="请输入名字："/> 
        <br/>
        <p>输入一段你知道的车牌号</p>
        <input name="num" type="text" placeholder="请输入车牌号："/>
        <br/> 
        <button>确定不改了哦</button>
     </form> `
  ctx.body = html
})
router.post('/post/result',async(ctx,next)=>{
  //我们可以从ctx的request.body拿到提交上来的数据
  let {name,num} = ctx.request.body
  if(name&&num){
    ctx.body =`hello, 你最像的明星是:${name},ch你知道的车牌号:${num}`
  }else{
    ctx.body ='啊，你填写的信息有误'
  }
})
```

看一下运行结果

![2018-09-17 14 26 24](https://user-gold-cdn.xitu.io/2018/10/18/16685e0d8b012421?imageslim)

## cache

koa操作cookie是非常方便的，也是从上下文ctx中获取。

+ `ctx.cookies.get(name,[options])`读取上下文请求中的cookie
+ `ctx.cookies.set(name,value,[options])`在上下文中写入cookie

在我们刚才的post请求的代码中加入：

```javascript
router.post('/post/result', async (ctx, next) => {
  // 我们可以从ctx的request.body拿到提交上来的数据
  let {name, num} = ctx.request.body

  if (name && num) {
    ctx.body = `hello，你最像的明星是:${name},ch你知道的车牌号是:${num}`
    ctx.cookies.set(
      'xunleiCode',num,
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/post/result',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2018-09-17'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
  } else {
    ctx.body = '啊哦~你填写的信息有误'
  }

})
```

看一下运行结果

![15371681313023](https://user-gold-cdn.xitu.io/2018/10/18/16685e0dc2421a70?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

koa操作session的话，需要用到koa-session

```javascript

const session = require('koa-session')

app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess',   //cookie key (default is koa:sess)
  maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true,  //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true,   //签名默认true
  rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
```



> 引用自掘金 https://juejin.cn/post/6844903695637839885