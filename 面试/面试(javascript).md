# 面试(javascript)

## DOM事件类

![1583690630474](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583690630474.png)

### 事件级别

```javascript
//DOM0
element.onclick =function(){}
//DOM2
element.addEventListener('click',function(){},false)
//DOM3
element.addEventListener('keyup',function(){},false)
```

###  事件模型

![1583691069309](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583691069309.png)

### 描述DOM事件捕获的具体流程

![1583691264174](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583691264174.png)

### Event对象的常见应用

```javascript
event.preventDefault(); //阻止默认事件
event.stopPropagation(); //阻止冒泡
event.stopImmediatePropagation(); //执行A，不执行B
event.currentTarget(); //当前所绑定的元素
event.target(); //当前被触发的元素
```

### 自定义事件

```javascript
var eve = new Event('custome');
ev.addEventListener('custome',function(){
    console.log('custome')
})
ev.dispatchEvent(eve);
```

## 原型链

![1583908521535](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583908521535.png)

### 创建对象的方法

第一种方法:字面量

```javascript
var o1 ={name:'o1'};
var o2 =new Object('o2');
```

第二种方法：通过构造函数

```javascript
var M =function(name){
    this.name =name
};
var o3 =new M('o3');
```

第三种方法:Object.create

```javascript
var p ={name:'o4'};
var o4 = Object.create(p);
```

### 原型链

![1583909077624](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583909077624.png)

### instanceof

![1583909850411](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583909850411.png)

### new运算符

![1583910443395](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583910443395.png)

## 面向对象

### 类的申明

```javascript
//ES5中的类的声明
function Animal(){
    this.name ='狗'
}
//ES6中类的声明
class Animal2(){
    constructor(){
        this.name ='狗'
    }
}
//实例化
var A1 = new Animal();
var A2 =new Animal2();
```

### 类的继承

1. 借助构造函数继承

```javascript
function Parent1(){
  this.name ='Parent1'
}
Parent1.prototype.say = function(){
  console.log('hello')
}
function Child1(){
  Parent1.call(this); //改变函数的运行上下文
  this.type ='child1'
}
console.log(new Child1())
```

缺点：借助构造函数继承，不能继承父类的prototype原型上的方法

2. 借助原型链实现继承

```javascript
function Parent2(){
    this.name ='Parent2'
}
Parent2.prototype.say =function(){
    console.log('h1')
}
function Child2(){
    this.type ='child2'
}
Child2.prototype = new Parent2();

console.log(new Child2()); 
c1 =new Child2();
c2 =new Child2();
```

缺点：因为原型链中的对象都是公用的，导致子类改变继承父级中的属性和方法，父类下的所有子类继承的属性和方法都会改变

3. 组合方式

```javascript
    function Parent3(){
        this.name ='parent3';
        this.play =[1,2,3]
    }
    function Child3(){
        Parent3.call(this);
        this.type= 'child3'
    }
Child3.prototype =new Parent3();
var c3=new Child3();
var c4 =new Child4();
c3.play.push(4);
console.log(c3.paly,c4.play)
```

组合继承基本上是现在主流的继承方法

缺点：父类创建执行了两次，浪费了内存空间

4. 组合继承的优化

```javascript
function Parent4(){
        this.name ='parent4';
        this.play =[1,2,3]
    }
    function Child4(){
        Parent3.call(this);
        this.type= 'child4'
    }
    Child4.prototype =Parent4.prototype;
    var s5 =new Child4();
    var s6 =new Child4();
    console.log(s5,s6);
```

缺点 ：子类的prototype指向不再是子类自己。而是指向父类

5. 组合继承的优化2

```javascript
function Parent5(){
        this.name ='parent5';
        this.play =[1,2,3]
    }
    function Child5(){
        Parent3.call(this);
        this.type= 'child5'
    }
    Child5.prototype =Object.create(Parent5.prototype);
    Child5.prototype.constructor =Child5;
```





