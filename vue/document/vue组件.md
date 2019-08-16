# Vue组件
  组件的出现，就是为了拆分vue实例的代码。能够让我们以不同对的组件来划分不同的功能模块，将来我们需要什么样的功能，就可以调用对应的组件即可

## 模块化和组件化的区别

  模块化：是从代码逻辑的角度进行划分的，方面代码分层开发，保证每个功能模块的职能单一

  组件化：是从UI界面角度划分的，前端的组件化，方便UI组件的复用

## 创建组件的方式

  - 使用Vue.extend来创建全局的Vue组件，使用component('组件名称',创建歘来的组件模板对象)
```

    var com1 = Vue.extend({
       template:'<h3>这是使用vue.extend创建的组件</h3>'
   })
   Vue.component('myCom1',com1)

```
  - 直接使用Vue.component()
```
   Vue.component('myCom2',{
     template:'<h3>这是使用vue.component创建的组件</h3>'
    })
```
  - 使用template模板
```
   Vue.component('myCom2',{
     template:'#temp1'
    })
``` 
  - 私有组件，在vue实例中有个components方法，可以定义实例的私有化
```
  var vm = new Vue({
    el:'#root',
    components:{
      myCom4:{
        template:'<h3>这是一个私有的template模板</h3>'
      }
    }
  })
```  

## 组件中的data

- 组件可以有自己的data数据
- 组件的data和实例的data不一样，实例中的data可以是一个对象，但是组件中的data必须是一个方法
- 组件中的data除了必须为一个方法之外，这个方法内部，必须返回一个对象才行
- 组件中的data数据，使用方法和实例中的data使用方法完全一致

## 组件中的传值

### 父组件传值给子组件

  父组件传值给子组件是通过数据绑定的形式传递的，子组件通过props接收数据

```
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
  <div id="app">
      <com1 :data="msg"></com1>
  </div>
  <script>
      var vm = new Vue({
        el:'#app',
        data:{
            msg:'123'
        },
        components: {
            com1:{
                props:['data'],//把父组件传递过来的data属性，现在props组件中定义一下
                template；'<h3>{{data}}</h3>'
            }
        }
      })
  </script>
</body>
</html>
```

### 子组件传值给父组件

父组件可以随意的向子组件传递参数，但是子组件不能修改父组件传递过来的参数
这个vue中的单向数据流

子组件向父组件传递参数，通过自定义事件触发

通过$emit传递方法 
```
 <!DOCTYPE html>
 <html>
<head>
    <title></title>
</head>
<body>
<div id="app">
    <counter :count="1" @change="handleChange" ref="one"></counter>
    <counter :count="0" @change="handleChange" ref="two"></counter>
    <div>{{total}}</div>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            total:1
        },
        methods:{
          handleChange(){
              this.total = this.$refs.one.number + this.$refs.two.number
          }
        },
        components:{
            counter:{
                props:['count'],
                data:function(){
                  return{
                      number:this.count
                  }
                },
                template:'<div @click="handleClick">{{number}}</div>',
                methods:{
                    handleClick(){
                         this.number++;
                         this.$emit('change')
                    }
                }
            }
        }
    })
</script>
</body>
</html>
```

### 非父子组件间传值

- vueX
- 总线机制(Bus/发布订阅模式/g观察者模式)

```
   <!DOCTYPE html>
   <html>
   <head>
     <title></title>
   </head>
   <body>
      <div id="app">
        <child content="Dell"></child>
        <child content="Lee"></child> 
      </div>
      <script>
        var  vm = new Vue({
          el:'#app',
          data:{
            content:''
          },
          components: {
            'child':{
              data: function(){
                return {
                  selfContent: this.content
                }
              },
              props：['content'],
              template:'<div @click="handleClick"></div>',
              methods: {
                handleClick: function(){
                  this.bus.$emit('change',this.selfContent)
                }
              },
              mounted: function(){
                var _this =this;
                this.bus.$on('chnage',function(msg){
                    _this.selfContent = msg
                })
              }
            }
          }
        })
      </script>
   </body>
   </html>
```

## 使用组件需要注意的情况

- 在组件上使用原生事件

如果希望给父组件绑定原生事件，如果直接绑定，会发现点击的时候，会失效，无法显示，只能在父组件上绑定自定义事件，可以通过绑定子组件，实现原生事件触发

或者直接在父组件中，事件后面加上native修饰符 例如 @click.native

- 在一些需要特定标签的地方，使用组件，可能导致渲染错误，例如在tbody下应该放的是tr但是，如果放入组件，系统不识别，所以导致组件渲染到table外和table同级

解决方法：用tr标签，但是在标签内加入is属性， 例如 is="row" 代表的是引入row组件

```
 <!DOCTYPE html>
 <html>
 <head>
   <title></title>
 </head>
 <body>
    <div id="app">
      <table>
        <tbody>
          <tr is="row"></tr>
          <tr is="row"></tr>
          <tr is="row"></tr>
        </tbody>
      </table>
    </div>
    <script>
      var vm =new Vue({
        el: '#app',
        components:{
          'row':{
            data: function(){
              return{
                content:'this is content'
              }
            },
            template:'<tr><td>{{content}}</td></tr>'
          }
        }
      })
    </script>
 </body>
 </html>
```

- 组件的切换

当在一个地方需要在不同情况渲染不同组件的时候，处理方法是可以用
component占位符，加上is属性的方法，用来指示要展示的组件的名称

```
  <!DOCTYPE html>
  <html>
  <head>
    <title></title>
  </head>
  <body>
      <div id="app">
         <component is="login"></component>
      </div>
      <script>
         Vue.component('login',{
          template:'<h3>登录组件</h3>'
         })
         Vue.component('register',{
          template:'<h3>注册组件</h3>'
         })
         var vm = new Vue({
           el:'#app'
         })
      </script>
  </body>
  </html>
```

