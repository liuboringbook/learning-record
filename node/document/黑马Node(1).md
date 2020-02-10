# 黑马Node(1)

## 1. Node开发概述

### 为什么要学习服务端开发基础？

+ 能够和后端程序员更加紧密的配合
+ 网站业务逻辑前置，学习前端技术需要后端技术支持(ajax)
+ 扩宽知识视野，能够站在更高的角度审视整个项目

### 服务端开发要做的事情

+ 实现网站的业务逻辑
+ 数据的增删改查

### 为什么选择Node

+ 使用JavaScript语法开发后端应用
+ 一些公司要求前端工程师掌握Node开发
+ 生态系统活跃，有大量开源库可以使用

+ 前端开发工具大多基于Node开发

### Node是什么？

Node是一个基于Chrome V8引擎的JavaScript代码运行环境

运行环境：

+ 浏览器(软件)能够运行JavaScript代码，浏览器就是JavaScript代码的运行环境
+ Node(软件)能够运行JavaScript代码，Node就是JavaScript代码的运行环境

## 2.Node运行环境搭建

### Node运行环境安装

官网：http://nodejs.org/en/

![1580549848397](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1580549848397.png)

### Node环境安装失败解决方法

![1580550133940](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1580550133940.png)

失败原因： 系统账号权限不足



解决方法： 

1. 以管理员身份运行powershell 命令行
2. 输入运行安装包命令 msiexec /package node安装包位置



![1580550394235](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1580550394235.png)

失败原因：Node安装目录写入到环境变量中

解决方法：将Node安装目录添加到环境变量中

![1580550666666](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1580550666666.png)

将node的安装目录加入到path里

### path环境变量

存储系统中的目录，在命令行中执行命令的时候系统会自动去这些目录中查找命令的位置。



## 3. Node快速入门

### Node.js的组成

+ JavaScript由三部分组成的，ECMAScript，DOM，BOM
+ Node.js是由ECMAScript及Node环境提供的一些附加API组成的，包括文件，网络，路径等等一些更加强大的API

### Node.js基础语法

所有ECMAScript语法在Node环境中都可以使用。

