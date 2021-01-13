# webpack(3)

## webpack对图片的处理

+ file-loader：解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在路径的。这就导致图片引入失败。这个问题我们是用file-loader解决的，file-loader可以解析项目中的url引入，根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
+ url-loader：如果图片较多，会发很多的http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码。生成dataURL。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被传入DataURL，大于limit的还会使用file-loader进行copy

```javascript
npm install --save-dev file-loader url-loader
```

文件中的图片分为三种，在css中引入，在js中引入，在html中引入

处理css，js中图片

```javascript
{
    test: /\.(png|svg|jpg|gif)$/,
    use: {
        loader: 'file-loader',
        options: {
            name:'assets/[name].[ext]',
        }
    }
},
```

直接使用file-loader。url-loader进行配置即可，但是要注意在output(出口)中加入`publicPath:'/'`

```javascript
module.exports= {
   entry:__dirname +'/src/index.js'，
   output:{
    path:__dirname+'/dist',
    filename:'bundle.js'，
    publicPath:'/'  //需要在图片上传的时候添加
   }
}
}
```

在html中的图片不能被直接打包，需要借助html-withimg-loader

```javascript
npm install html-withimg-loader --save
```

在webpack.config.js中配置

```javascript
module.exports ={
    test:/\/.(htm|html)$/,
    use:['html-withimg-loader']
}
```

## html-webpack-plugin

htmlwenpackplugin会在打包结束后，自动生成一个html文件，并把打包生成的js模块引入到该html中

```javascript
npm install --save-dev html-webpack-plugin
```

配置

```
title: ⽤用来⽣生成⻚页⾯面的 title 元素
filename: 输出的 HTML ⽂文件名，默认是 index.html, 也可以直
接配置带有⼦子⽬目录。
template: 模板⽂文件路路径，⽀支持加载器器，⽐比如
html!./index.html
inject: true | 'head' | 'body' | false ,注⼊入所有的资
源到特定的 template 或者 templateContent 中，如果设置为
true 或者 body，所有的 javascript 资源将被放置到 body 元
素的底部， 'head' 将放置到 head 元素中。
favicon: 添加特定的 favicon 路路径到输出的 HTML ⽂文件中。
minify: {} | false , 传递 html-minifier 选项给 minify
输出
hash: true | false, 如果为 true, 将添加⼀一个唯⼀一的
webpack 编译 hash 到所有包含的脚本和 CSS ⽂文件，对于解除
cache 很有⽤用。
cache: true | false，如果为 true, 这是默认值，仅仅在⽂文件
修改之后才会发布⽂文件。
showErrors: true | false, 如果为 true, 这是默认值，错误
信息会写⼊入到 HTML ⻚页⾯面中
chunks: 允许只添加某些块 (⽐比如，仅仅 unit test 块)
chunksSortMode: 允许控制块在添加到⻚页⾯面之前的排序⽅方式，⽀支持
的值： 'none' | 'default' | {function}-default:'auto'
excludeChunks: 允许跳过某些块， (⽐比如，跳过单元测试的块)
```

案例:

```json
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
    ...
    plugins:[
        new htmlWebpackPlugin({
            title:"My App",
            filename:"app.html",
            template:"./src/index.html"
        })
    ]
}
```

需要注意想要在打包的html的文件中生成正确的title，需要在原来的html模板上进行以下修改

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= webpackConfig.title %></title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
</body>
</html>
```

因为htmlwenpackplugin默认识别的ejs语法

## Clean-webpack-plugin

```javascript
npm install --save-dev clean-webpack-plugin
```

```json
const { CleanWebpackPlugin } = require("cleanwebpack-plugin");
...
plugins: [
new CleanWebpackPlugin()
]
```

需要注意的是引入的时候需要加上括号

## mini-css-extract-plugin

```json
const MiniCssExtractPlugin = reqirue("mini-css-extract-plugin")
{
    test:/\.css$/,
    use:[MiniCssExtractPlugin.loader,"css-loader"]
}

new MiniCssExtractPlugin({
    filename:[name][chunkhash:8].css
}) 
```

需要注意引入的时候还需要引入loader `MiniCssExtractPlugin.loader`

## webpack-dev-server

+ 提升开发效率的利器

每次改完代码都需要重新打包一次，打开浏览器，刷新一次，很麻烦，我们可以安装使用webpackdevserver来改善这块的体验

+ 安装

```javascript
npm install webpacl-dev-server -D
```

+ 配置

修改下package.json

```javascript
"scripts":{
    "server":"webpack-dev-server"
}
```

在webpack.config.js配置：

```javas
devServer{
  contentBase:"./dist",
  open:true,
  port:8081
}
```

+ 启动

```javas
npm run server
```

启动服务后，会发现dist目录没有了，这是因为devServer把打包后的模块不会放在dist目录下，而是放到了内存中，从而提升速度

