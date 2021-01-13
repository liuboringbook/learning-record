# webpack(1)

## webpack是什么

### 为什么要使用webpack

我们都知道一个大公司的网站往往做的都很炫酷，美观，功能齐全。在这背后前端工程师花了很大的精力去优化。大型网站和大型项目中背后都拥有着复杂的JS代码和很多依赖。为了简化开发的复杂度，往往对程序切割分裂成不同的模块

![img](https://user-gold-cdn.xitu.io/2019/6/30/16ba776df3057afd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如图所示，把大型项目切割成很多不同的模块。里面带的箭头可以理解为`require`。因为两个文件之间相互通联是靠`require`连接的。好比如，html文件利用link中引入样式一样。webpack整合了项目里的模块打包的更为精简。所以我们需要wepack

+ webpack分析大型项目的结构
+ 找到JS模块以及浏览器不能直接运行的模块(cjs,sass,hbs等等)
+ 将浏览器不能直接处理的文件装换和打包为合适的格式供浏览器直接处理
+ 这样前端工程师即可以更轻松系统的开发，浏览器也能更高效流畅的运行

### webpack的工作原理

![img](https://user-gold-cdn.xitu.io/2019/6/30/16ba78866fc440b7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

webpack的工作原理就是webpack分析大型项目的结构，找到浏览器不能直接运行的模块，将浏览器不能直接处理的文件装换和打包为合适的格式供浏览器处理。

![img](https://user-gold-cdn.xitu.io/2019/7/1/16bab14c0a750e74?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## webpack安装&使用

+ 初始化项目

```javascript
npm inint -y //快速创建nodejs项目
```

+ 两种webpack安装

```javascript
npm install -g webpack webpaack-cli  //全局安装(不推荐使用)
npm install -D webpack webpack-cli  //本地安装 
```

 全局安装会将项目锁定在特定的版本的webpack

+ 打包一个简单的文件
  + 在文件夹下新建一个src文件，下面新建一个main.js文件
  + 根目录下新建一个`webpack.config.js`文件。为什么要建这个文件，因为直接使用webpack。它会寻找`webpack.config.js`把当当成默认的配置去运行。此时他不需要使用任何参数，就能读取里面的内容
  ```javascript
  //webpack.config.js
  module.exports= {
      entry:__dirname+'/src/main.js'，指定入口文件，在src/main.js
      output:{
         path:__dirname +‘/dist’,//打包后指定存放的目录，放在dist
         filename:'bundle.js' //打包后的文件叫做bundls.js
    }
  }
  ```

  **`__dirname`是nodejs中一个全局变量，它指定当前执行脚本所在的目录**

    + 修改`package.json`文件，然后在命令行中运行指令`npm run build`

```javscript
{
  "name": "pack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"   //需要修改的地方
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.11.1",
    "webpack-cli": "^4.3.1"
  }
}
```



