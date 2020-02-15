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

```javascript

const { src, dest, parallel } = require('gulp');
const pug = require('gulp-pug'); //编译jade模板
const less = require('gulp-less'); //编译less文件
const minifyCSS = require('gulp-csso'); //最小化css文件的
const concat = require('gulp-concat');  //合并

function html() {
    //html作业，作业的名字叫做html，主要内容:
    return src('/*.pug')//读取app文件夹中的所有pug文件
        .pipe(pug())  //处理一下
        .pipe(dest('build/html'))// 生成
}

function css() {
    //css作业
    return src('css/*.less') //读取less文件
        .pipe(less())  //处理一下
        .pipe(minifyCSS()) //最小化
        .pipe(dest('build/css')) //生成
}

function js() {
    //js作业
    return src('dist/*.js', { sourcemaps: true }) //读取js文件
        .pipe(concat('app.min.js')) //连接app.js文件
        .pipe(dest('build/js', { sourcemaps: true })) //生成
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);
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

如果要单独执行：

```javascript
gulp html
```

此时build文件夹中就会出现编译之后的index.html和css.css，文件这是因为我们配置了gulpfile.js文件

## gulp的工作流

### task()

gulpfile.js文件中gulp.task()是最常用的API，表示定义了一个工作:

```javascript
gulp.task("工作名字","工作的具体内容名函数");
```

其中default表示默认工作，一般罗列数组。

```javascript
gulp.task("default",["工作名字1","工作名字2"]);
```

gulp是插件机制，gulp天生只能定义task，具体的事情必须依赖插件，所有的插件的名字在npm都叫`gulp-`开头。

API就三个：

+ gulp.src() 读取一个文件，变成gulp自己的vinyl文件
+ gulp.pipe() 表示事务的顺序

+ gulp.dest()生成文件

### watch() 自动监听文件变化

```javascript
gulp.watch('app/*.less',['csstask']); //监听app文件夹下的less文件，如果文件变化执行csstask指令
gulp.watch('app/*.pub',['htmltask']);//监听app文件夹下的less文件，如果文件变化执行htmltask指令
```

### 通配符

不管是watch里面，还是gulp.src里面。都涉及传入一个路径参数

+ *表示任意文件
+ **表示任意层级

```javascript
gulp.task('htmltask'，function(){
    //html文件，作业的名字叫做htmltask。主要内容
    return gulp.src('app'/**/*.pug)//读取app文件夹中的所有pug文件
    .pipe((pug))
    .pipe(gulp.dest('dist'))//生成
})
```

此时

app/1.pug

app/a/1.pug

app/a/b/1.pug都会被编译

### gulp-concat 合并文件

比如app/js/1.js是

```javascript
(function(){
    function fun(){
        alert("我是fun")
    }
    window.fun =fun
})()
```

app/js/2.js是

```javascript
fun();
```

使用gulp命令之后，dist/all.js就是

```javascript
(function(){
    function fun(){
        alert("我是fun")
    }
    window.fun =fun
})()
fun();
```

暴力合并

工作流：

编译less -->合并css-->智能优化css-->合并js-> 混淆js

### gulp-gzip

自动生成一个压缩包

### gulp-autoprefixer

自动补全css3前缀，-webkit，-moz，-ms， -o-

### gulp-css-base64

base64

png图形描述几何图形的时候，极小，如果是图片，非几何尺寸，

png的底层是类似svg的一些几何图形的代码，所以图形月规范，png优势越大

gulp-css-base64可以自动帮我们转换所有css中.png结尾的背景图片换位base64写法

可以大大节省空间

IE8以上开始兼容base64

限制： 8kb之内的png图片适合被转

### gulp-imagemin

gulp-imagemin- 压缩 PNG, JPEG, GIF and SVG 图片 通过 [imagemin](https://link.jianshu.com/?t=https://github.com/imagemin/imagemin).