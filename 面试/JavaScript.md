1. 谈谈对于闭包的理解

闭包就是有权访问另一个函数作用域中的变量的函数，MDN上面：闭包是一种特殊的对象，它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时再作用域中的任何局部变量组成。

创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量，利用闭包可以延长作用域链，缓存数据

- 闭包的特性：
  + 函数内再嵌套函数
  + 内部函数可以引用外层的参数和变量
  + 参数和变量不会被垃圾回收机制回收

- 使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

```
  var getNum;
  function getCounter(){
    var n=1;
    var inner = function(){
        return n++;
    }
    return inner;
  }
  getNum = getCounter();
  console.log(getNum()); //1
  console.loga(getNum()); //2
```

2.说说你对作用域链的理解

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象window，这样有多个执行上下文的变量对象构成的链条就叫做作用域链

- 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到window对象即被终止，作用域链向下访问变量是不被允许的
- 简单的说，作用域就是变量域函数的可访问访问，即作用域控制着变量域函数的可见性和生命周期

3. 请解释一下什么是事件代理

- 事件代理，又称之为事件委托。是JavaScript中常用绑定事件的常用技巧。"事件代理"即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理代理的原理是DOM元素的事件冒泡。使用事件代理的好处是可以提高性能

- 可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件

- 可以实现当新增子对象时无需再次对其绑定

4. 事件模型

- 冒泡型事件: 当你使用事件冒泡时，子级元素先触发，父级元素后触发

- 捕获型事件: 当你使用事件捕获时，父级元素先触发，子级元素后触发

- DOM事件流： 同时支持两种事件模型： 捕获型事件和冒泡型事件

- 阻止冒泡：在w3c中，使用stopPropagation()方法，在IE下这只cancelBubble = true 

- 阻止捕获: 阻止事件的默认行为，例如click -<a>后跳转。在w3c中使用 PreventDefault()方法，在IE下设置window.event.returnValue = false

5. 什么是面向对象编程及面向过程编程，他们的异同和优缺点

- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个一次调用就可以了

- 面向对象是把构成问题事物分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描述某个事物在整个解决问题的步骤中的行为,向对象是以功能划分问题，而不是步骤

- 面向对象的基本思想是使用对象，类，继承，封装等基本盖面来进行程序设计

优点：

+ 易维护，采用面向对象思想设计的结构，可读性高，由于继承的存在，即使改变需求，那么维护也只是在局部模块，所以维护起来是非诚方便和较低成本的

+ 易扩展

+ 缩短了开发周期

+ 开发工作的重用性，继承性高，降低重复工作量

+ 缩短了开发周期

6. 讲讲事件监听

绑定事件的另中方法就是用addEventListener()和attachEvent()来绑定事件监听函数

语法：

`element.addEventListener(event,function useCapture)`

event: (必需)事件名,支持所有DOM事件
function: (必需)指定要事件触发时执行的函数
useCapture: (可选)执行时间是否在捕获或冒泡阶段执行。true，捕获。false，冒泡，默认是false

事件监听的优点：

- 可以绑定多个事件，常规的事件绑定只执行最后绑定的事件，但是使用事件监听，两个事件都执行

```
  <input type="button" value="click me" id="btn3">
  <input type="button" value="click me" id="btn4">
  <script>
     var btn3 = document.getElementById("btn3");
     btn3.onclick = function(){
        alert("hello 1"); //不执行
     }
     btn3.onclick = function(){
        alert("hello 2")；//执行
     }
     btn4.addEventListener('click',hello3);
     btn4.addEventListener('click',hello4);

     function hello3(){
        alert("hello 3")//执行
     }
     function hello4(){
        alert("hello 4")//执行
     }
  </script>
```

- 可以解除相应的绑定
```
<input type="button" value="click me" id="btn5">
<script>
var btn5 = document.getElementById("btn5");
btn5.addEventListener("click",hello1);//执行了
btn5.addEventListener("click",hello2);//不执行
btn5.removeEventListener("click",hello2);
function hello1(){
    alert("hello 1");
}
function hello2(){
    alert("hello 2");
}
</script>
```
