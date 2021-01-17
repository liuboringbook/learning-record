# Node

## 什么是Node.js

js是脚本语言，脚本语言都需要一个解析器才能运行。对于写在HTML页面的JS，浏览器充当了解析器的角色。对于需要独立运行的JS，NodeJS就是解析器。

解析器需要运行引擎才能对JavaScript进行解析，NodeJS采用了v8引擎，Google开源的JavaScript引擎。

所以，Node.js就是一个基于Chrome V8引擎的JavaScript运行环境。

Node.js事件驱动机制+异步IO+高效能V8引擎，也然给让它成为编写高性能web服务一个非常好的选择

## 13个基础核心模块

1. 事件触发器events模块
2. 本地路径path模块
3. 文件操作系统fs模块
4. 全局对象process进程
5. http模块
6. 统一资源定位符url模块
7. 压缩zlib模块
8. 流stream模块
9. 逐行解读readline模块
10. 查询字符串querystring模块
11. module模块
12. 缓冲器Buffer模块
13. 域名服务器dns模块

### 事件触发器events模块

> Node.js使用了一个事件驱动，非阻塞式I/O的模型，使其轻量又高效

大多数Node.js核心API都采用惯用的事件驱动架构，其中某些类型的对象(触发器)会周期性地触发命名事件来调用函数对象(监听器),那么Node.js是如何实现事件驱动的呢？

events模块是Node.js实现事件驱动的核心，在node中大部分的模块的实现都继承了Events类。比如fs的readstream，net的server模块。

events模块只提供了一个对象：`events.EventEmitter`。`EventEmitter`的核心就是事件触发与事件监听器功能的封装，`EventEmitter`本质上是一个观察者模式的实现。

所有能触发事件的对象都是`EventEmitter`类的实例。这些对象有一个`EventEmitter.on()`函数，用于将一个或多个函数绑定到命名事件上。事件的命名通常是驼峰的字符串，但也可以使用任何有效的JavaScript属性键。

`EventEmitter`对象使用`EventEmitter.emit()`触发事件，当`EventEmitter`对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。被调用的监听器返回的任何值都将被忽略并丢弃。

1. 基础例子

注册Application实例，继承`EventEmitter`类，通过继承而来的`EventEmitter.on（）`函数监听事件，`EventEmitter.emit()`触发事件

```javascript
const EventEmitter = require('events')

//注册Application实例，继承`EventEmitter类`
//监听hello事件
class Application extends EventEmitter{}

app.on('hello',data=>{
    console.log(data)
})
app.emit('hello','hello nodeJS')
```

2. 多个事件监听器及this指向

绑定多个事件监听器时，事件监听器按照注册的顺序执行。

当监听器函数被调用时，this关键词会被监听器所绑定的`EventEmitter`实例。也可以使用ES6的箭头函数作为监听器，但this关键词不会指向`EventEmitter`实例

```javascript
const EventEmitter = require('events')
class Person extends EventEmitter{
    constructor(){
        super()
    }
}
const mrNull = new Person()
//监听play事件
myNull.on('play',function(data){
    console.log(this)
    console.log(`play`)
})
//监听play事件
myNull.on('play',data=>{
    console.log(this)//{}
    console.log(`play again`)
})
//触发play事件
myNull.emit('play','hello nodeJS')
```

3. 同步 VS 异步

`EventEmitter`以注册的顺序同步地调用所有监听器

```javascript
const EventEmitter =requrie('events')

class Person extends EventEmitter{
    constructor(){
        super()
    }
}
class mrNull = new Person()
myNull.on('play',function(data){
    console.log(data)
})
mrNull.emit('play','hello nodeJS')

console.log('hello MrNull')

//hello Nodejs
//hello MrNull
```

监听器函数可以使用setImmediate()和process.nextTick()方法切换到异步的操作模式

```javascript
const developer =new Person()

developer.on('dev',function(data){
    setImmediate(()=>{
        console.log(data)
    })
})
developer.on('dev',function(data){
    process.nextTick(()=>{
        console.log(data)
    })
})
developer.emit('dev','hello nodeJs')

console.log('hello developer')

//hello develiper
//hello nodejs
//hello nodejs
```

4. 只调用一次的事件监听器

使用`eventEmitter.once()`可以注册可调用一次的监听器。当时间被触发，监听器会被注销，然后再调用。

```javascript
const EventEmitter = require('events')

class Person extends EventEmitter{
    constructor(){
        super()
    }
}
const mrNull = new Person()
mrNull.once('play',()=>{
    console.log('play !')
})
myNull.emit('play')
myNull.emit('play')

//play! 只输出一次
```

5. 事件触发顺序

在注册事件前，触发该事件，不会被触发

```javascript
const EventEmitter =require('events')

class Person extends EventEmitter{
    constructor(){
        super()
    }
}
class myNull = new Person()

mrNull.emit('play')
mrNull.on('play',()=>{
    console.log('play !')
})
//无任何输出
```

6. 移除事件监听器

```javascript
const EventEmitter =require('events')
class Person extends EventEmitter{
    constructor(){
        super()
    }
}
const mrNull = new Person()
function play(){
    console.log('play !')
}
myNull.on('play',play)
myNull.emit('play')
//play ！

mrNull.removeListener('play',play)
mrNull.emit('play')

//play ! 移除后不再触发
```

### 本地路径path模块

1. 获取路径的目录名

```javascript
const path = require('path')
path.dirname('/path/example/index.js') // /path/example
```

2. 获取路径的扩展名

```javascript
const path =require('path')
path.extname('/path/example/index.js')// .js
```

3. 是否是绝对路径

```javascript
const path =require('path')
path.isAbsolute('/path/example/index.js') //true
path.isAbsolute('.') //false
```

4. 拼接路径片段

```javascript
path.join('/path','example','./index.js') //path/example/index.js
```

5. 将路径或路径片段的序列解析为绝对路径

```javascript
path.resolve('/foo/bar','.baz')
//返回：'/foo/bar/baz'
path.resolve('/foo/bar','/tmp/file/')
//返回：'/tmp/file'
path.resolve('wwwroot','static_files/png/','../gif/image.gif')

//如果当前工作目录是/home/myself/node
//则返回'/home/myself/node/wwwroot/static_files/gif/image.gif'
```

6. 规范化路径

```javascript
path.normalize('/path///example/index.js') // /path/example/index.js
```

7. 解析路径

```javascript
path.parse('/path/example/index.js')
/*
{
  root:'/'.
  dir:"/path/example",
  base:'index.js',
  ext:'.js',
  name:'index'
}
*/
```

8. 序列化路径

```javas
path.format({
  root:'/',
  dir:'/path/example',
  base:'index.js',
  ext:'.js',
  name:'index'
}) // /path/example/index.js

```

9. 获取from到to的相对路径

```javascript
path.relative('/path/example/index.js','/path') //../..
```

### 文件操作系统fs模块

>在一些场景下，我们需要对文件进行增删改查等操作，Nodejs提供了fs模块，让我们对文件进行操作

1. 读取文件

```javascript
const fs = require('fs')

//异步读取
fs.readFile('./index.txt','utf-8',(err,data)=>{
    console.log(data) //hello Node.js
})
//同步读取
const data =fs.readFileSync('./index.txt','utf8')
console.log(data) //hello Node.js

//创建读取流
const stream =fs.createReadStream('./index.txt','utf-8')
//这里可以看到fs.createReadStream用到了我们前面介绍的events eventEmitter.on()方法来监听事件
stream.on('data',data=>{
    console.log(data)// Hello Node.js
})
```

2. 写入/修改文件

写入文件时，如果文件不存在，则会创建并写入，如果文件存在，会覆盖文件内容

```javascript
const fs = requirea('fs')
//异步写入
fs.writeFile('./write.txt','Hello Nodejs','utf-8',err=>{
    if(err) throw err
})
//同步写入
fs.writeFileSync('./writeSync.txt','Hello Node.js')

//文件流写入
const ws = fs.createWriteStream('./writeStream.txt','utf8')
ws.write('Hello Nodejs')
ws.end()
```

3. 删除文件/文件夹

+ 删除文件

```javascript
//异步删除文件
fs.unlink('./delete.txt'err=>{
          if(err)throw err
 })
 //同步删除文件
 fs.unlinkSync('./deleteSync.txt')
```

+ 删除文件夹

```javascript
//异步删除文件夹
fs.rmdir('./rmdir',err=>{
    if(err)throw err
})
//同步删除文件夹
fs.rmdirSync('./rmdirsync')
```

4. 创建文件夹

```javascript
//异步创建文件夹
fs.mkkdir('./mkdir',err=>{
    if(err) throw err
})
//不同创建文件夹
fs.mkdirSync('./mkdirSync')
```

5. 重命名文件/文件夹

```javascript
const fs = require('fs')

//异步重命名文件
fs.rename('./rename.txt','./rename.txt',err=>{
    if(err) throw err
})
//同步重命名文件夹
fs.renameSync('./renameSync','renameSync-r')
```

6. 复制文件/文件夹

```javascript
const fs = require('fs')

//异步复制文件
fs.copyFile('./copy.txt','copy-c.txt',(err,copyFiles)=>{
    if(err)throw err
})
//同步复制文件夹
fs.copyFileSync('./null','null-c')
```

7. 文件夹状态-文件/文件夹

```javascript
const fs = require('fs')
//异步获取文件状态
fs.stat('./dir',(err,stats)=>{
    if(err) throw err
    //是否是文件类型
    console.log(stats.isFile()) //false
    //是否是文件夹类型
    console.log（stats.isDirectory()）//true
})

//同步获取文件状态
const stats =fs.statSync('./stats.txt')

//是否是文件类型
console.log(stats.isFile())//true
//是否是文件夹类型
console.log(stats.isDirectory())//false
```

