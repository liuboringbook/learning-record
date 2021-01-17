# JavaScript(JS的节流，防抖)

## 前言

在进行窗口的resize，scroll，输入框内容校验等操作时，如果事件处理函数调用的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时我们可以采用debounce(防抖)和throttle(节流)的方式来减少调用频率，同时又不影响实际效果。

他们都是有一个时间规定，在这个规定下限制某个方法的执行时机。

他们有个共同点，就是指定时间内，只能执行一次。

## 防抖

```javascript
在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
```

举个例子

当鼠标移动到一个div上时，div的内容一直在更新，如果不用防抖处理，效果如下图

```javascript
var mydiv =document.getElementById('mydiv');
let count = 0;
function myEvent(){
    mydiv.innerText = count++;
}
mydiv.addEventListener('mouseover',function(event){
    myEvent();
})
```

![img](https://user-gold-cdn.xitu.io/2020/3/3/1709ebe109bc00dd?imageslim)

使用了防抖后的效果

```javascript
function debounce(fn，delay){
    let timeout =null;
    return function(){
        if(timeout){
            clearTimeout(timeout)
        }
        timeout = setTimeout(()=>{
            fn.apply(this,arguments)
        },delay)
    }
}
var mydiv = document.getElementById('mydiv')
let count =0;
function myEvent(){
    mydiv.innerText =count++;
}
mydiv.addEventListener('mouseover',debounce(myEvent,2000))
```

![img](https://user-gold-cdn.xitu.io/2020/3/3/1709ec48bfa90688?imageslim)

> 代码实现原理：函数防抖的关键在于，在一个动作发生一定时间内，财智星指定事件；如果n秒内高频事件再次被触发，则重新计算时间；

在document中鼠标移动的时候，会在mouseover最后触发的2s后执行回调函数myEvent；如果我们一直在浏览器中移动鼠标(比如10s)，会发现会在10+2s后才会执行myEvent函数(因为clearTimeout(timeout)),这个就是函数防抖

## 节流

规定在一定单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。稀释时间执行频率

定时器的实现方式

```javascript
function throttle(fn,delay){
    let hasRun =false;
    return function(){
        if(hasRun){
            return;
        }
        hasRun = true;
        setTimeout(()=>{
            hasRun =false;
            fn.apply(this,arguments)
        },delay)
    }
}
var mydiv = document.getElementById('mydiv');
let count =0;
function myEvent(){
   mydiv.innerText = count++;
}
mydiv.addEventListener('mouseover',throttle(myEvent,2000))
```

效果图

![img](https://user-gold-cdn.xitu.io/2020/3/3/1709fc48220bf21d?imageslim)

代码实现原理：每隔n秒执行一次回调函数

## 应用场景

防抖：

1. search 搜索时，用户在不断输入值时，用防抖来节约请求资源
2. window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
3. 放置重复提交；

节流：

1. 鼠标不断的点击触发，mousedown(单位时间内只触发一次)
2. 监听滚动事件，比如是否滑到到底部自动加载更多，用throttle来判断



