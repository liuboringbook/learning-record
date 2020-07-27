# NodeJS入门

## 同步和异步







## 1.http模块



## 2.断言---assert

```JavaScript
const assert = require('assert');

//assert(条件，'一段话'); 

function sum(a,b){
    assert(arguments.length===2,'必须传2个参数');
    assert(typeof a ==='number','第一个参数必须为数字');
    assert(typeof b ==='number','第二个参数必须为数字');
    
    return a+b;
}
console.log(sum(12,5));//17
```

## 3.Buffer---二进制

## 4.Files---文件

```javascript
const fs = require('fs');

fs.readFile('1.txt',(err,data)=>{
    console.log(err);
    console.log(data);
})
fs.writeFile('1.txt','wqeqe',err=>{
    if(err){
        console.log(err)
    }else{
        console.log('成功')
    }
})

```

## 5.C++ Addons

使用c++语言的高性能

## 6. 多进程

Child Processes

cluster

process

## 7. Crypto加密

## 8.OS

## 9.Path

```javascript
const path = require('path');
let str = '/var/local/www/aaa/1.png';

console.log(path.dirname(str));///var/local/www/aaa
console.log(path.basename(str));//1.png
console.log(path.extname(str));//.png
```

## 10.events事件队列

```javascript
const Event = require('events').EventEmitter;

let ev = new Event();
//1.监听(接收)
ev.on('msg',function(){
    console.log('收到了msg事件：',a,b,c)
})
//2.派发(发送)
ev.emit('msg',12,5,88)//解除耦合
```

## 11.Query Strings(解析地址查询)

```javascript
const queryString = require('querystring');
let obj =queryString.parse('https://www.baidu.com/s?wd=aa&rsv_spt=1&rsv_iqid=0xcd127ffd00091741&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=3&rsv_sug1=1&rsv_sug7=100&rsv_sug2=0&inputT=809&rsv_sug4=911')
console.log(obj);//解析？后面的
```

## 12.网络

TCP---稳定 net

UDP---快  UDP/Datagram



## 13.域名解析

DNS

Domain

```javascript
const dns = require('dns');

dns.resolve('baidu/com',(err,res)=>{
    if(err){
        console.log('解析失败')
    }else{
        console.log(res)
    }
})
```

## 14. 流操作

连续数据都是流-----视频流，网络流，文件流，语音流



## 15.TLS/SSL

加密，安全



## 16.ZLIB--gz

压缩





数据交互

1. node接收GET数据，POST数据，文件数据
2. 数据库
3. webSocket
4. 。。。。

​                                                                                                                                                                            