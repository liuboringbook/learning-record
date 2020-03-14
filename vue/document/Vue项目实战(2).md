# Vue项目实战(2)

## 前端项目初始化步骤

1. 安装vue脚手架
2. 通过Vue脚手架创建项目
3. 配置Vue路由
4. 配置Element-UI组件库
5. 配置axios库
6. 初始化git远程仓库

7. 将本地项目托管到github或码云上

## 后台项目的环境安装配置

1. 安装MySQL数据库
2. 安装Node.js环境
3. 配置项目相关信息
4. 启动项目
5. 使用Postman测试后台项目接口是否正常

## 登录/退出功能

### 登录业务概述

#### 登录业务流程

1. 在登录页面输入用户名和密码
2. 调用后台接口进行验证
3. 通过验证之后，根据后台的响应状态跳转到项目主页

#### 登录业务的相关技术点

+ http是无状态的
+ 通过cookie在客户端记录状态
+ 通过session在服务端记录状态
+ 通过token方式维护状态

前端和后台接口不存在跨域问题使用cookie和session维持登录状态

前端和后台存在跨域问题使用token维持登录状态

#### 登录 ---token原理分析

![1581904864047](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1581904864047.png)

### 登录功能实现

#### 登录页面的布局

通过Element-UI组件实现布局

+ el-form
+ el-form-item
+ el-input
+ el-button
+ 字体图标

Element-UI按需导入

首先安装babel-plugin-component

```javascript
npm install babel-plugin-component -D
```

然后修改.babelrc为：

```javascript
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime",
  [
    "component",   
    {
      "libraryName": "element-ui",  //添加element-UI模块
      "styleLibraryName": "theme-chalk"
    }
  ]]
}
```

接下来，如果只希望引入部分组件。比如Button和Select，那么在main.js引入以下内容g

```javascript
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 登录功能实现

#### 路由导航守卫控制访问权限

如果用户没有登录，但是直接通过URL访问特定页面，需要重新导航到登录页面

```javascript
//为路由对象，添加beforeEach导航守卫
router.beforeEach((to,form,next)=>{
    //入如果用户访问的登录页，直接放行
    if(to.path ==='/login')return next()
    //从sessionStorage中获取保存的token值
    const tokenStr =window.sessionStorage.getItem('token')
    //没有token，强制跳转到登录页
    if(!tokenStr)return next('/login')
    next()
})
```

### 退出功能

#### 退出功能实现原理

基于token的方式实现退出比较简单，只需要销毁本地的token即可。这样，后续的请求就不会懈怠token，必须重新登录生成一个新的token之后才可以访问页面。

```javascript
//清空token
window.sessionStorage.clear();
//跳转到登录页
this.$router.push('/login');
```

## 主页布局

### 头部菜单布局

<el-container>
<el-header>Header</el-header>
<el-container>
<el-aside width="200px">Aside</el-aside>
<el-main>Main</el-main>
</el-container>
</el-container>

​	

### 左侧菜单布局

菜单分为二级，并且可以折叠

```html
<el-menu>
    <el-submenu>
       <!--这个template是一级菜单的内容模板 -->
        <i classs="el-icon-menu"></i>
        <span>一级菜单</span>
        <!--在一级菜单中，可以嵌套二级菜单 -->
        <el-menu-item>
            <i class=el-icon-menu></i>
             <span slot="title">二级菜单</span>	
        </el-menu-item>   
    </el-submenu>	
</el-menu>   
```

### 通过接口获取菜单数据

使用授权的API，必须在请求头中使用`Authorization`字段提供`token`令牌

通过axios请求拦截器添加token，保证拥有获取数据的权限

```javascript
//axios 请求拦截
axios.interceptors.request.use(config=>{
    //为请求头对象，添加Token验证的Authorization字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
```

## 权限管理

### 权限管理业务分析

通过权限管理模块控制不同的用户可以进行哪些操作，具体可以通过角色的方式进行控制，即每个用户分配一个特定的角色，角色包括不同的功能权限

![1582704230824](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1582704230824.png)

## 项目优化

### 项目优化策略

#### 生成打包报告

打包时，为了直观地发现项目中存在的问题，可以在打包时生成报告。生成报告的方式有两种：

1. 通过命令行参数的形式生成报告

   ```javascript
   //通过vue-cli 的命令选项可以生成打包报告
   //--report选项可以生成report.html以帮助分析内容
   vue-cli-service build --report
   ```

2. 通过可视化的UI面板直接查看报告(推荐)

   在可视化的UI面板，通过控制台和分析面板，可以方便地看到项目中所存在的问题

   ```javascript
   //安装最新版本的vue-cli
   npm install -g @vue/cli
   //启动可视化面板
   Vue ui
   ```


#### 通过vue.config.js修改webpack的默认配置

通过vue-cli3工具生成的项目，默认隐藏了所有webpack的配置项，目的是为了屏蔽项目的配置过程，让程序员把工作的重心，放在具体功能和业务逻辑的实现上

如果程序员有修改默认配置的需求，可以在项目根目录中，按需vue.config.js这个配置文件，从而对项目的打包发布过程做自定义的配置

```javascript
//vue.config.js
//这个文件中，应该导出一个包含了自定义配置选项的对象
module.exports ={
  //选项
}
```

#### 为开发模式与发布模式指定不同的打包入口

默认情况下，vue项目的开发与发布模式，公用一个打包文件的入口文件(即src/mian.js)。为了将项目的开发过程与发布过程分离，我们可以为两种模式，各自指定打包的入口文件，即：

1. 开发模式的入口文件为src/main-dev.js
2. 发布模式的入口文件为src/main-prob.js

#### configureWebpack 和chainWebpack

在vue.config.js导出的配置对象中，新增configWebpack或chainWebpack节点，来自定义webpack的打包配置

在这里，configWebpack和chainWebpack的作用相同，唯一的区别就是他们修改webpack配置的方式不同：

1. chainWebpack通过链式编程的形式，来修改默认对的webpack配置
2. configureWebpack通过操作对象的形式，来修改默认的webpack配置

#### 通过chainWebpack 自定义打包入口

代码示例

```javascript
module.export ={
    //发布模式
    chainWebpack.config =>{
    config.when(process.env.NODE_ENV ==='production',config =>{
    config.entry('app').clear().add('./src/main-prod.js')
 })
 //开发模式
 config.when(process.env.NODE_ENV === 'development',config=>{
     config.entry('app').clear().add('./src/main-dev.js')
  })
 }
}
```

#### 通过externals加载外部CDN资源

默认情况下，通过import语法导入的第三方依赖包，最终被打包合并到同一个文件中，从而导致打包成功后，单文件体积过大的问题

为了解决上述问题，可以通过webpack的external节点，来配置并加载外部的CDN资源。凡是声明在externals的第三方依赖包，都不会被打包。

具体代码如下

```javascript
config.set('externals',{
    vue:'Vue',
    'vue-router':'VueRouter',
    axios:'axios',
    lodash:'_',
    excharts:'echarts',
    nprogress:'NProgress',
    'vue-quill-editor':'VueQuillEditor'
})
```

同时，需要在public/index/html文件的头部，添加如下的CDN资源引用

```html
<!---nprogress的样式文件 --->
<link src="stylesheet" href="cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css">
```

#### 通过CDN优化ElementUI的打包

虽然在开发阶段，我们启用了element-ui组件的按需加载，尽可能的减少了打包的体积，但是那些被按需加载的组件，还是占用了较大的文件体积，此时，我们可以将element-ui中的组件，也通过CDN的形式来加载。这样能够进一步减小打包后的文件体积。



具体操作流程化如下：

1. 在main-prod.js中，注释掉element-ui按需加载的代码
2. 在index.html的头部区域中，通过CDN加载element-ui的js和css样式

#### 首页内容定制

不同的打包环境下，首页内容可能会有所不同。我们通过插件的方式进行定制，插件配置如下：

```javascript
module.export ={
    //发布模式
    chainWebpack.config =>{
    config.when(process.env.NODE_ENV ==='production',config =>{
    args[0].isProd =true;
    return args
 })
 //开发模式
 config.when(process.env.NODE_ENV === 'development',config=>{
    args[0].isProd =false;
    return args
  })
 }
}
```

在public/index.html首页中，可以根据isProd的值，来决定如何渲染页面结构：

```html
//按需渲染页面的标题
<title><%=htmlWebpackPlugin.options.isProd? '':'dev-'%></title>

//按需加载外部的CDN资源
<% if(htmlWebpackPlugin.options.isProd) {% >
   
<% } %>    
```

#### 路由懒加载

当打包构建项目时，JavaScript包变得非常大，影响页面加载，如果我呢吧能够把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

具体需要3步：

1. 安装@babel/plugin-syntax-dynamic-import包
2. 在babel.config.js配置文件中声明该插件
3. 将路由改为按需加载的形式，实例代码如下：

```javascript
const Foo = ()=>import(/* webPackChunkName:"'group-foo" */ './Foo.vue')
const Bar = ()=>import(/* webPackChunkName:"'group-foo" */ './Bar.vue')
const Baz = ()=>import(/* webPackChunkName:"'group-boo" */ './Baz.vue')
```

## 项目上线相关配置

### 通过node创建web服务器

创建node项目，并安装express,通过express快速创建爱你web服务器，将vue打包生成的dist文件夹托管为静态资源即可,关键代码如下：

```javascript
const express = require('express')
//创建web服务器
const app = express();
//托管静态资源
app.use(express.static('./dist'))

//启动web服务器
app.listen(80,()=>{
    console.log('web server run at http://127.0.0.1')
})
```

### 开启gzip配置

使用gzip可以减少文件体积，使传输速度更快

可以通过服务器端使用Express做gzip压缩，其配置如下：

```javascript
//安装相应包
npm install compression -D
//导入包
const compression = require('compression');
//启用中间件
app.use(compression());
```

### 使用pm2管理应用

1. 在服务器中安装pm2: npm i pm2 -g
2. 启动项目：pm2 start 脚本 --name 自定义名称
3. 查看运行项目：pm 2 ls
4. 重启项目：pm2 restart 自定义名称

5. 停止项目： pm2 stop 自定义名称
6. 删除项目：pm2 delete自定义名称

