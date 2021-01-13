# webpack(2)

## webpack核心内容

### Entry(入口)

Entry是webpack的入口文件，一开始运行webpack它会找到`webpack.config.js`里的Entry。它会从这里开始着手，构建内部依赖图。入口点可以有一个或多个

  + entry的类型
    + string类型
    
     ```javascript
     //一个入口
     entry:'./src/main.js'
     ```
    
    + array类型
    
    ```javascript
    entry:['./src/main.js','./src/main2.js']
    ```
    
    + object类型
    
    ```javascript
    //对象类型
    entry:{
        a:'./src/main.js',
        b:['./src/main1.js','./src/main2.js']    
    }
    ```
    
    只有对象且键值对的形式，才是多入口文件。如果是多入口，就一定要是多出口
    
    例如：
    
    ```javascript
    //多入口文件
    entry:{
       index:'./src/main.js',
       other:'./src/other.js'
    }
    output:{
       path:path.reslove(__dirname,"./dist"),
       filename:"[name].js"
    }
    //占位符
    //hash整个项目的hash值，每次构建一次，就会有一个hash值,hash是1-16为数字字母组成的，可以截取[hash:6].js
    //chuckhash 根据不同入口entry进行依赖解析，构建对应的chunkhash，只要组成entry的模块没有内容改动，则对应的hash不变
    //name
    //id   
    ```
    
    多个入口是，每个入口生成都会生成chuck
    
    1chuck(代码块) = 1bundle(资源文件)
    
    
### output(出口)

#### chuck

  + 如果entry是string类型或者是array类型，只会生成一个chuck
  + 如果entry是一个object，就可能出现多个chuck，这时候的chunck值是object名称。比如上面的`a.js`,`b.js`Chuck名称在output可以配置

使用入口名称赋值，`[name]`为entry的key值

```javascript
filename:"[name].bundle.js"
```

使用内部chunk id,从0开始

```javascript
filename:"[id].bundle.js"
```

使用每次构建过程中，都会生成一段hash值

```javascript
filename:"[hahs].boundle.js"
```

也可以对hash值进行截取

```javascript
filename:"[chunkhash].boundle.js"
```

#### path

output.path配置输出文件存放在本地的目录，必须是string类型的绝对路径。通常通过Node.js的path模块去获取绝对路径：

```javascript
path:path.resolve(__dirname,'dist_[hash]')
```

`__dirname`就是当前文件所在的文件夹的名字

#### publicPath

对构建出的资源进行一步加载(图片，文件)。加载这些一步资源需要对应的URL地址。默认是空字符串。简单说，就是静态文件托管在cdn上

```javascript
output:{
    filename:'[name]_[chunkhash:8],js',
    publicPath:'https://www.qdtalk.com/assets'    
}
```

打包编译之后，HTML页面就变成

```html
<script src="https://www.qdtalk.com/assets/a_12345678.js"></script>
```

### Loader

Loader在webpack中承担翻译的作用。因为webpack自身只支持js和json文件，把源文件转化翻译后输出的新结果，且一个文件还可以链式的经过多个翻译员翻译

以处理Scss文件为例：

+ scss源码先后交给sass-loader把scss转成css

+ 把sass-loader输出的css交给css-loader处理，找出css中依赖的资源，压缩css等
+ 把css-loader输出的css交给style-loader处理。转换成通过脚本加载的JavaScript代码

#### 常用的Loader

+ 样式：`style-loader、css-loader、less-loader、sass-loader`等。
+ 文件：`raw-loader、file-loader 、url-loader`等

+ 编译：`babel-loader、coffee-loader 、ts-loader`等
+ 校验测试：`mocha-loader、jshint-loader 、eslint-loader`等
+ `vue-loader、coffee-loader、babel-loader`等可以将特定文件格式转成js模块、将其他语言转化为js语言和编译下一代js语言
+ `file-loader、url-loader`等可以处理资源，`file-loader`可以复制和放置资源位置，并可以指定文件名模板，用hash命名更好利用缓存。
+ `url-loader`可以将小于配置limit大小的文件转换成内敛Data Url的方式，减少请求。
+ `raw-loader`可以将文件已字符串的形式返回
+ `imports-loader、exports-loader`等可以向模块注入变量或者提供导出模块功能
+ `expose-loader`:暴露对象为全局变量

#### 安装Loader

以安装css-loader和style.loader为例，直接在终端：

```javascript
npm install css-loader style-loader --save-dev
```

#### 配置单个Loader

`webpack.config.js`中

```javascript
module.exports ={
    module:{
        rules:[{
            test:/\.css$/,
            use:'css-loader'
        }]
    }
}
```

+ test后面接一个正则表达式，表示有哪些后缀文件被处理
+ use:表示应该用什么loader

```javascript
module.exports= {
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[{
                    loader:'style-loader'
                },{
                    loader:'css-loader'
                }]
            }
        ]
    }
}
```

#### 几个重要的loader

+ Babel

Babel可以让你使用Es6/7/8写代码而不用顾忌浏览器的问题，babel可以帮你转换代码

+ 安装几个必要的babel库

```javascript
npm i --save-dev babel-loader babel-core babel-preset-env
// babel-loader让webpack去处理一些使用了es6的js文件。
//babel-core 提供一系列API，其实是让babel-loader去调用babel-core的API。
//babel-preset-env 这个库可以根据环境的不同转换代码
```

+ 配置babel规则。在`webpack.json`里增加一个babel属性。作用是设置项目中的babel转码规则和使用到的babel插件，格式如下：

```javascript
"babel":{
    “presets”:["evn"], //设定转码规则
     "plugins":[] //要用到的插件   
}
```

表示告诉npm，在本项目中将使用babel,并且使用`babel-preset-env`规则进行转码

+ 除了上一种写法，也可以在根目录下面新建`.babelrc`文件，然后做一下配置

```javascript
{
  "presets":["babel-preset-env"]
}
```

配置好babel的规则，但是webpack依然不知道何时使用该规则。我们还要再接着在配置里写入

```javascript
use:'babel-loader'
```

+ 处理图片

 ```javascript
npm i --save-dev url-loader file-loader
 ```

在webpack.config.js里面修改配置：

```javascript
test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
use : [
  {
     loader: 'url-loader',
     options: {
      // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
         limit: 10000,
      // 超出限制，创建的文件格式
      // build/images/[图片名].[hash].[图片格式]
         name: 'images/[name].[hash].[ext]'
    }
  }
]

```

### Plugins(插件)

插件用来扩展webpack功能，可以用于执行范围更广的任务，包括打包，优化，压缩，搭建服务器等等，功能十分强大。要是用一个插件，一般是先使用npm包管理器进行安装，然后在配置文件webpack.config.js中的require引入，最后再这个文件下使用new来创建一个实例。loader一次只能处理单个相同类型文件，但是plugins可以对整个过程起作用。

#### 常用的Plugin插件

+ webpack内置`UglifyJsPlugin`插件，压缩和混淆代码。
+ webpack内置`CommonsChunkPlugin`，提高打包效率，将第三方库和业务代码分开打包
+ `ProvidePlugin`：自动加载模块，代替`require`和`import`
+ `html-webpack-plugin`可以根据模板自动生成html代码，并自动引用css和js文件
+ `extract-text-webpack-plugin` 将js文件中引用的样式单独抽离成css文件
+ `DefinePlugin` 编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。
+ `HotModuleReplacementPlugin `热更新
+ `optimize-css-assets-webpack-plugin` 不同组件中重复的css可以快速去重
+ `webpack-bundle-analyzer` 一个webpack的bundle文件分析工具，将bundle文件以可交互缩放的treemap的形式展示
+ `compression-webpack-plugin` 生产环境可采用gzip压缩JS和CSS
+ `happypack`：通过多进程模型，来加速代码构建

#### 一个简单的插件使用

+ `npm install --save-dev html-webpack-glugin`安装一个插件。有的插件webpack自带，如果没有，则需要npm安装
+ `const HtmlWebpackPlugin =require('html-webpack-plugin') `在webpack.config.js中引用
+ new一个实例

```javas
plugins: [
  new HtmlWebpackPlugin({
  template: './src/index.html', //以src目录下的index.html文件为模板生成html5新文件
  filename: 'index.html',//指定生成的HTML文件叫啥名
  inject: 'head',//指定把脚本script标签放在那里，这里放在<head>标签里。还可以放<body>
  })
]
```

#### 利用html-webpack-plugin插件自动生成html

每次执行webpack打包生成js文件后，都必须在index.html中手动插入打包好的文件的路径。但在真实生产环境中，一次运行webpack后，完整的index.html应该是被自动生成的。例如静态资源，js脚本都被自动插入了。

根目录下的index.html会被html-webpack-plugin作为最终生成对的html文件的模板。打包后，相关引用关系和文件路径都会按照正确的配置被添加进去

```javas
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
 entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
  },
    plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["app"], // entry中的app入口才会被打包
      minify: {
        // 压缩选项
        collapseWhitespace: true
      }
    })
  ]
}
```

最后执行打包命令，然后在dist目录下就给你自动生成了index.html文件。dist目录下的index.html文件是以根目录下的inde.html文件为模板的。

### Mode

分为开发模式`development`和生产模式`production`两种模式的区别在于一个是为生产环境编译打包，一个是为了开发环境编译打包。生产环境模式下，webpack会自动对代码进行压缩等优化，省去了配置的麻烦

![1610444336694](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1610444336694.png)

