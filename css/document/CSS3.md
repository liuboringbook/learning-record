# CSS3

## CSS3边框

通过css3，能够向矩形添加阴影，使用图片来绘制边框

+ border-radius
+ box-shadow
+ border-image

在css3中，border-radius属性用来创建圆角

```css
div{
    border:2px solid;
    border-radius:25px;
}
```

![1595811627938](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595811627938.png?raw=true)

在css3中，border-shadow用于向方框添加阴影

```css
div{
    box-shadow:10px 10px 5px #888888
}
```

![1595811701718](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595811701718.png?raw=true)

通过css3的border-image属性使用图片来创建边框

```css
div{
    border-image：url(border.png) 30 30 round;
}
```

![1595811675931](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595811675931.png?raw=true)

## CSS背景

+ background-size
+ background-origin

background-size属性规定背景图片的尺寸，能够以像素或百分比规定尺寸，如果以百分比规定尺寸，那么尺寸相对于父元素的宽度和高度

```css
div{
    background:url(bg_flower.gif);
    background-size:63px 100px;    
}
```

对于背景图片进行拉伸，使其完成填充内容区域

```css
div{
    background:url(bg-flower.gif);
    background-size:40% 100%;
}
```

![1595812262613](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595812262613.png?raw=true)

background-origin 属性规定背景图片的定位区域

背景图片可以放置于content-box,padding-box或border-box区域

![1595811675931](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595811675931.png?raw=true)

```css
div{
    background:url(bg-flower.gif);
    background-repeat:no-repeat;
    background-size:100% 100%;
    background-origin:content-box;
}
```

![1595812282236](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595812282236.png?raw=true)

css多重背景图片

css3允许为元素使用多个背景图像

```csss
body{
   background-image: url(bg-flower.gif)，url(bg-flower2.gif);
}
```

## CSS3文本效果

+ text-shadow
+ word-wrap

在CSS3中text-shadow可向文本应用阴影

能够规定水平阴影，垂直阴影，模糊距离，以及阴影的颜色：

```css
h1{
    text-shadow:5px 5px 5px #ff0000;
}
```

![1595812673282](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595812673282.png?raw=true)

单词太长的话就可能无法超出某个区域

![1595812509606](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595812509606.png?raw=true)

在CSS3中，word-wrap属性允许文本强制进行换行，即使这意味着对单词进行拆分

![1595812582779](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595812582779.png?raw=true)

允许对长单词进行拆分，并换行到下一行

```css
p{word-wrap:break-word}
```

![1595812694236](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595812694236.png?raw=true)

## CSS3 2D转换

通过CSS3转换，能够对元素进行移动，缩放，转动，拉长或拉伸

+ translate()
+ rotate()
+ scale()
+ skew()

通过translate()方法，元素从当前位置移动，根据给定的left(x坐标)和top(y坐标)位置参数

```css
div{
    transform:translate(50px,100px)
}
```

值translate(50px,100px)把元素从左侧移动50像素，从顶端移动100像素

通过rotate()方法，元素顺时针旋转给定的角度，允许负值，元素将逆时针旋转。

```css
div{
    transform:rotate(30deg);
}
```

值rotate(30deg)把元素顺时针旋转30度

通过scale()方法，元素的尺寸会增加或减少，根据给定的宽度(X轴)和高度(Y轴)参数：

```css
div{
    transform:scale(2,4);
}
```

值scale(2,4)把宽度转换为原始尺寸的2倍，把高度转换为原始高度的4倍

通过skew()方法，元素翻转给定的角度，根据给定的水平线(X轴)和垂直(Y轴)参数：

```css
div{
    transform:skew(30deg,20deg)
}
```

## CSS3 3D转换

+ rotateX()
+ rotateY()

通过rotateX()方法，元素围绕其X轴以给定的度数进行旋转

```css
div{
    transform:rotateX(120deg)
}
```

通过rotateY()方法，元素围绕其Y轴以给定的度数进行旋转

```css
div{
    transform:rotateY(130deg)
}
```

transform-origin设置旋转元素的基点位置

```css
div{
    transform:rotate(45deg);
    transform-origin:20% 40%;
}
```

![1595813572897](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595811627938.png?raw=true)

## CSS 过渡

通过css3,我们可以在不使用Flash动画或JavaScript的情况下，当元素从一种样式变换为另一种样式时为元素添加效果

CSS3过渡是元素从一种样式逐渐改变为另一种的效果

要实现这一点，必须规定两项内容：

+ 规定你希望把效果添加到那个元素属性上
+ 规定效果的时长

应用于宽度属性的过渡效果，时长为2秒

```css
div{
    transition:width 2s;
}
```

如果时长未规定，则不会有过渡效果，因为默认值是0

效果开始于指定的CSS属性改变值时，CSS属性改变的典型时间是鼠标指针位于元素上时：

```css
div:hover{
    width:300px;
}
```

当指针移除元素时，它会逐渐变会原来的样式

如需要多个样式添加过渡效果，请添加多个属性，由逗号隔开

向宽度，高度和转换添加过渡效果：

```css
div{
    transition:width 2s,height 2s,transfrom 2s;
}
```

![1595814571556](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595814571556.png?raw=true)

```css
div{
    transition-property:width;
    transition-duration：1s;
    transition-timing-function:linear;
    transition-delay：2s
}
```

## CSS3动画

如需在CSS3中创建动画，您需要学习@keyframes规则。

@keyframes规则用于创建动画。在keyframes中规定某项CSS样式，就能创建由当前样式逐渐改成新样式的动画效果。

```css
@keyframes myfirst
{
    from{
        background:red;
    }
    to{
        background:yellow;
    }
}
```

当在@keyframes中创建动画时，请把它捆绑到某个选择器，否则不会产生动画效果。

通过规定至少以下两项CSS3动画属性，即可将动画绑定到选择器：

+ 规定动画的名称
+ 规定动画的时长

```css
div{
    animation:myfirst 5s;
}
```

动画是使元素从一种样式逐渐变化为另一种样式的效果。

可以改变任意多的样式任意多的次数

用百分比来规定变化发生的时间，或者关键词from和to等同0%和100%

0%是动画的开始，100%是动画的完成

```css
@keyframes myfirst{
    0%{
        background:red;
    }
    25%{
        background:yellow;
    }
    50%{
        background:blue;
    }
    100%{
        background:green;
    }
}
```

![1595815575139](https://github.com/liuboringbook/learning-record/blob/master/css/resource/1595815575139.png?raw=true)

