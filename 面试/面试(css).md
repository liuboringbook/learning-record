#  面试

## 面试技巧(一面/二面)

+ 准备要充分
+ 知识要系统
+ 沟通要简洁
+ 内心要诚实
+ 态度要谦虚
+ 回答要灵活

![1583661362675](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583661362675.png)



## 页面布局

![1583661554919](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583661554919.png)

1. 浮动

```html
    <style>
        html *{
            padding:0;
            margin:0;
        }
        .layout article div{
            min-height:200px
        }
        .layout.float .left{
             float:left;
             width: 300px;
             background: red;
         }
        .layout.float .right{
            float:right;
            width: 300px;
            background: yellow;
        }
        .layout.float .center{
            background: green
        }
    </style>
</head>
<body>
   <section class="layout float">
       <article class="left-right-center">
           <div class="left"></div>

           <div class="right"></div>
           <div class="center">
               <h1>浮动解决方案</h1>
               1.这是三栏布局的中间部分
           </div>
       </article>
   </section>
</body>
```

2. 定位

```html
    <style>
        html *{
            padding:0;
            margin:0;
        }
        .layout .left-right-center{
            position: relative;
        }
        article div{
            min-height:200px;
        }
        .layout.absolute .left{
            position: absolute;
            left:0;
            width:300px;
            background: red;
        }
        .layout.absolute .center{
            position: absolute;
            left:300px;
            right:300px;
            background: yellow;
        }
        .layout.absolute .right{
            position: absolute;
            right:0;
            width:300px;
            background: blue;
        }
    </style>
</head>
<body>
<section class="layout absolute">
    <article class="left-right-center">
        <div class="left"></div>
        <div class="center">
            <h1>浮动解决方案</h1>
            1.这是三栏布局的中间部分
        </div>
        <div class="right"></div>
    </article>
</section>
</body>
```

3. flex

```html
    <style>
        html *{
            padding:0;
            margin:0;
        }
        .layout article div{
            min-height:200px
        }
        .layout .flexbox{
            display: flex;

        }
        .layout .flexbox .left{
            width:300px;
            background: red;
        }
        .layout .flexbox .center{
            flex:1;
            background:yellow;
        }
        .layout .flexbox .right{
            width:300px;
            background: blue;
        }

    </style>
</head>
<body>
<section class="layout ">
    <article class="flexbox">
        <div class="left"></div>
        <div class="center">
            <h1>浮动解决方案</h1>
            1.这是三栏布局的中间部分
        </div>
        <div class="right"></div>
    </article>
</section>
</body>
```

4. table

```html
    <style>
        html *{
            padding:0;
            margin:0;
        }
        .layout article div{
            height:200px;
        }
        .layout .left-center-right{
            width:100%;
            display: table;
        }
        .layout .left-center-right>div{
            display: table-cell;
        }
        .layout.table .left{
            width:300px;
            background: red;
        }
        .layout.table .center{
            background: yellow;
        }
        .layout.table .right{
            width:300px;
            background: blue;
        }
    </style>
</head>
<body>
<section class="layout table">
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">
            <h1>浮动解决方案</h1>
            1.这是三栏布局的中间部分
        </div>
        <div class="right"></div>
    </article>
</section>
</body>
```

5. grid

```html
    <style>
        html *{
            padding:0;
            margin:0;
        }
        .layout article div{
            min-height:200px
        }
        .layout.grid .left-center-right{
            display: grid;
            width:100%;
            grid-template-rows: 200px;
            grid-template-columns: 300px auto 300px;
        }
        .layout.grid .left{
            background: red;
        }
        .layout.grid .center{
            background: yellow;
        }
        .layout.grid .right{
            background: blue;
        }
    </style>
</head>
<body>
<section class="layout grid">
    <article class="left-center-right">
        <div class="left"></div>
        <div class="center">
            <h1>浮动解决方案</h1>
            1.这是三栏布局的中间部分
        </div>
        <div class="right"></div>
    </article>
</section>
</body>
```

延伸

1. 这五种方法的优缺点？
2. 他们之间的比较？
3. 假设把高度去掉，哪个方案不再适用了?
4. 他们的兼容性?

浮动需要清浮动，脱离文档流，但是兼容性好

定位：快捷，所有元素都脱离文档流

flex：布局比较完美，基本都能适用，但不直接IE8

table：兼容性良好，可以兼容Ie8

grid：兼容性不太良好，可以适用在非常多的适用场景

去掉高度：浮动不能使用，定位不能使用，grid不能使用

table和flex可以使用

## 页面布局小结

+ 语义化掌握到位
+ 页面布局理解深刻
+ CSS基础知识扎实
+ 思维灵活且积极向上
+ 代码书写规范

## CSS盒模型

题目：谈谈你对CSS盒模型的认识

![1583687300509](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583687300509.png)

标准模型

![1583687438301](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583687438301.png)

IE盒模型

![1583687396797](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583687396797.png)

CSS盒模型：

css如何设置这两种模型

```css
box-sizing:content-box //标准盒模型
box-sizing:border-box  //IE盒模型
```

JS如何设置盒模型对应的宽和高

```javascript
dom.style.width/height //不会获取外嵌样式宽和高
dom.currentStyle.width/height //只支持IE
widnow.getComputedStyle(dom).width/height //支持IE，火狐，chrome
dom.getBoundingClientRect().width/height
```

示例图(根据盒模型解释边距重叠)

![1583688012730](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583688012730.png)

### BFC(边距重叠解决方案)

#### BFC的基本概念

BFC是块级格式化上下文，是用于布局块级盒子的一块渲染区域，BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，外面的元素也不会影响到子元素。

### BFC的原理

 

如何创建BFC

BFC的使用场景

