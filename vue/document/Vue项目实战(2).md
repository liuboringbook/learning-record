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

