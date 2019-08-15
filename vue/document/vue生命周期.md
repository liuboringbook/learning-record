# 生命周期

 生命周期就是vue实例在某个时间点自动执行的函数


## 生命周期创建阶段

### beforeCreate 
表示刚初始化了一个vue空的实例对象，这时候，这个对象身上只是默认的一些生命周期函数和默认的事件，其他东西都未创建

 注意：此时在beforeCreate生命周期执行的时候，data和methods都还没有被初始化

```
    var vm = new Vue({
        el:'root',
        data:{
            msg:'hello'
        },
        methods:{
            show(){
                console.log('执行了')
            }
        },
        beforeCreate(){
          console.log(this.msg);// undefined
          this.show(); //报错 
        }
    })
```

### created 
在created中data和methods都已经被初始化好了，如果要调用methods中的方法，或者操作data中的数据，最早，只能在created中操作
```
    var vm = new Vue({
        el:'root',
        data:{
            msg:'hello'
        },
        methods:{
            show(){
                console.log('执行了')
            }
        },
        beforeCreate(){
          console.log(this.msg);// hello
          this.show(); //执行了
        }
    })
```

### beforeMount 
表示模板已经在内存中编译完成，但是尚未把模板挂载到页面上

```
  <div id="app">
   <h3 id="h3">{{msg}}</h3> 
 </div>
  <script>
    var vm =new Vue({
     el：'#root',
     data:{
        msg:'hello'
     },
     beforeMount(){
        console.log(document.getElementById('h3').innerHTML); //{{msg}} 
     }
    })
  </script>
```

### mounted 
内存中编译号的模板，真实的替换到浏览器的页面中去，用户可以看到渲染好的页面

```
  <div id="app">
   <h3 id="h3">{{msg}}</h3> 
 </div>
  <script>
    var vm =new Vue({
     el：'#root',
     data:{
        msg:'hello'
     },
     mounted(){
        console.log(document.getElementById('h3').innerHTML); //{{msg}} 
     }
    })
  </script>
```

## 生命周期运行阶段

### beforeUpdate
在data数据改变后执行，会根据data数据的改变，有选择性触发0次或者多次
这个时候数据更新了，但是页面还没有更新

```
  <div id="app">
   <h3 id="h3">{{msg}}</h3> 
 </div>
  <script>
    var vm =new Vue({
     el：'#root',
     data:{
        msg:'hello'
     },
     beforeUpdate(){
        //修改DOM树中的msg，改为'bye'
        console.log(document.getElementById('h3').innerHTML)//hello
        console.log(this.msg)//bye
     } 
    })
  </script>
```

### updated
这一步执行的是，先根据data中最新的数据，在内存中重新渲染一份最新的内存DOM时，当最新的内存DOM树，重新渲染到真实的页面中去，这时候，就完成了数据从data(Model层)->veiw(视图层)的更新

```
  <div id="app">
   <h3 id="h3">{{msg}}</h3> 
 </div>
  <script>
    var vm =new Vue({
     el：'#root',
     data:{
        msg:'hello'
     },
     updated(){
        //修改DOM树中的msg，改为'bye'
        console.log(document.getElementById('h3').innerHTML)//bye
        console.log(this.msg)//bye
     } 
    })
  </script>
```

## 生命周期销毁阶段

### beforeDestroy
当执行beforeDestroy钩子函数的时候，Vue实例就已经从运行阶段，进入到了销毁阶段
当执行beforeDestroy的时候，实例身上所有data和所有的methods以及过滤器，指令，都处于可用状态，此时还没有真正执行销毁的过程

### destroy
当执行函数对的时候，组件已经被完全销毁，此时，组件中所有数据，方法，指令过滤器都不可用

<img src="../resource/lifecycle.png" >



