`1. 谈谈对于闭包的理解

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

7. 介绍JS的基本数据类型

Undefined，Null,Boolean,Number,String,ECMAscript2015新增了Symbol(创建后独一无二且不可变的数据类型)
   
8. 介绍js有哪些内置对象

Object是JavaScript中所有对象的父对象

数据封装类对象：OBject，Array，Boolean，Number和String
其他对象： Function,Arguments,Math,Date,RegExp,Error

9. JavaScript原型，原型链，有什么特点？

每个独享都会在其内部初始化一个属性，就是prototype(原型)，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就是去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去，也就是我们平说的原型链的该概念。关系：instance.constuctor.prototype = instance.__proto__

原型链：当我们需要一属性的时候，JavaScript引擎会先看当前对象是够有这个属性，如果没有的话，就会查找它的prototype独享时候有这个属性，如此递推下去，一直检索到Object内建对象

10. javaScript有几种类型，你能花一下他们的内存图吗？

栈：基本数据类型(Undefined，Null，Boolean，Number,String)
堆：引用数据类型(对象，数组和函数)

两种类型的区别是：存储位置不同：

原始数据类型直接存储在栈中的简单数据段，占据空间小，大小固定，属于被频繁使用数据，所以放入栈中存储

引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体

![内存图](https://camo.githubusercontent.com/d1947e624a0444d1032a85800013df487adc5550/687474703a2f2f7777772e77337363686f6f6c2e636f6d2e636e2f692f63745f6a735f76616c75652e676966)  

11. JavaScript如何实现继承

## 构造函数继承

- 构造继承

通过apply和call方法，将父对象的构造函数绑定在子对象上

```
  function Person(name,age){
    this.name =name;
    this.age =age;
  }
  
  function Child(name,age,sex){
    Person.call(this,name,age);
    this.sex =sex;
  }

  Person.prototype.sayHi = function(){
    console.log('hello')
  }

  var p1 =new Child('小明',18,"男");
  console.log(p1.name,p1.age,p1.sex)//'小明',18,"男"
  p1.sayHi();//报错
```

构造函数继承的方式可以继承到构造函数上的属性和方法，但是原型prototype下的属性和方法无法继承

- 原型继承

通过改变子函数原型指向继而实现继承父函数下的属性和方法

```
  function Person(name,age){
    this.name =name;
    this.age =age;
  }
  Person.prototype.sayHi = function(){
     console.log('hi') 
  }
  function Student(score){
    this.score =score
  }
  Student.prototype = new Person('小明',10)

  var stu1 = new Student(100);
  var stu2 =new Student(80);

  console.log(stu1.score,stu1.name)//100 "小明"
  console.log(stu2.score,stu2.name)//80 "小明"
  stu1.sayHi();//hi
  stu2.sayHi();//hi
```

原型继承可以继承原型上的方法和属性，但构造函数上的属性和方法无法被修改

- 组合继承

通过原型继承加上构造函数继承，完美实现继承的方案

```
 function Person(name,age){
    this.name =name
    this.age = age
 }

 Person.prototype.sayHi = function(){

  console.log('hi')
 }

 function Student(name,age,socre){
  Person.call(this,name,age);
  this.score = score
 }
 Student.prototype = new Person();

 Student.prototype.eat = function(){
  console.log('吃东西')
 }
 var stu = new Student("小明",20,"100")
 console.log(stu.name,stu.age,stu.score)//小明 20 100
 stu.sayHi();//hi
 stu.eat();//吃东西

```

- 拷贝继承 

拷贝继承就是把一个对象中的属性或者方法直接复制到另一个对象中

```
  function Animal(){}
  Animal.prototype.species = "动物"

  function extend2(child,parent){
    var p = Parent.prototype
    var c = child.prototype;
    for(var i in p){
      c[i]=p[i]
    }
    c.uber =p ;
  }
  extend2(Cat,Animal);
  var cat1 = new Cat("大毛","黄色")
  console.log(cat1.species);//动物
```

通常构造函数使用组合继承的方式实现继承，是最完美的实现


## 非构造函数继承

- 浅拷贝

  浅拷贝就是把相当于把一个对象中的内容复制一份给另一个对象，但是这种事是复制复制不完整的，只能复制对象下的方法和属性，对象下的对象的方法和属性无法复制

  ```
    var obj1 = {
      age:10,
      sex:"男",
      car:["奔驰","宝马","特斯拉","奥迪"]
    }
    var obj2 = {};

    function extend(a,b){
      for(var key in a){
        b[key] = a[key];
      }
    }
    extend(obj1,obj2);
    console.log(obj1);
    console.log(onj2);
  ```


- 深拷贝 

深拷贝，就是能够实现真正意义上的数组和对象的拷贝，需要递归调用浅拷贝

```
  function deepCopy(p,c){
    var c =c ||{};
    for(var i in p){
      if(typeof p[i]==='object'){
        c[i] == (p[i].constructor === Array) ?[]:{}
        deepCopy(p[i],c[i])
      }else{
        c[i] = p[i]
      }
    }
    return c;
  }

  var Doctor = deep(Chinese)
  Chinese.birthPlaces = ['北京','上海','香港'];

　　Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门

　　alert(Chinese.birthPlaces); //北京, 上海, 香港
```

12. commonjs，AMD和CMD

一个模块是能够实现特定功能的文件，有了模块化就可以方便使用别人的代码，想要什么功能就能加载什么模块

- commonjs: 开始于服务器端的模块化，同步定义的模块，每个模块都是一个单独的作用域，模块输出，modules.exports,模块加载require()引入模块
- AMD: 中文名异步模块定义的意思

requireJS实现了AMD规范，朱啊哟用于解决两个问题
  1. 多个文件有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
  2. 2.加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应的事件越长

语法：requireJS定义了一个函数define，它是全局变量，用来定义模块

requireJS的例子：

```
//定义模块
  define(['dependency'],function(){
    var name = 'Byron';
    function printName(){
      console.log(name);
    }
    return {
      printName:printName
    };
    });
    //加载模块
    require(['myModule'],function(my){
      my.printName();
      })
```

requirejs定义了一个函数define，它是全局变量，用来定义模块

`define(id? dependencies,factory)`

在页面上的使用模块加载函数：

`define([dependencies],factory)`

总结AMD规范：require()函数在架子啊依赖函数的时候是异步加载，这样就蓝旗不会失去响应，它制定的回调函数，只有前面的模块加载成功，才会去执行
因为网页在加载js的时候会停止渲染，因此我们可以通过异步的方式去加载js。而如果需要依赖默写，也是异步化去依赖，依赖后再执行某些方法

13. 如何实现一个私有变量，用getName可以访问，不能直接访问

- 通过defineProperty来实现

```
  obj ={
    name:mark,
    getName: function(){
      return this.name
    }
  }
  object.defineProperty(obj,"name"{
      // 不可枚举不可配置
      configurable:false,
      enumerable:false
    })
```

- 通过构造函数的创建形式
```
  function Product(){
    var name = 'mark';
    this.getName = function(){
      return name
    }
  }
  var obj =new Project(); 
```




14. ==和===，以及Object.is的区别

- == 主要存在： 强制转换number,null== undefined

```
  " " == 0; //true 
  "0" == 0;//true
  123 == "123"; //true
  null == undefined //true 
```

- Object.is() 其被称为同值相等，是比较运算符的一份子
- 在检查两个操作是否相等时，用到了以下规则

规则1： 操作值均未定义(undefined)

```
  let a
  let b
  object.is(a,b);//true
```

规则2：操作数都是相同长度和顺序的字符串

```
  Object.is('Comparison Operators','Comparison Operators'); //true
  Object.is('Comparison Operators','Comparison operators');// false ，严格区分大小写
```

规则3：操作值均未null

```
 Object.is(null,null);//true
 Object.is('null',null);//false
```

规则4： 操作值为对象且引用地址相同

```
 let a = {"name":"Arwa"}
 let b = a
 Object.is(a,b);//true
 Object.is({"name":"Arwa"},{"name":"Arwa"});//fasle
 Object.is(window,window); //true .均引用了同一个全局变量
```

规则5：操作值均未非0和非NaN数

`Object.is(1,1) //true`

规则6：操作值都是+0或-0

```
Object.is(0,0);//true
OBject.is(0.-0)//false,这点就不同于==和===
```

规则7： 操作数为NaN

```
Object.is(NaN,NaN);//true,这点也和== 和=== 不同
Object.is(NaN,0/0);//true
```
当选择比较特殊的字符的时候，如NaN，0，+0，-0推荐使用Object.is()


15. 解释一下防抖和节流

## 防抖

防抖技术即是可以把多个顺序地调用合并一次，也就是在一定时间内，规定时间触发的次数。主要是针对高频度触发事件问题(例如页面scroll，监听用户输入等)


```
 //简单的防抖函数
 function debounce(func,wait,immediate){
  //定时器变量
  var timeout;
  return function(){
    //每次触发scroll handler 时先清除定时器
    clearTimeout(timeout);
    //指定xx ms 后触发真正想进行的操作handler
    timeout = setimeout(func,wait)
  };
 };
 //实际想绑定在scroll事件上的handler
function realfunc(){
  console.log("success")
}
//采用防抖技术
window.addEventListener('scroll',debounce(realFunc,500));
//没采用防抖动
window.addEventListener('scroll',realFunc)
```

大概的功能就是如果500ms内没有连续触发scroll事件，那么才会真正想在scroll事件中触发的函数

## 节流

防抖函数确实不错，但是也存在问题，譬如图片的懒加载，我希望在下滑过程中图片不断的被加载出来，而不是只有当我停止下滑时候，图片才被加载出来，又或者下滑时候的数据的ajax请求加载也是同理。

这个事就我们希望即使页面不断被滚动，但是滚动handler也可以以一定频率被触发，这列场景，就需要用到另一种技巧，成为节流函数

节流函数，只允许一个函数在X秒内执行一次

与防抖相比，节流函数最主要的不同在于它保证在X毫秒内至少执行一次，我们希望触发的事件handler

```
  //简单的节流函数
  function throttler(func,wait,mustRun){
    var timeout,
    startTime =new Date();

    return function(){
      var context = this.
      args = arguments,
      curTime  =new Date();

      clearTimeout(timeout);
      //如果达到了规定的触发时间间隔，触发handler
      if(curtime- startTime >=mustRun){
        func.apply(context,args);
        startTime = curTime;
        //没有达到触发间隔，重新设定定时器
      }else{
        timeout = setTimeout(func,wait);
      }
    };
  };
  //实际想绑定在scroll事件上的handler
  function realFunc(){
    console.log('success');
  }
  //采用了节流函数
  window.addEventListen('scroll',throttle(realFunc,500,1000)); 
```

大概功能就是如果在一段时间内scroll触发的时间间隔短于500ms。那么能保证事件我们希望调用的handle至少在1000ms内触发一次。


