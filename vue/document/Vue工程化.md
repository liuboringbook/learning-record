# Vue工程化

## vue-cli创建

### 快速原型开发

可以使用`vue serve`和`vue build`命令对单个的`*.vue`文件进行快速原型开发

如果需要快速展示一个页面给客户或者领导，不希望进行大规模开发可以使用

安装`@vue/cli-service-global`扩展

```javascript
npm install -g @vue/cli-service-global
```

准备一个内容原型

vue server

启动一个服务并运行原型

```javascript
vue server hello.vue
```

### 创建项目

vue create

```javascript
vue create my-vue-test
```

### vue-ui

图形化项目管理(vue-cli 在3.0以上)

```javascript
vue ui
```

## vue-cli 插件

在现有的项目中安装插件

如果你想在一个已经被创建好的项目中安装一个插件，可以使用`vue add`命令

```javascript
vue add router
```

## 开发

### 处理资源路径

当你在JavaScript，css或`*.vue`文件中使用相对路径(必须以`.`开头)引入一个静态资源时，该资源将被webpack处理

#### 转换规则

vue通过绝对查找静态文件是从当前最外层文件夹下的src下的static文件下查找(因为static文件下的静态文件webpack是不会处理的，在3.0以后把静态文件放在public文件夹下) 

+ 如果URL是一个绝对路径(例如/images/foo.png)，它将会保留不变

  ```javascript
  <img alt="Vue logo" src="/assets/logo.png">
  <img alt="Vue logo" src=“http://image.xx.com/logo.png”>    
  ```

+ 如果URL以`.`开头会当做一个相当模块请求被解释并基于文件系统相对路径

  ```javascript
  <img alt='Vue logo' src="./assets/logo.png">
  ```

+ 如果URL以`~`开头会被当做一个模块请求被拦截，这意味着你甚至可以引用Node模块中的资源

  ```javascript
  <img src="~some-npm-package/foo.png">
  ```

+ 如果URL以`@`开头会作为一个模块请求被解析。Vue CLi默认会设置一个指向`src`的别名`@`

  ```javascript
  import Hello from '@/components/Hello.vue'
  ```

#### 何时使用Public文件夹

使用wenpack打包工具生成的话，pubic相当于static文件

通过webpack的处理并获得如下好处：

+ 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求
+ 文件丢失会直接在编译时报错，而不是到了客户端才能能产生404错误
+ 最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存他们的老版本

如下情况考虑使用public文件夹

+ 你需要在构建输出中指定一个固定的文件名字
+ 你有上千个图片，需要动态引用他们的路径
+ 有些库可能和webpack不兼容，除了将其用一个独立的`<script>`标签引入没有别的选择

使用public文件夹的注意事项

+ 如果你的应用没有不是在域名的根部，那么你需要为你的URL配置publicPath前缀

        ```javascript
// vue.config.js
module.exports ={
    pubilcPath:process.env.NODE_ENV === 'publiction'
    

}
        ```

### CSS相关

使用预处理器

如果创建项目时没有选择需要的预处理器(Sass/Less/Stylus)，则需要手动安装相关的loader

```javascript
# sass
npm install -D sass-loader node-sass
# Less
npm install -D less-loader less
#stylus
npm install -D stylus-loader stylus

```



范例:APP.vue 修改为Sass

```javascript
<style scoped lang="scss">
 $color:#42b983;
 a {
    color: $color;   
 }
 </style> 
```

### Scoped CSS

当`<style>`标签有scoped属性时，它的css只作用于当前组件中的元素。

```css
<style scoped>
.red{
    color:red;
}
</style>    
```

### CSS Module

CSS Module 是一个流行的，用于模块化和组合CSS的系统。`vue-loader`提供了与css modules的一流集成，可以作为模拟scoped CSS的替代方案。

添加module

```html
<style module lang="scss">
    .red{
        color:#f00
    }
    .bold{
        font-weight:bold;
    }
</style>    
```

模板中通过$style.xx访问

```html
<a :class="$style.red">awesome-vue</a>
<a :class="[$style.red,$style.bold]">awesome-vue</a>
```

js中访问

```html
<script>
    export default{
        created(){
            //一个基于文件名和类名生成的标识符
            console.log(this.$style.red)
        }
    }
</script>
```

## 数据访问相关

### 数据模拟

使用开发服务器配置before选项，可以编写接口，提供模拟数据

```javascript
devServer:{
    before(app){
        app.get('/api/course',(req,res)=>{
            res.json([{name:'web全栈',price:8999},{name:'web高级',price:5999}])
        })
    }
}
```

调用

```javascript
import axios from 'axios'

export function getCourses(){
    return axios.get('/api/course').then(res=>res.data)
}
```

### 代理

设置开发服务器代理选项可以有效避免调用接口时出现的跨域问题

```javascript
devServer:{
    proxy:'http://localhost:3000'
}
```

测试接口

```javascript
//需要安装express: npm i express
const express =require('express')
const app =express()

app.get('/api/courses',(req,res)=>{
    res.json([{name:'web全栈',price:8999},{name:'web高级',price:5999}])
})
app.listen(3000)
```

## Vue路由

### 路由动态匹配

我们经常需要把某种模式匹配到所有路由，全都映射到同个组件。例如,我们有一个`user`组件，对于所有ID各有不相同的用户，都要使用这个组件来渲染。那么，我们可以在`vue-router`的路由路径中使用"动态路径参数"来达到这个效果。

```javascript
{path:'/user/:id',component:User}
```

范例：查看课程详情,views/Detail.vue

```vue
<div>
   <h2>
       detail Page
    </h2>
    <p>
        {{$route.params.name}}
    </p>
</div>
```

router/index.js

```javascript
{
   path:'course/:name',
   component:()=>{
       import('../view/Detail.vue')
   }   
}   
```

列表中的导航,About.vue

```vue
<router-link :to="`/course/${c.name}`">
  {{c.name}}-{{c.price|currency('$')}}
</router-link>
```

通配符

适合做404页面路由

```javascript
{
    //会匹配所有路径
    path:'*',
    component:()=>import('../view/404.vue')    
}
```

### 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL中隔断动态路径也按某种结构对应嵌套的各层组件，例如

![1605783492929](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1605783492929.png)

范例：嵌套方式显示课程详情

```vue
<router-link to="`/about/${c.name}`">
     {{c.name}} - {{c.price|currency('$')}}
</router-link>
<router-view></router-view>
```

路由配置

```javascript
{
    path:'/about',
    name:'about',
    component: ()=>import('../view/About.vue'),
    children:[
        {path:'name',component:()=>import('../view/Detail.vue')}
    ]    
}
```

### 编程导航

借助router的实例方法，可编写代码来实现编程式导航

```javascript
router.path(location,onComplete ?,onAbort?)
```

```javascript
//字符串
router.path('home')

//对象
router.path({path:'home'})

//命名的路由
router.path({name:'user',params:{userId：'123'}})

//带查询参数
router.path({path:'register',query:{plan：'private'}})
```







## 路由组件缓存

利用keepalive做组件缓存，保留组件状态，提高执行效率

范例：缓存about组件

```vue
<keep-alive include="about">
    <router-view></router-view>
</keep-alive>
```

使用include或exclude时要给组件设置name

两个特别的生命周期：`activated`(组件激活状态)，`decactivated`(组件未激活状态)

场景：确定某个组件不需要频繁重新获取状态

## Vuex 统一状态管理

Vuex是一个专为Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以可预测的方式发生变化

![1606597826521](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1606597826521.png)

安装

```javascript
vue add vuex
```

### 起始

State

将应用全局状态定义在state中

```javascript
state:{
    isLogin: false
}
```

Mutation

修改state只能通过mutation

```javascript
mutations:{
    login(state){
        state.isLogin =true
    }
    logout(state){
        state.isLogin =false
    }
}
```

### 获取和修改状态

使用store.state获取状态

```vue
<button @click="login" v-if="!$store.state.isLogin"></button>
<button @click="loginout" v-else>
    登出
</button>
```

修改状态只能通过store.dispatch(mutation)

```javascript
this.$store.commit('login')
this.$store.commit('loginout')
```

Action

Action类似mutation，不同在于：

+ Action 提交的是mutation，而不是直接变更状态
+ Action可以包含任意异步操作

```javascript
login({commit},username){
    //参数1是vuex传递的上下文context：{commit,dispatch,state}
    return new promise((resolve,reject)=>{
        setTimeout(()=>{
           if(username === 'admin'){
               commit('login')
               reslove()
           }else{
               reject()
           }
        },1000)
    })
}
```

派发动作

```javascript
this.$store.dispatch('login','admin').then(()=>{
    this.$router.push(this.$router,query,redirecct)
}).catch(()=>{
    alert('用户名或密码错误')
})
```

### 最佳实践

模块化

使用modules定义多个子模块利于组件复杂状态

```javas
import user from './user'
export default new Vuex.store({
   modules:{
      user
   }
})
```

移动先前登陆状态相关代码到user.js

```javascript
export default{
    namespaced： true, //避免命名冲突
}
```

访问方式响应式变化

```vue
//login.vue
<button @click="login" v-if="!store.state.user.islogin"></button>

<script>
  this.$store.dispatch('user/login','admin').then(()=>{
      const redirect =this.$router,query.redirect||'/'
      this.$router.path(redirect)
  }).catch(()=>{
      alert('用户名或密码错误')
  })
</script>	
```

```javascript
//router/index.js
store.state.user.islogin
```

mapState()/mapMutation()/mapAction()

通过这些映射方法可以让大家便于书写，避免对$store直接访问

state相关修改，login.vue

```javascript
import {mapState} from 'vuex'
computed: {
    ...mapState('user',['isLogin'])
}
```

```vue
<button @click="login" v-if="!islogin">登陆</button>
```

action 相关修改

```vue
import {mapActions} from 'vuex'

methods:{
  login(){
    this['user/login']('admin').then(...)
   },
   ...mapActions(['user/login','user/logout'])
}
```



### vuex插件

场景： 如果一些业务需要状态相关的内容，但是直接写在vuex中可能造成vuex臃肿。例如，需要将localStorage中的登录状态，并实现登录状态持久化

Vuex的store接受`plugins`选项，这个选项暴露出每次mutation的钩子。vuex插件就是一个函数，它接收store作为唯一参数。

```javas
const myPlugin = store=>{
  //当store初始化后调用
}
```

注册插件

```javascript
const store = new Vuex.Store({
    //...
    plugins: [myPlugin]
})
```

实现登录状态持久化，store/plugin/persist.js

```javascript
export default store =>{
    //初始化时从localStoreage获取数据
    if(localStorage){
        const user =JSON.parse(localStorage.getItem('user'))
        if(user){
            store.commit('user/login')
            store.commit('user/setUsername',username)
        }
    }
    // 用户状态发生变化时缓存之
    store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('user/')) {
        localStorage.setItem('user', JSON.stringify(state.user))
      } else if (mutation.type === 'user/logout') {
        localStorage.removeItem('user')
      }
})

}
```

