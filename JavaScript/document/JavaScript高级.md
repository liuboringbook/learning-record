



# JavaScript高级

## ES6class篇

### 目标

+ 能够说出什么是面向对象
+ 能够说出类和对象的关系
+ 能够使用class创建自定义类
+ 能够说出什么是继承

### 面向对象介绍

+ 面向过程(POP)

面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的一次调用就可以了

举个例子：将大象装进冰箱，面过过程

![1590202281256](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590202281256.png?raw=true)

面向过程，就是按照我们分析好了的步骤，按照步骤解决问题

+ 面向对象(OOP)

面向对象是把事物分解成为一个个对象，然后由对象之间分工与合作

举个例子:将大象装进冰箱，面向对象的做法

先找出对象，并写出这些对象的功能：

1. 大象对象

   + 进去
2. 冰箱对象

   + 打开
   + 关闭

3. 使用大象和冰箱的功能

面向对象是以对象功能来划分问题，而不是步骤

在面向对象程序开发思想中，每一个对选都是功能中心，具有明确分工

面向对象编程具有灵活，代码可复用，容易维护和开发的优点，更适合多人合作的大型软件项目

面向对象的特性：

+ 封装性
+ 继承性
+ 多态性

### ES6中的类和对象

面向对象更贴近我们的实际生活，可以使用面向对象描述现实世界事物，但是事物分为具体的事物和抽象的事物

手机  抽象的(泛指)

![1590202907622](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590202907622.png?raw=true)



   面向对象的思维特点：

1. 抽取(抽象)对选哪个公用的属性和行为组织(封装)成一个类(模板)
2. 对类进行实例化，获取类的对象

面向对象编程我们考虑的是有哪些对象，按照面向对象的思维特点，不断的创新对象，使用对象，指挥对象做事情

#### 对象

现实生活中:万物皆对象，对象是一个具体的事物，看得见摸得着的事物，例如：一本书，一辆汽车

在JavaScript中，对象是一组无序的相关属性和方法，所有的事物都是对象，例如字符串，数组，数值，函数等

对象是有属性和方法组成的:

+ 属性：事物的特性，在对象中属性来表示(常用名词)
+ 方法：事物的行为，在对象中庸方法来表示(常用动词)

#### 类 class

在ES6中新增了类的概念，可以使用class关键字声明一个类，之后以这个类来实例化对象。

类抽象了对象的公共部分，它泛指某一大类(class)

对象特指某一个，通过实例化一个具体的对象

![1590203470763](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590203470763.png?raw=true)

面向对象的思维特点：

1. 抽取(抽象)对象公用的属性和行为组织(封装)车模成一个类(模板)
2. 对象进行实例化。获取类的对象

#### 创建类

```javascript
class name{
    //class body
}
```

创建实例(对象):

```javascript
var xx = new Name()
```

注意：类必须使用new实例化对象

#### 类 constructor构造函数

`constructor()`方法是类的构造函数(默认方法),用于传递参数，返回实例对象，通过new命令生成对象实例时，自动调用该方法，如果没有显式定义，类内部会自动给我们创建一个`constructor()`

```javascript
const Star(){
    constructor(uname){
        this.uname = uname
    }
}
var ldh = new Star('刘德华')
console.log(ldh.uname)
```

1. 通过class关键字创建类，类名我们还是习惯性定义首字母大写
2. 类里面有个`constructor`函数，可以接受传递过来的参数，同时返回实例对象
3. `constructor`函数只要new生成实例时，就会自动调用这个函数，如果我们不懈这个函数，类也会自动生成这个函数
4. 生成实例new不能省略
5. 最后注意语法规范，创建类 类名后面我们不要加小括号，生成实例，类名后面加小括号，构造函数不需要加`function`

#### 类添加方法

```javascript
const Star(){
    constructor(uname){
        this.uname = uname
    }
    sing(){
       console.log('我唱歌')
    }
}
var ldh = new Star('刘德华')
console.log(ldh.uname)
ldh.sing()
```

+ 我们类里面的所有函数不需要写function
+ 多个函数方法之间不需要添加逗号分隔

#### 继承

现实中继承：子承父业，比如我们都继承了父亲的姓

程序中继承：子类可以继承父类的一些属性和方法

语法：

```javascript
class Father{
}
class Son extends Father{
    
}
```

`super`关键字用来访问和调用对象父类上的函数，可以调用父类的构造函数，也可以调用父类的普通函数

`super`关键字调用构造函数

```javascript
class Father{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    sum(){
        console.log(this.x + this.y)
    }
}
class Son extends Father{
    constructor(x,y){
        super(x,y)//调用了父类中的构造函数
    }
}
var son  =new Son(1,2);
son.sum();
```

`super`关键字调用普通函数

```javascript
class Father{
    say(){
        return '我是爸爸'
    }
}
class Son extends Father{
    say(){
        console.log(super.say()+'的儿子');
        //super.say()就是调用父类中的普通函数say()
    }
}
var son = new Son();
son.say();
//继承中的属性或者方法查找原则：就近原则
//1. 继承中，如果实例化子类输出一个方法，先看子类有没有这个方法，如果有就先执行子类的
//2. 继承中，如果子类里面没有，就去查找父类有没有这个方法，如果有，就执行父类的这个方法(就近原则)
```

#### 子类继承父类方法同时扩展自己的方法

```javascript
class Father{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    sum(){
        console.log(this.x + this.y)
    }
}
//子类继承父类加法方法同时扩展减法方法
class Son extends Father{
    constructor(x,y){
       //利用super调用父类的构造函数
       //super必须在子类this之前调用
       super(x,y);
       this.x = x;
       this.y = y;  
    }
    subtract(){
        console.log(this.x -this.y)
    }
}
var son =new Son(5,3);
son.subtract(5,3)
son.sum(5,3)
```

### 三个注意点

1. 在ES6中没有变量提升，必须先定义类，才能通过类实例化对象

```javascript
var ldh =new Star('刘德华'); 
ldh.sing() //报错 
class Star{
   constructor(uname,age){
       this.uname =uname;
       this.age =age;
   }
   sing(){
       console.log('hi')
   } 
}
//1.在ES6中类没有变量提升，所以必须先定义类，才能通过类实例化对象
```

2. 类里面的共有的属性和方法一定要加this使用

3. 类里面的this指向问题

constructor里面的this指向实例对象，方法里面this指向这个方法的调用者

```html
<button>点击</button>
<script>
    
class Star{
   constructor(uname,age){
       //constructor里面的this指向的是创建的实例对象
       this.uname =uname;
       this.age =age;
       this.btn =docuemnt.querySelect('button');
       this.btn.onclick =this.sing
   }
   sing(){
       //这个sing方法里面的this指向的是btn这个按钮，因为这个按钮调用了这个函数
       console.log(this.uname)
   } 
}
var ldh =new Star('刘德华'); 
ldh.sing()
</script>
```

## 构造函数和原型

### 目标

+ 能够使用构造函数创建对象
+ 能够说出原型的作用
+ 能够说出访问对象成员的规则
+ 能够使用ES5新增的一些方法

### 构造函数和原型

在典型的OOP的语言(如java)，都存在类的概念，类就是对象的模板，对象就是类的实例，但在ES6之前，JS中并没有引入类的概念

在ES6之前，对象不是基于类创建的，而是一种称为构建函数的特殊函数来定义对象和他们的特征

创建对象可以通过以下三种方式：

1. 对象字面量
2. new Object()
3. ,自定义构造函数

```javascript
//利用new Object()
var obj1 =new Object()
//利用对象字面量创建
var obj2 ={};
//利用构造函数创建对象
function Star(uname,age){
    this.uname = uname;
    this.age =age
    this.say =function(){
        console.log('我会唱歌')
    }
}
var ldh = new Star('刘德华'，20)
```

#### 构造函数

构造函数是一种特殊的函数，主要用来初始化对象，即为对象变量赋值初始值，他总与new一起使用。我们可以把对象中一些公共的属性和方法抽离出来，然后封装到这个函数里面。

new在执行时会做四件事情：

1. 在内存中创建一个新的空对象
2. 让this指向这个新的对象
3. 执行构造函数里面的代码，给这个新对象添加属性和方法
4. 返回这个新对象(所以构造函数里面不需要return)

JavaScript的构造函数中可以添加一些成员，可以在构造函数本身上添加，也可以在构造函数内部的this上添加。通过这两种方式添加的成员，就分别称为静态成员和实例成员

+ 静态成员：在构造函数本身上添加的成员称为静态成员，只能由构造函数本身来访问
+ 实例成员：在构造函数内部创建的对象成员称为实例成员，只能由实例化的对象来访问

```javascript
//构造函数中的属性和方法我们称为成员，成员可以添加
function Star(uname,age){
    this.uname = uname;
    this.age =age
    this.say =function(){
        console.log('我会唱歌')
    }
}
var ldh = new Star('刘德华'，20)
//实例成员就是构造函数内部通过this添加成员 uname age sing 就是实例成员
//实例成员只能通过实例化的对象来访问
console.log(ldh.uname);
ldh.sing();
//console.log(star.uname);//不可以通过构造函数来访问实例成员
//2. 静态成员 在构造函数本身上添加的成员
star,sex ='男'; //sex就是静态成员
//静态成员只能通过构造函数来访问
console.log(Star.sex)
console.log(ldh.sex);// 不能通过对象来访问
```

构造函数问题：

构造函数方法很好用，但是存在浪费内存的问题

![1590217956817](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590217956817.png?raw=true)

#### 构造函数原型prototype

构造函数通过原型分配的函数是所有对象所共享的

JavaScript规定，每一个构造函数都有一个prototype属性，指向另一个对象。注意这个prototype就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有

我们可以把这些不变的方法，直接定义在prototype对象上，这样所有对象的实例就可以共享这些方法

```javascript
function Star(uname,age){
    this.uname = uname;
    this.age =age
}
Star.prototype.sing = function(){
   console.log('我会唱歌')
}
var ldh = new Star('刘德华',20)
var zxy =new Star('张学友'，19)
ldh.sing()
zxy.sing()
console.log(ldh.sing === zxy.sing)
console.log(ldh) //对象身上系统自己添加一个__proto__指向我们构造函数的原型对象
console.log(ldh.__proto__ === Star.prototype) //true
//方法的查找规则：首先先看ldh对象身上是否有sing方法，如果有就执行这个对象身上的sing
//如果没有sing方法，因为有__proto__的存在，就去构造函数源性对象身上prototype身上去查找sing这个方法
//一般情况下，我们的公共属性定义到构造函数里面，公共的反方我们放到原型对象身上
```

对象原型`__proto__`

对象都会有一个属性`__proto__`指向构造函数的prototype原型对象，之所以我么你对象可以使用构造函数prototype原型对象的属性和方法，就是因为对象有`__proto__`原型的存在。

`__proto__`对象原型的意义就在意为对象的查找机制提供一个方法，或者说一条路线，但是它是一个非标准的属性，因此实际开发中，不可以使用这个属性，它只是内部指向原型`prototype`

![1590219219193](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590219219193.png?raw=true)

#### constructor 构造函数

对象原型(`__proto__`)和构造函数(prototype)原型对象里面都有一个属性constructor属性，constructor我们称之为构造函数，因为它指会构造函数本身。

constructor主要用于记录该对象引用哪个构造函数，它可以让原型对象重新指向原来的构造函数

如果我们修改了原来的原型对象，给原型对象赋值的是一个对象，则必须手动的利用constructor只会原来的构造函数

```javascript
function Star(uname,age){
    this.uname = uname;
    this.age =age
}
Star.prototype ={
    constructor：Star, //重新设置constructor
    sing:function(){
       console.log('我会唱歌') 
    },
    movie:function(){
    console.log('我会演电影')
    }
}
var ldh = new Star('刘德华',20)
var zxy =new Star('张学友'，19)
console.log(ldh.sing === zxy.sing)
console.log(ldh) //对象身上系统自己添加一个__proto__指向我们构造函数的原型对象
console.log(ldh.__proto__ === Star.prototype) //true
console.log(Star.prototype.constructor) //constructor属性被覆盖掉了
//如果我们修改了原来的原型对象，给原型对象赋值的是一个对象，则必须手动的利用constructor只会原来的构造函数
```

#### 构造函数，实例对象，原型三者之间的关系

![1590220102169](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590220102169.png?raw=true)

#### 原型链

![1590220318780](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590220318780.png?raw=true)

#### JavaScript的成员的查找机制

1. 当访问一个对象的属性(包括方法时),首先查找这个对象自身有没有该属性

2. 如果没有就查找它的原型(也就是`__proto__`指向的prototype原型对象)
3. 如果还没有就查找原型对象的原型(Object的模型对象)
4. 一次类推一致找到Object为止(null)

5. `__proto__`对象原型的意义就在于为对象成员查找机制提供一个方向，或者一条路线

#### 原型对象this指向

1. 在构造函数中，里面this指向的是对象实例
2. 原型对象函数里面的this指向的是实例对象

#### 扩展内置对象

可以通过原型对象，对原来的内置对象进行扩展自定义的方法，比如数组增加求和的功能

```javascript
//原型对象的应用，扩展内置对象方法
Array.prototype.sum = function(){
    var sum = 0;
    for(var i=0;i<this.length;i++){
        sum += this[i]
    }
    return sum;
}
var arr = [1,2,3];
console.lg(arr.sum()) //6
```

注意：数组和字符串内置对象不能给原型覆盖操作`Array.prototype ={}`,只能是`Array.prototype.xxx = function(){}`的方式。

### ES5中新增的方法

#### 对象方法

1. Object.keys()用于获取对象自身所有的属性

```javascript
Object.keys(obj)
```

+ 效果类似for...in
+ 返回一个由属性名组成的数组

```javascript
var obj ={
    id:1,
    pname:'小米',
    price:1999
    num:2000
};
var arr =Object.keys(obj);
console.log(arr);//['id','pname','price','num']
```

2. `Object.defineProperty()`定义新属性或修改原有的属性

```javascript
Object.defineProperty(obj,prop,descriptor)
//obj:必需。目标对象
//prop：必需。需定义或修改的属性的名字
//descriptor: 必需。目标属性所拥有的特性
```

Object.defineProperty()第三个参数descriptor说明：以对象形式{}书写

+ value:设置属性的值，默认为undefined
+ writable: 值是否可以重写。true|false默认为false
+ enumerable:目标属性是否可以被枚举。true|false默认为false
+ configurable：目标属性是否可以删除或者再次修改特性 true|false 默认为false

```javascript
var obj ={
    id:1,
    pname:'小米',
    price:1999
};
obj.num = 1000;
obj.price =99;
Object.defineProperty(obj,'num',{value：1000})
Object.defineProperty(obj,'price',{value:999})
Object.defineProperty(obj,'id',{
    //不允许修改这个属性值
    writable:false
})
```

## 函数的进阶学习

### 目标

+ 能够说出函数的多种定义和调用方式
+ 能够说出和改变函数内部this的指向
+ 能够把函数作为参数和返回值传递
+ 能够说出闭包的作用
+ 能够说出递归的两个条件
+ 能够说出深拷贝和浅拷贝的区别

### 函数的定义和调用

1. 函数声明function 关键字(命名函数)
2. 函数表达式(匿名函数)
3. new Function()

```javascript
//1.函数声明(命名函数)
function fn(){
    
}
//2.函数表达式(匿名函数)
var fun = function(){};

//3.利用new Function('参数1','参数2','函数体')；
var f = new Function('a','b','console.log(a+b)');
f(1,2);
//所有函数都是Function的实例(对象)
//函数也属于对象
```

+ Function里面参数都必须是字符串格式

函数的定义方式

![1590227337308](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590227337308.png?raw=true)

### 函数的调用方式

1. 普通函数

```javascript
function fn(){
    console.log('人生的巅峰')
}
fn(); fn.call()
```

2. 对象方法

```javascript
var o = {
    sayHi: function(){
        console.log('人生的巅峰')
    }
}
o.sayHi();
```

3. 构造函数

```javascript
function Star(){}
new Star()
```

4. 绑定事件函数

```javas
btn.onclick = function(){}
```

5. 定时器函数

```javascript
setInterval(function(){
    
})
```

6. 立即执行函数

```javascript
(function(){
    console.log('人生的巅峰')
})();//立即振兴函数自动调用
```

### this

![1590227742433](https://github.com/liuboringbook/learning-record/blob/master/JavaScript/resource/1590227742433.png?raw=true)

javascript为我们专门提供了一些函数方法来帮助我们更优雅的处理函数内部this的指向问题，常用的有`bind()`,

`call()`，`apply()`三种方法

1. call()方法

call()方法调用一个对象，简单理解为调用函数的方式，但是它可以改变函数的this指向

```javascript
fun.call(thisArg,arg1,arg2,...)
```

```javascript
var o ={
    name:'andy'
}
function fn(a,b){
    console.log(this)
    console.log(a+b)
}
fn.call(o,1,2) //call第一个可以调用函数，第二个可以改变函数内的this指向
//call的主要作用可以实现继承

function Father(uname,age,sex){
    this.uname =name;
    this.age =age;
    this.sex =sex;
}
function Son(uname,age,sex){
    Father.call(this,uname,age,sex)
}
var son =new Son('刘德华',18,'男')

```

2. apply方法

apply调用一个函数，简单理解为调用函数的方式，但是它可以改变函数的this指向

```javascript
fun.apply(thisArg,[argsArray])
```

+ thisAry: 在fun函数运行时指定的this值
+ argsArray:传递的值，必须包含在数组里面
+ 返回值就是函数的返回值，因为他就是调用函数

```javascript
var o ={
    name:'andy'
}
function fn(arr){
    console.log(this)
    console.log(arr)//1,2
}
fn.apply(o,[1,2]);
//1.也是调用函数，第二个可以改变函数内部的this指向
//2.但是它的参数必须是数组(伪数组)
//3. apply的主要应用  比如我们可以利用apply借助于数组内置对象求最大值
//Math.max()
var arr =[1,66,3,99,4];
var max = Math.max.apply(Math,arr);
```

3. bind方法

bind()方法不会调用函数，但是能改变函数内部this指向

```javascript
fun.bind(thisArg,arg1,arg2,...)
```

+ thisArg: 在fun函数运行时指定的this值
+ arg1，arg2:传递的其他参数
+ 返回由指定的this值和初始化参数改造的原函数拷贝

```javascript
var o ={
    name:'andy'
}
function fn(arr){
    console.log(this)
}
var f = fn.bind(o)//没有输出
//1. 不会调用原来的函数，可以改变原来函数内部的this指向
//2. 返回的是原函数改变this之后产生的新函数
f(); //{name:'andy'}
//3.如果有的函数我们不需要立即调用，但是又想改变这个函数的内部的this指向此时用bind

```

```html
//例如：我们有一个按钮，当我们点击了之后，就禁用这个按钮，3秒钟之后开启这个按钮
<button>点击</button>
<script>
   var btn = document.querySelector('button');
    btn.onclick = function(){
        this.disabled =true; //这个this指向的是btn这个按钮
        setTimeout(function(){
            this.disabled =false //定时器函数里面的this指向的是window
        }.bind(this),3000)
    }
</script>
```

call apply bind总结

相同点：

都可以改变函数内部的this指向

区别点：

1. call和apply会调用函数，并且改变函数内部this指向
2. call和apply传递的参数不一样，call传递参数aru1,aru2...形式，apply必须数组形式[arg]
3. bind不会调用函数，可以改变函数内部this指向

主要应用场景

1. call经常做继承
2. apply经常跟数组有关系，比如借助于数字对象对象实现数组最大值最小值
3. bind不调用函数，但是还想改变this指向，比如改变定时器内部的this指向

### 高阶函数

高阶函数是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出

```javascript
//高阶函数- 函数作为参数传递
function fn(a,b){
    console.log(a+b)
    callback && callback()
}
fn(1,2,function(){
    console.log(‘我是最后调用的’)
})//3 我是最后调用的
```

### 闭包

#### 变量作用域

变量根据作用域的不同分为两种:全局变量和局部变量

1. 函数内部可以使用全局变量
2. 函数外部不可以使用局部变量
3. 当函数执行完毕，本作用域内的局部变量会销毁

闭包：指有权访问另一个函数作用域中变量的函数，简单理解就是，一个作用域可以访问另一个函数内部的局部变量

```javascript
//闭包指有权访问另一个函数作用域中变量的函数

//闭包：我们fun这个函数作用域访问了另一个函数fn里面的局部变量num

function fn(){
    var num =10;
    function fun(){
        console.log(num)
    }
    fun()
}
fn()
```

```javascript
//我们fn外面的作用域可以访问fn内部的局部变量
function fn(){
    var num =10;
    function fun(){
        console.log(num)
    }
    return fun;
}
var f = fn()
f();
//类似于
//var f = function fun(){
//  console.log(num);
// }
```

闭包的主要作用： 延伸了变量的作用范围