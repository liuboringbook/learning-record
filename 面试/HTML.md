## 1. Doctype作用？ 标准模式与兼容模式什么区别

- 声明位于HTML文档的第一行，处于标签之前。用来告知浏览器的解析器用什么文档标准解析这个文档。Doctype 不存在格式不正确会导致文档以兼容模式呈现。
- 标准模式：排版和js运行方式都是以该浏览器支持的最高标准运行
- 兼容模式：页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法运行
- 例子：width不同在严格模式中，width是内容宽度，但是在兼容模式中，width是元素的实际宽度(怪异盒模型是margin之外是width的范围)

## 2. 行内元素有哪些？块级元素有哪些？空元素有哪些？

常见的行内元素有： a,span,img,input,strong,select

常见的块级元素： div,ul,ol,li,p

常见的空元素: `<br>`,`<hr>`,`<script>`

空元素的定义： html元素的内容就是其两个标签之间的content，所以，标签之间没有内容的就是空元素

## 3. 页面导入样式时，使用link和import有什么区别？

写法上：

```
<link rel="stylesheet" href="路径">
   
<style>
   @import '路径'
</style>
```

本质上： link属于XHTML标签，除了加载css之外，还能定义RSS，定义rel连接属性等作用。而@import是css提供的，只能用于加载css

解析上：link是跟着页面加载同时加载的，但是@import会等到页面加载完再加载

兼容上： @import IE5以上才能识别，无限制

## 4. 介绍一下你对浏览器内核的理解？

主要分为两部分：
- 渲染引擎
- JS引擎

渲染引擎：取得网页的内容(html,xml,图片),构造cssdom树，计算网页的显示方式,比如各元素宽高，然后输出至显示器或打印机

js引擎：解析和执行JavaScript来实现网页的动态效果

## 5. 对html语义化的理解？

- 用正确的标签做正确的事情
- html语义化让页面的内容结构化，结构更加清晰，便于对浏览器，搜索引擎解析：
- 搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO；
- 使阅读代码的人对网站更容易将网站分块，便于于都维护理解

## 6. 浏览器是怎样对HTML5的离线存储资源进行管理和加载呢？

在线的情况下，浏览器发现html头部有manifest文件，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并进行离线存储。如果已经访问过app，并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件和旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么久会重新加载文件中的资源并进行离线存储。

离线的情况下，浏览器就直接使用离线存储的资源

## 7.iframe有哪些缺点？

- iframe会阻塞主页面的onload事件
- 搜索引擎的检索程序无法解读这种页面，不利于SEO
- iframe和主页面共享连接池，而浏览器对相同域也连接有限制，所以会影响页面的并行加载
- 使用iframe之前需要考虑这三个缺点。如果需要使用iframe，最好是通过JavaScript
- 动态给iframe添加src属性，这样可以绕开以上两个问题


## 8. Label作用是什么？ 是怎么用的？

用来关联某个标签，可以是表单标签，也可以是button，这样就可以直接点击label的范围来触发绑定标签的事件

## 9. html5有哪些新特性，移除了哪些元素？如何处理HTML5新标签对的浏览器兼容问题？如何区分HTML和HTML5？

新特性：主要是关于图像，位置，存储，多任务等功能的增加

```
如：
 绘图canvas
 
 用于媒介回放的video和audio元素

 本地离线存储LocalStorage，长期存储，浏览器关闭之后数据不会丢失 sessionStorage的数据在浏览器关闭后自动删除

 语义化更好的内容元素，比如 article，footer,header,nav,section

 表单控件：calender,date,time,email,url,search

 新的技术 webSocket 


```

处理兼容性：IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，浏览器支持新标签后，还需要添加标签默认的样式

也可以使用html兼容性文件

`<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>`

##  10. 前端需要注意哪些SEO

SEO三剑客：TDK 。`<title>`标签，`<meta name="description">`标签和`<meta name="keyword">`标签。分别代表当前页面的标题，内容摘要和关键词

## 11. input与textarea的区别

`<input>`是单行文本框，不会换行。通过size属性指定显示字符的长度。value属性指定初始值，maxlength属性指定文本框可以输入的最长长度。通过width和height设置宽高，但是不会增加行数

`<textarea>`是多行文本输入框。文本区中可以容纳无限数量的文本，无value属性，其中的文本的默认字体时等高字体，可以通过clos和rows属性规定textarea的尺寸，也可以使用css的height和width属性

## 12. 用div模拟textarea

作为多行文本域功能来讲，textarea满足了我们大部分的需求。然而，textarea有一个不足就是不能像普通点的div标签一样高度随着内容自适应。有自己的滚动条

因此在block元素上加个contenteditable=“true”

```html
<div contenteditable="true"></div>
```

