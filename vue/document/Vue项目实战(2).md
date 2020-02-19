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

