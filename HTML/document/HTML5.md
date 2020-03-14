# HTML5

## HTML5简介

### 新特性

+ 用于绘画的canvas元素
+ 用于媒介回放的video和audio元素
+ 对于本地离线存储的更好支持
+ 新的特俗内容元素，比如article,footer,header,nav,section
+ 新的表单控件，比如calendar，date，time，email，url，search

### HTML5声明

`<!doctype> `声明必须位于HTML5文档的第一行

```html
<!DOCTYPE html>
```

### HTML5的改进

+ 新元素
+ 新属性
+ 完全支持CSS3
+ Video和Audio
+ 2D/3D制图
+ 本地存储
+ 本地SQL数据
+ web应用

### HTML5图形

+ 使用<canvas>元素
+ 使用内联SVG
+ 使用CSS3 2D转换，CSS3 3D转换

### 语义元素

![1584201544248](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1584201544248.png)

### HTML5 浏览器支持

#### 将HTML5元素定义为块元素

HTML5新增了8个新的HTML语义元素，所以这些元素都是块级元素为了让旧版本浏览器正确显示这些元素，你可以设置CSS的display属性为`block`

```css
header, section, footer, aside, nav, main, article, figure {
    display: block;
}
```

#### IE 浏览器问题

IE8及以更早的IE版本浏览器不支持HTML5元素，针对IE浏览器html5shiv是比较好的解决方案。htmlshiv主要是解决HTML5提出的新元素不被IE6-IE8识别，这些新元素不能作为父节点包裹子元素，并且不能应用CSS样式

```html
//如果浏览器版本低于IE9,就引入html5shiv
<!--[if lt IE 9]>
  <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>
<![endif]-->
```

### HTML5拖放(Drag和Drop)

拖放是一种常见的特性，即抓取对象以后拖到另一个位置，在HTML5中拖放是标准的一部分，任何元素都能够拖放

#### 设置元素为可拖放

首先，为了使元素可拖放，把draggable属性设置为true

```html
<img draggable="true">
```

拖放什么-- ondragstart 和setData()

#### dataTransfer.setData()方法设置被拖拽数据的数据类型和值：

```javascript
function drag(ev){
    ev.dataTransfer.setData("Text",ev.target.id);
}
```

Text是一个DOMString表示要添加到drag object的拖动数据的类型，值是可拖动元素的id("drag1");

#### 放到何处 -ondragover

ondragover事件规定在何处放置被拖放的数据。

默认地无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。

```javascript
event.preventDefault()
```

#### 进行放置

当放置被托数据时，会发生drop

在上述的例子中ondrop属性调用了一个函数，drop(event)

```javascript
function(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}
```

代码解释：

+ 调用preventDefault()来避免浏览器对数据的默认处理(drop事件的默认行为是以链式形式打开)
+ 通过dataTransfer.getData("Text")方法获得被拖的数据。该方法将返回在setData()方法中设置为相同类型的任何数据
+ 被拖拽数据是被拖拽元素的id("drag1")
+ 把被拖拽元素追加到放置元素(目标元素)中

## HTML5Geolocation地理定位

### HTML5 使用地理定位

```javascript
var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML="该浏览器不支持获取地理位置。";
    }
}
 
function showPosition(position) {
    x.innerHTML="纬度: " + position.coords.latitude +
    "<br>经度: " + position.coords.longitude;   
}
```

实例解析：

+ 检测是否支持地址定位
+ 如果支持，则运行getCurrentPosition()。如果不支持，则向用户显示一段消息

+ 如果getCurrentPosition()运行成功，则向参数showPosition中规定的函数返回一个coordinates对象

+ showPosition()函数获得并显示经度和纬度

### 处理错误和拒绝

getCurrentPostion()方法的第二个参数用于处理错误，它规定当获取用户位置失败时，运行的函数

```javascript
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML="用户拒绝对获取地理位置的请求。"
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML="位置信息是不可用的。"
            break;
        case error.TIMEOUT:
            x.innerHTML="请求用户地理位置超时。"
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML="未知错误。"
            break;
    }
}
```

getCurrentPostion()方法- 返回数据

![1584206051149](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1584206051149.png)

