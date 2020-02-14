# gulp

gulp是工作流工具，和grunt是一类的东西，gulp意思是“狼吞虎咽”的吃，grunt是“打呼噜”。工作流工具就是把人类的重复劳动解放出来的工具，比如我们要合并3个.css文件为一个css文件，使用工具能够自动监听css文件改变，自动合并css文件，gulp和grunt就是这样的工具。

gulp，grunt不涉及CMD模块的编译，他们不是构建的工具，就是工作流工具



## 安装

一定要全局安装，然后在项目文件夹安装

```javascript
cnpm install gulp -g
cnpm install gulp --save-dev
```

此时我们跑官方的demo，在项目中创建一个gulpfile.js文件；

```javascript
npx -p touch nodetouch gulpfile.js
```

安装gulp插件

```javascript
cnpm install gulp-pug --save-dev
cnpm install gulp-less --save-dev  
cnpm install gulp-csso --save-dev  
cnpm install gulp-concat --save-dev
```

此时在CMD中

```javascript
gulp
```

