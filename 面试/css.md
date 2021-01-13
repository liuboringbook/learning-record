## 1. 介绍一下标准的css的盒子模型？低版本IE的盒子模型有什么不同

标准模型由四部分组成：
- 内容区域: 可以放置元素的区域如文本,图像等，一般设置宽高指的是这个内容的宽高
- 内边距的区域：内容与边框之间的距离
- 边框区域: 边框
- 外边框区域：由外边框限制，用空白区域扩展边框区域，开分开相邻的元素  

模型区分：
标准表型指的是设置box-sizing为content-box的盒子模型，一般width,height指的是content的宽高。IE盒模型指的是box-sizing为border-box的盒子。宽高的计算是content+padding+border;

## 2. CSS选择符有哪些？那些属于可以继承？

- id选择器(#myid)
- 类选择器(.myclassName)
- 标签选择器(div,h1,p)
- 子代选择器(ul>li)
- 后代选择器(li a)
- 通配符选择器(*)
- 属性选择器(a[rel="external"])
- 伪类选择器(a:hover,li:nth-child)

可继承的样式： font-size font-family color
不可继承的样式： border padding margin height width

## 3. css优先级如何计算?

- 优先级就近原则，同权重情况下样式定义最近这位准
- 载入样式以最后载入的定位为准

优先级为：

+ 同权重： 内联样式(标签内部)> 嵌入样式表(当前文件中)>外部样式(外部文件中)
+ !important >id >class >tag
+ !important 比内联优先级高

## 4. display有哪些值？说明他们的作用

- block  块类型。默认宽度为父元素宽度，可设置宽高，换行显示
- none  元素不显示，并从文档流中移除
- inline  行内元素，默认宽度为内容宽度，不可设置宽高，同行显示
- inline-block   默认宽度为内容宽度，可以设置宽高，同行显示
- list-item 像块类型元素一样，可以设置宽高，同行显示
- table  此元素会作为会计表格来显示
- inherit  规定应该从父元素继承display属性的值

## 5. position的值releave和absolute定位远点是？

- absolute 生成绝对定位元素，相对与值部位static的第一个父元素进行定位
- fixed 生成绝对的元素，相对于浏览器窗口进行定位
- relative 生成相对定位的元素，相对于其正常位置进行定位
- static 默认值。没有定位，元素出现在正常出现的流中
- inherit 规定从父元素继承position属性的值

## 6. css有哪些特性?

- 过渡

```
  transition-property:width
  transition-duration:1s
  transition-timing-function:linear
  transition-delay:2s
```
- 动画

`animation:动画名称，一个周期花费时间,云顶曲线(默认ease),动画延迟(默认0),动画播放次数(默认1),是否反向播放动画(默认normal),是否暂停动画(默认running)`

- 形状转换

```
transform: 使用于2D或3D转换的元素
transform-origin: 装换元素的位置(围绕哪个点进行装换).默认(x,y,z);
```

- 选择器

- 阴影

`box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始的方向(默认是从里向外，设置inset就是从外往里)`

- 边框图片

`border-image: 设置图片路径 设置边框背景图的分割方式 设置或检索对象的边框厚度 设置或检索对象的边框背景图向外扩展 设置边框图片的平铺方式`

- 边框圆角

```
  border-radius: n1 n2 n3 n4;
/* n1-n4 四个值得顺序是左上角，右上角，右下角，左下角 */
```

- 反射(倒影)

`box-reflect: 方向[above-上|below-下|right-右|left-左],偏移量,遮罩图片`

- 文字

+ 换行 `word-break:normal(默认使用浏览器默认的换行规则)|break-all(允许在单词内换行)|keep-all(只能在半角空格或连字符处换行)`
+ 超出省略号
```
overflow: hidden;
white-space: nowrap;
text-overflow:ellipsis;
```
+ 多行省略号

```
overflow:hiden;
text-overflow:ellipsis;用省略号"..."隐藏超出范围的文本
display:-webkit-box;  //将对象作为弹性伸缩盒子模型显示
-webkit-line-clamp:2; //用来限制在一个块元素显示的文本的行数
-webkit-box-orient:vertical;设置弹性盒对象的子元素的排列方式
```

+ 文字阴影

`text-shadow: 水平阴影 垂直阴影 模糊阴影 阴影颜色`

- 颜色

rgba(rgb颜色值，a为透明度)

- 渐变

线性渐变和径向渐变

- filter(滤镜)

`filter: 滤镜效果(透明度)`

- 弹性布局

弹性布局就是flex布局

-栅格布局

栅格化布局。就是grid

- 盒模型
+ border-box 边框和内边距包含在元素的宽高之内
+ content-box 边框和内边距不包含在元素的宽高之内

## 7. 请解释一下css3的flex(弹性盒布局模型)以及使用场景

一个用于页面布局的全新css3功能，flexbox可以把列表放在同一个方向(从上到下排列，从左到右)，并且列表能延伸到占用可用的空间，较为复杂的布局还可以嵌套一个伸缩容器(flex container)来实现。采用flex布局的元素，成为flex容器。常规布局是基于块和内联流方向，而flex布局是基于flex布局flex-flow流可以很方便的用来做居中，能对不同屏幕大小自适应，在布局上有了比以前更加灵活的空间

## 8. 经常遇到的浏览器的兼容性问题有哪些，原因，解决方法是什么

- png24位的图片在Ie6浏览器上出现背景。解决方案是做成png8
- 浏览器默认的margin和padding不同。解决方案是假一个全局的*{margin:0;padding:0}来统一
- IE6双边距bug；矿属性变迁float后，又有横向的margin情况下，在Ie6显示margin比设置的大。解决方案是在float的标签控制中加入display:inline；将其妆花为行内渐进识别的方式，从总体中逐步排除局部。
- 设置较小高度标签(一般小于10px)，在IE6，IE7中高度超出自己设置高度。解决方法:给超出高度的标签设置overflow:hidden;或者设置行高line-hieght小于你设置的高度
- chrome中文界面默认或将小于12px的文本强制按照12px的文本强制按照12px显示，可通过加入css属性 -webkit-text-size-adjust:none 解决

移动端

- 1px边框问题。解决方案采用微元素模拟的方式

```
 .scale{
  position: relative;
  border:none;
 }
.scale:after{
  content: '';
  position: absolute;
  bottom: 0;
  background: #000;
  width: 100%;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
```

- 点透问题，在安卓某些版本触发两次点击问题。解决方案：引入fastclick处理点透问题
- 安卓部分版本input里的placeholder位置偏上。解决方案：把input的line-height设为normal
- ios的body位置overflow：hidden后仍然可以滚动。解决方案：一般在所有元素最外层再包一大盒子.wrapper

```
 .wrapper{
   position:relative;
   overflow:hidden;
 }
```

- ios滚动卡顿。解决方案：在滚动的容器上加上`webkit-over-flow-scrolling:touch;`

## 9. 请解释一下为什么需要清浮动？清浮动的方式

清浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使页面后面的布局不能正常显示

- 父级div定义height
- 在浮动元素后面添加class为clear的空div元素，给这个div设置样式`.clear{clear:both}`
- 给父容器添加overflow:hidden或者auto样式
- 给父容器添加clearfix的class，用伪类clearfix:after；来这个样式。清除浮动
```
.clearfix{
    zoom:1;
}
.clear:after{
    content:'.';
    height:0;
    clear:both;
    display:block;
    visibility:hidden;
}
```
## 10. margin和padding分别适合什么场景使用？

margin是用来隔开元素与元素的间距；padding是用来隔开元素与内容的间隔。margin是用来布局分开元素，使元素与元素互不相干；padding用于元素与内容之间的间隔，让内容与元素之间有一段间距

11.什么是伪类，什么是伪元素，他们的区别？

- 伪类的受体是文档树中已有的元素，而伪元素则创建了一个DOM外的元素
- 伪类用于添加元素的特殊效果，而伪元素则是添加元素的内容
- 伪类使用的一个冒号，为元素使用两个冒号
- 伪类更常用一些简单的动画或者交互的样式，例如滑入滑出，而为伪元素更常用语字体图标，清除浮动等

12. 什么是外边距合并

外边距合并指的是，当两个垂直外边距相遇时，他们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中较大者

13. 实现水平垂直居中

示例：
```
<div class="md-warp">
    <span class="md-main"></span>
</div>
.md-warp{
    width: 400px;
    height: 300px;
    max-width: 100%;
    border: 1px solid #000;
}
.md-main{
    display: block;
    width: 100px;
    height: 100px;
    background: #f00;
}
```

水平居中

- margin法
需要满足三个条件
+ 元素定宽
+ 元素为块级元素或行内元素设置display:block
+ 元素的margin:left或者margin-right都必须设置auto
三个条件缺一不可

```
.md-main{
    margin: 0 auto
}
```

- 定位法
+ 元素定宽
+ 元素绝对定位，并设置left:50%;
+元素负做边距margin-left为宽度的一半

```
.md-wrap{
    position:relative;
}
.md-main{
    position:absolute;
    left:50%;
    margin-left:-50px
}
```
有些时候元素宽度不是固定的，依然可以使用定位法实现水平居中用到css3中的transform属性中的translate
```
.md-warp{
    position: relative;
}
// 注意此时md-main不设置width为100px
.md-main{
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%,0);
    -ms-transform: translate(-50%,0);
    -o-transform: translate(-50%,0);
    transform: translate(-50%,0);
}
```


- 文字水平居中

直接使用text-align:center即可

垂直居中

- 定位法

和水平居中类似，只是把left:50%换成top:50%,副边距和transform属性进行对应更改即可

优点：能在各个浏览器下工作，结构简单明了，不需要增加额外的标签

```
 .md-warp{
    position: relative;
}
.md-main{
    position: absolute;
    /* 核心 */
    top: 50%;
    margin-top: -50px;
}
```

不确定高度的时候

```
.md-warp{
    position: relative;
}
.md-main{
    position: absolute;
    top: 50%;
    // 注意此时md-main不设置height为100px
    -webkit-transform: translate(0,-50%);
    -ms-transform: translate(0,-50%);
    -o-transform: translate(0,-50%);
    transform: translate(0,-50%);
}
```

- 单行文本垂直居中

需要满足两个条件：

+ 元素内容是单行，并且其高度是固定不变的
+ 将其line-height设置成height的值一样

```
div{
    width: 400px;
    height: 300px;
    border: 1px solid #000;
}
span{
    line-height: 300px;
}
```

视窗单位的解决办法

让元素在视窗中居中，使用vh实现

```
.md-warp{
    position: relative;
}
.md-main{
    position: absolute;
    margin: 50vh auto 0;
    transform: translateY(-50%);
}
```

Flexbox的解决方案

完成这项工作只需要两个样式，在需要水平垂直居中的父元素中设置display:flex和在水平存执居中的元素设置margin:auto

```
.md-wrap{
    display:flex
}
.md-main{
    display:auto
}
```

Flexbox的实现文本的水平垂直居中同样很简单

```
 .md-warp{
    display:flex;
}
.md-main{
    display: flex;
  align-items: center;
  justify-content: center;
    margin: auto;
}
```

绝对垂直居中

```
.md-wrap{
    position: relative;
}
.md-main{
    position:absolute;
    top:0'
    right:0
    bottom:0;
    left:0;
    margin:auto;
}
```

最好不要使用绝对定位，因为他对整体的布局影响相当的大

## 11. 伪类是什么？有哪些？会有哪些兼容性问题？如何处理？伪类和伪元素的区别

伪类用于向某些选择器添加特殊的效果。用于通过选择器找到哪些不存在与DOM树中的信息以及不能被常规CSS选择器获取到的信息

伪类由一个冒号：开头，冒号后面是伪类的名称和包含在圆括号中的可选参数

```css
li:last-child{
    font-size:12px;  // 结构选择器
}
a:hover{
    font-weight:bold //动态选择器
}
input:disabled{
    background-color:#eee; //基于状态的选择器
}
```

在高版本浏览器中基本不会出现兼容性问题

伪元素用于向某些选择器设置特殊效果

伪元素有两个冒号::开头，然后是伪元素的名称

```css
ul:after{
    display:block;
    content:'red';
    color:red;
}
```

## 12. css预处理器知道吗？用过哪些？有什么优劣？

SASS，通过服务端处理，功能强大。解析效率高。

LESS通海哦客户端处理，使用简单，功能比SASS简单，解析效率低于SASS

主要用于解决CSS无法嵌套书写，导致模块化开发中需要书写大量重复选择器

没有变量和合理的样式复写机制，不便于模块化开发和维护

## 13. BFC块级上下文

BFC 是一个独立的渲染区域，它规定了容器里面的子元素不会影响到外面元素，外面的元素也不会影响到子元素

BFC的布局规则

+ 内部的BOX会垂直方向一个接一个地放置
+ box垂直方面的距离由margin决定。属于同一个BFC的两个相邻的BOX的margin会发生重叠
+ 每个盒子的margin box的左边与包含快border box的左边相接触。即使存在浮动也是如此
+ BFC的区域不会与float box重叠
+ BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也是如此
+ 计算BFC的高度时，浮动元素也参与计算

如何创建BFC

+  float的值不是none
+ postion的值不是static或者relative
+ display的值是inline-block，table-cell ，flex
+ overflow的值不是visible

BFC的作用

1. 利用BFC避免margin重叠
2. 清除浮动（当不给父节带你设置高度，子节点设置浮动的时候，会发生高度塌陷，这个时候我们就需要清除浮动）

## 14. 响应式布局原理

响应式布局开发一套界面，通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展示不同的布局和内容；自适应需要开发多套界面，通过检测视口分辨率，来判断当前访问的是pc端，平板，手机从而请求服务层，返回不同的页面

响应式布局的实现方案：

1. 媒体查询
2. 百分比布局
3. rem布局

![1607163271759](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1607163271759.png)



## 15. 1px边框问题

高清屏中1px边框会变粗

解决方案

1. 通过边框图片

```css
border：1px solid transparent
border-image：url('./../image/96.jpg') 2 repeat;
```

2. 使用伪类元素

```css
.setOnePex{
    position:relative;
    &::after{
        postion:absolute;
        content:'';
        background-color:#e5e5e5;
        display:block;
        width:100%;
        height:1px;
        transform:scale(1,0.5)
        top:0;
        left:0;
    }
}
```

将伪类元素设置绝对定位，并且和父元素的左上角对齐，将width设置100%，height设置为1px,然后进行Y方向缩小0.5倍

优点: 全机型兼容实现了真正的1px，而且可以圆角

缺点：暂停了after伪类元素，可能影响清除浮动





