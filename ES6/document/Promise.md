#  Promise对象

## Promise的含义
Promsie是异步编程的一种解决方案，比回调函数和事件更加合理更强大。所谓的Promise，简单的说就是一个容器，里面保存着某个未来才会结束的事件(通常是异步操作)。

## Promise的特点
 - 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：`pending`(进行中)，`fullfiled`（已成功）和`rejeccted`（已失败）。只有异步操作的结果，可以决定当前状态，任何其他操作都无法改变这个状态。
 - 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfiled`和 `pending`变为`rejected`只有这两种情况发生，状态就不会再变，会一直保存这种状态


## 用法
```
   //单个异步操作的时候
   //Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve(将Promise状态从未完成变为成功时执行的操作)和reject(将Promise状态从未完成变为失败的时候执行的操作)
   {
    let ajax =function(){
        console.log('执行');
        return new Promise(function(resolve,reject){
           setTimeout(function(){
               resolve()
            },1000)   
        })
    };
    //可以用then方法分别指定resolved状态和reject状态的回调函数，前面为resolved回调函数，后面为reject回调函数
    ajax().then(function(){
      console.log('Promise','timeout1')
    })
   }
```   
处理多个异步操作

```
  {
   let ajax= function(){
            console.log('执行2');
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    console.log('timeout3');
                    resolve()
                },1000)
            })
        };
        ajax().then(function(){
           return new Promise(function(resolve,reject){
               setTimeout(function(){
                console.log('timeout4')
                resolve()
                },2000)  
            }).then(function(){
              console.log('timeout5')   
            }) 
        })
        //先弹出执行2，1s后弹出timeout3，2s后弹出timeout3，timeout4
  }
```

当函数运行时，发生错误，如何捕获
可以通过catch捕获error
```
        let ajax =function(num){
            console.log('执行4');
            return new Promise(function(resolve,reject){
                if(num>5){
                    resolve()
                }else{
                    throw new Error('出错了')
                }
            })
        };
        ajax(6).then(function(){
           console.log('log',6)
        }).catch(function(err){
            console.log('catch',err);
        })
```

## promise下的其他方法
- all 所有的`pending`状态都改变的时候执行
{
        //所有图片加载完在添加到页面
        function loadImg(src){
            return new Promise((resolve,reject)=>{
                let img =document.createElement('img');
                img.src=src;
                img.onload =function(){
                    resolve(img)
                }
                img.onerror = function(){
                    reject(err);
                }
            })
        }
        function showImgs(imgs){
            imgs.forEach(function(img){
                document.body.appendChild(img);
            })
        }
        Promise.all([
            loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
            loadImg('http://i4.buimg.com/56751/2b07ee25b08930ba.png'),
            loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
        ]).then(showImgs)

    }

- race 所有的`pending`状态中有一个改变的时候执行
 ```
    {
        //有一个图片加载完就添加到页面
        function loadImg(src){
            return new Promise((resolve,reject)=>{
                let img =document.createElement('img');
                img.src=src;
                img.onload =function(){
                    resolve(img)
                }
                img.onerror = function(){
                    reject(err);
                }
            })
        }
        function showImgs(img){
           let p = document.createElement('p');
           p.appendChild(img);
           document.body.appendChild(p)
        }
        Promise.race([
            loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
            loadImg('http://i4.buimg.com/56751/2b07ee25b08930ba.png'),
            loadImg('http://i2.muimg.com/567751/5eb8190d6b2a1c9c.png')
        ]).then(showImgs)
    }
 ```  