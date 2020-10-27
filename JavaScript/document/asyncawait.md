# async/await

async是异步的意思，await有等待对的意思，用法：async用来申明function是异步的，而await用于等待一个异步方法执行完成

## async

async的语法很简单，就是在函数开头加一个关键字，实例如下

```javascript
async function f(){
    return 1;
}
```

async关键字的意思很简单，就是函数返回的是一个promise

```javascript
async function f(){
    return 1;
}
f().then((res)=>{
    console.log(res)
})
```

async函数会返回一个promise对象，如果function中返回的是一个值，async直接会用`promise.resolve()`包裹一个返回

## await

```javascript
function getSometing(){
    return "someting"
}
async function testAsync(){
    return Promise.resolve("hello async")
}
async function test(){
    const v1 = await getSometing();
    const v2  =await testAsync();
    console.log(v1,v2)
}
test(); //someting hello async
```

+ 为什么await关键词只能在async函数中庸

await操作符等的是一个返回的结果，那么如果是同步的情况，那就直接返回了。

那如果是异步的情况下，await会阻塞整个流程，直到结果返回之后，才会继续下面的代码

## async/await中错误处理

promise并不是只有一种resolve，还有reject的情况，而await只会等待一个结果，那么发生错误了该怎么处理呢？

+ 用try-catch来做错误捕获

```javascript
async function myFunction(){
    try{
        await Promise.reject('1');
    }catch(err){
        console.log(err)
    }
}
myFunction();
```

+ 用promise的catch来做错误捕获

```javascript
async function myFunction(){
    await Promise.reject('1').catch((err)=>{
        console.log(err)
    })
}
myFunction();
```

## async/await 和promise的区别

promise最大的问题在于业务复杂之后，then内部的逻辑也变得复杂，或者循环的异步嵌套场景等，会写出不那么优美

```javascript
function takeLongTime(n){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(n)
        },n)
    })
}
function step1(n){
    console.log(`step1 with ${n}`)
    return takelongTime(n)
}
function step2(n){
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m+n);
}
function step3(k,m,n){
    console.log(`step3 with ${k},${m}and ${n}`);
    return takeLongTime(k+m+n)
}
```

takeLongTime起到的作用就是延时之后给出延时的数据。

step1代表第一步延时了多久。

step2代表第一步和第二部总共延时了多久。

step3代表第一步、第二步和第三步一共延时了多久。

+ promise 版本

```javascript
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();
```

+ async/await版本

```javascript
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time1, time2);
    const result = await step3(time1, time2, time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}

doIt();
```

在复杂逻辑中，我们就能发现`async/await`确实比then链有优势



