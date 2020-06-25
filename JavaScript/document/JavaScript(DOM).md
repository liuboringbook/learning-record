# JavaScript(DOM)

## DOM简介

当网页被加载时，浏览器会创建页面的文档对象模型(Document Object Model)

HTML DOM 定义了所有HTML元素的对象和属性，以及访问他们的方法

换而言之，HTML DOM是关于如何获取，修改，添加或删除HTML元素的标准

## DOM节点

根据w3c的HTML DOM标准，HTML文档中的所有内容都是节点：

+ 整个文档是一个文档节点
+ 每个HTML元素是元素节点
+ HTML元素内的文本是文本节点
+ 每个HTML属性是属性节点
+ 注释是注释节点

HTML DOM将HTML文档视为树结构。这种结构被称为节点树:

![1584984329581.png](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1584984329581.png?raw=true)

通过HTML DOM树中的所有节点均可以通过JavaScript进行访问，所以HTML元素(节点)均可被修改，也可以创建或删除节点

### 节点父，子和兄弟

节点树中的节点彼此拥有层级关系

父，子和兄弟等术语用于描述这些关系。父节点拥有子节点，同级的子节点被称为兄弟节点

+ 在节点数中，顶端节点被称为根(root)
+ 每个节点都有父节点，除了根(它没有父节点)
+ 一个节点可拥有任意数量的子
+ 兄弟节点是拥有相同节点的节点

![1584984653808](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1584984653808.png?raw=true)

## DOM方法

可以通过JavaScript对HTML DOM进行访问

所有HTML元素被定义为对象，而编程接口则是对象方法和对象属性

方法是能够执行的动作(比如添加或修改元素)

属性是能够获取或设置的值(比如节点的名称或内容)

### HTML DOM对象 - 方法和属性

一些常用的DOM对象方法

| 方法                     | 描述                                                        |
| ------------------------ | ----------------------------------------------------------- |
| getElementById()         | 返回带有指定ID的元素                                        |
| getElementsByTagName()   | 返回包含带有指定标签名称的所有元素的节点列表(集合/节点数组) |
| getElementsByClassName() | 返回包含带有指定类名的所有元素的节点列表                    |
| appendChild()            | 把新的子节点添加到指定节点                                  |
| removeChild()            | 删除子节点                                                  |
| repalceChild()           | 替换子节点                                                  |
| insertBefore()           | 在指定的子节点前面插入新的子节点                            |
| createAttribute()        | 创建属性节点                                                |
| createElement()          | 创建元素节点                                                |
| createTextNode()         | 创建文本节点                                                |
| getAttribute()           | 返回指定的属性值                                            |
| setAttribute()           | 把指定属性设置或修改为指定的值                              |

一些常用的HTML DOM属性：

+ innerHTML - 节点(元素)的文本值
+ parentNode - 节点(元素)的父节点
+ childNodes -节点(元素)的子节点
+ attributes  - 节点(元素)的属性节点

## DOM属性

### innerHTML属性

获取元素内容的最简单的方法式使用innerHTML属性

innerHTML属性对于获取或替换HTML元素的内容很有用

```html
<html>
<body>

<p id="intro">Hello World!</p>

<script>
var txt=document.getElementById("intro").innerHTML;
document.write(txt);
</script>

</body>
</html>
```

### nodeName属性

nodeName属性规定节点的名称

+ nodeName是只读的
+ 元素节点的nodeName与标签名相同
+ 属性节点的nodeName与属性名相同
+ 文本节点的nodeName始终是#text
+ 文档节点的nodeName始终是#document

### nodeValue属性

nodeValue属性规定节点的值

+ 元素节点的nodeValue是undefined或null
+ 文本节点的nodeValue是文本本身
+ 属性节点的nodeValue是属性值

### nodeType属性

nodeType属性返回节点的类型。nodeType是只读的

![1584986017503](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1584986017503.png?raw=true)

## DOM访问

访问HTML元素等同于访问节点

+ 通过使用getElementById()方法
+ 通过使用getElementsByTagName()方法
+ 通过使用getElementsByClassName()方法

## DOM修改

修改HTML DOM以为着许多不同的方面：

+ 改变HTML内容
+ 改变CSS样式
+ 改变HTML属性
+ 创建新的HTML元素
+ 删除已有的HTML元素
+ 改变事件(处理程序)

### 创建HTML内容

改变元素内容的最简单的方法是使用innerHTML属性

```html
<html>
    <body>
        <p id="p1">
            Hello world
        </p>
        <script>
        document.getElementById("p1").innerHTML = "new Text!"
        </script>
    </body>
</html>
```

### 改变HTML样式

通过HTML DOM，你能够访问HTML元素的样式对象。

```html
<html>

<body>
<p id="p2">Hello world!</p>

<script>
document.getElementById("p2").style.color="blue";
</script>

</body>
</html>
```

### 创建新的HTML元素

如需要向HTML DOM添加新元素，您首先必须创建该元素(元素节点),然后把它追加到已有的元素上

```html
<div id="d1">
    <p id="p1">This is a p</p>
    <p id="p2">This is another p</p>	
</div>
<script>
   var para = document.createElement("p");
   var node = document.createTextNode("This is new.")
   para.appendChild(node);
   
   var element =document.getElementById("d1")
   element.appendChild(para)
</script>
```

### 使用事件

HTML DOM允许您在事件发生时执行代码。

当HTML元素"有事情发生"时，浏览器就会生成事件；

+ 在元素上点击
+ 加载页面
+ 改变输入字段

```html
<html>
<body>

<input type="button" onclick="document.body.style.backgroundColor='lavender';"
value="Change background color" />

</body>
</html>
```

```html
<html>
<body>

<script>
function ChangeBackground()
{
document.body.style.backgroundColor="lavender";
}
</script>

<input type="button" onclick="ChangeBackground()"
value="Change background color" />

</body>
</html>
```

### 创建新的 HTML 元素 - insertBefore()

上一个例子中的 appendChild() 方法，将新元素作为父元素的最后一个子元素进行添加。

如果不希望如此，您可以使用 insertBefore() 方法：

```html
<div id="div1">
<p id="p1">This is a paragraph.</p>
<p id="p2">This is another paragraph.</p>
</div>

<script>
var para=document.createElement("p");
var node=document.createTextNode("This is new.");
para.appendChild(node);

var element=document.getElementById("div1");
var child=document.getElementById("p1");
element.insertBefore(para,child);
</script>
```

### 删除已有的HTML元素

如需删除HTML元素，您必须清楚该元素的父元素:

```javascript
<div id="div1">
<p id="p1">This is a paragraph.</p>
<p id="p2">This is another paragraph.</p>
</div>
<script>
var parent=document.getElementById("div1");
var child=document.getElementById("p1");
parent.removeChild(child);
</script>
```

### 替换HTML元素

如需替换HTML DOM中的元素，请使用replaceChild()方法：

```html
<div id="div1">
<p id="p1">This is a paragraph.</p>
<p id="p2">This is another paragraph.</p>
</div>

<script>
var para=document.createElement("p");
var node=document.createTextNode("This is new.");
para.appendChild(node);

var parent=document.getElementById("div1");
var child=document.getElementById("p1");
parent.replaceChild(para,child);
</script>
```

## DOM事件

HTML  DOM使JavaScript有能力对HTML事件作出反应

### 对事件作出反应

HTML 事件的例子：

- 当用户点击鼠标时
- 当网页已加载时
- 当图像已加载时
- 当鼠标移动到元素上时
- 当输入字段被改变时
- 当提交 HTML 表单时
- 当用户触发按键时

### 使用HTML DOM分配事件

HTML DOM 允许您使用JavaScript来向HTML元素分配事件

```html
<script>
    document.getElmentById("mybtn").onclick =function(){displayDate()}
</script>    
```

### onload 和onunload事件

onload和onunload事件会在用户进入或离开页面时被触发

onload事件可用于检测访问者的浏览器类型和浏览器版本，并基于这些信息来加载网页的正确版本

onload和onunload事件可用于处理cookie

### onchange事件

onchange 事件常结合对输入字段的验证来使用。

```html
<input type="text" id="fname" onchange="upperCase()">
```

### onmouseover 和 onmouseout 事件

onmouseover和onmouseout事件可用于在用户的鼠标移至HTML元素上方或移除元素时触发函数

```html
<div onmouseover="mOver(this)" onmouseout="mOut(this)">Mouse Over Me</div>
```

### onmousedown,onmouseup以及onclick事件

onmousedown, onmouseup 以及 onclick 构成了鼠标点击事件的所有部分。首先当点击鼠标按钮时，会触发 onmousedown 事件，当释放鼠标按钮时，会触发 onmouseup 事件，最后，当完成鼠标点击时，会触发 onclick 事件。

## EventListener

### addEventListener()方法

在用户点击按钮时触发监听事件

```javascript
document.getElemntById('mybtn').addEventListener("click",displayDate)
```

addEventListener()方法用于向指定元素添加事件句柄

addEventListener()方法添加的事件句柄不会覆盖已存在的事件句柄

你可以向一个元素添加多个事件句柄

你可以向同一个元素添加多个同类型的事件句柄，如两个"click"事件

你可以向任何DOM对象添加事件监听，不仅仅是HTML元素。如window对象

addEventListener()方法可以更简单的控制事件(冒泡与捕获)

当你使用addEventListener()方法时，JavaScript从HTML标记中分离出来，可读性更强，在没有控制HTML标记时也可以添加事件监听

你可以使用removeEventListener()方法来移除事件的监听

### 语法

```javascript
element.addEventListener(event,function,useCapture)
```

第一个参数是事件类型(如“click”或“mousedown”)

第二个参数是事件触发后调用的函数

第三个参数是布尔值用于描述事件是冒泡还是捕获，该参数是可选的

默认值是false，即冒泡传递，当值为true时，事件使用捕获传递

### 事件冒泡或事件捕获

事件传递有两种方式: 冒泡与捕获

事件传递定义了元素事件触发的顺序，如果你将`<p>`元素插入到`<div>`元素中，用户点击`<p>`元素哪个元素的"click"事件先触发呢？

在冒泡中，内部元素的事件会被先触发，然后再触发外部元素，即: `<p>`元素的点击事件先触发，然后会触发`<div>`元素的点击事件

在捕获中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即：`<div>`元素的点击事件先触发，然后再触发`<p>`元素的点击事件。

### 跨浏览器解决方法：

```javascript
var x = document.getElementById("myBtn");
if (x.addEventListener) {                    // 所有主流浏览器，除了 IE 8 及更早版本
    x.addEventListener("click", myFunction);
} else if (x.attachEvent) {                  // IE 8 及更早版本
    x.attachEvent("onclick", myFunction);
}
```

## DOM导航

### HTML DOM节点列表

getElementsByTagName()方法返回节点列表。节点列表是一个节点数组。

下面的代码选取文档中的所有`<p>`节点

实例 

```javascript
var x = document.getElementsByTagName(“p”);
```

可以通过下标好访问这些节点

```]
y =x[1]
```

### HTML DOM 节点列表长度

length属性定义节点列表中节点的数量

你可以使用length属性来循环节点列表：

```javascript
x=document.getElementsByTagName("p");

for (i=0;i<x.length;i++)
{
document.write(x[i].innerHTML);
document.write("<br />");
}
```

### 导航节点关系

你可以使用三个节点属性：parentNode ，firstChild 以及lastChild,在文档结构中进行导航

```javascript
<html>
<body>

<p>Hello World!</p>
<div>
  <p>DOM 很有用!</p>
  <p>本例演示节点关系。</p>
</div>

</body>
</html>
```

+ 首个`<p>`元素是`<body>`的首歌子元素(firstChild)
+ `<div>`元素是`<body>`元素的最后一个子元素(lastChild)
+ `<body>` 元素是首个`<p>`元素和 `<div>`元素的父节点

### DOM根节点

这里两个特殊的属性，可以访问全部文档：

+ document.documentElement  全部文档
+ document.body 文档的主体

```html
<html>
<body>

<p>Hello World!</p>
<div>
<p>DOM 很有用!</p>
<p>本例演示 <b>document.body</b> 属性。</p>
</div>

<script>
alert(document.body.innerHTML);
</script>

</body>
</html>
```

