/*
* 面试题：nodejs的事件轮询机制
*
* */
setTimeout(function(){
    console.log('setTimeout')
},0)  //异步

setImmediate(function(){
    console.log('setImmediate')
})//同步

process.nextTick(function(){
    console.log('process.nextTick()');
})//nodejs特有函数



/*
* 执行顺序
* process.nextTick()
* setTimeout()
* setImmediate()
* */

/*
* nodejs轮询机制借助于libuv库执行
*
* 分为六个阶段
* 1. timer 定时器阶段
*   计时和执行到点的定时器回调函数
* 2.pending callbacks
*   某些系统操作(例如TCP错误类型)的回调函数
* 3.idle. prepare
*   准备工作
* 4. poll 轮询阶段(轮询队列）
*   如果轮询队列不为空，依次同步取出轮询队列中第一个回调函数执行，直到轮询队列为空或达到系统最大的限制
*   如果轮询队列为空
*   如果设置过setImmediate函数
*   直接进入下个check阶段
*   如果之前没有设置过setImmediate函数
*   在当前poll阶段等待
*   直到轮询队列添加回调函数，就去第一个情况执行
*   如果定时器到点了，也会去下一个阶段
* 5.check查阶段
*   执行setImmediate设置的回调函数
* 6.close callbacks关闭阶段
*   执行close事件回调函数
*
* process.nextTick能在任意阶段优先执行
* */
