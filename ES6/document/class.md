# class

## 介绍
ES6的class属于一种"语法糖",所以只是写法更加优雅，更加像面向对象的编程，其思想和ES5是一致的。
```
   function Point(x,y){
     this.x =x;
     this.y =y;
   }
   Point.prototype.toString =function(){
    return '('+this.x+','+this.y+')';
   }
```
等同于
```
   class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    toString(){
        return '('+this.x+','+this.y+')';
    }
   }
```
## constructor

`constructor`方法是类的构造函数，是一个默认方法，通过`new`命令创建对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个默认的`constructor`方法会被默认添加。所以即使你没有添加构造函数，也会有一个默认的构造函数的。一般`constructor`方法返回实例对象this，但是也可以指定`constructor`方法返回一个全新的对象，让返回的实例对象不是该类的实例。

## super
1. 当做函数使用
```
   class A {}
   class B extend A(){
     constructor(){
        super(); //ES6要求，子类的构造函数必须执行一次super函数，否则会报错
     }
   }
```  
注：在`constructor`中必须调用`super`方法，因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工，而`super`就代表了父类的构造函数。`super`虽然代表了父类A的构造函数，但是返回的是子类B的实例，即`super`内部的this指的是B，因此`super()`在这里相当于`A.prototype.constructor.call(this,props)`。

```
  class A{
     constructor(){
        console.log(new.target.name);//new.target 指向当前正在执行的函数
     }
  }
  class B extends A{
     constructor{
       super();
     }
  }
  new A();
  new B();
```
可以看到，在`super()`执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。也就是说，`super()`内部的`this`指向的是B

2. 当做对象使用
  在普通方法中，指向父类的原型对象；在静态方法中，指向父类
```
class A {
  c() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.c()); // 2
  }
}

let b = new B();
``` 

通过super传递参数
```
{
        class Parent{
            constructor(name='mukewang'){
                this.name =name;
            }
        }
        class Child extends Parent{
            constructor(name='child'){
               super(name);
               this.type='child';
            }
        }
        console.log('继承传递参数',new Child('xiaoming'))//Child {name:'xiaoming',type:'child'}
    }
``` 

## getter setter
```
{
        class Parent{
            constructor(name='mukewang'){
                this.name =name;
            }
            //属性，不是方法
            get longName(){
                return 'mk'+this.name
            }
            set longName(value){
                this.name =value
            }
        }
        let v =new Parent();
        console.log('getter',v.longName);
        v.longName ='hello';
        console.log('setter',v.longName);
    }
```

## 静态方法
```
 {
        class Parent{
            constructor(name='mukewang'){
                this.name =name;
            }
            static tell(){
                console.log('tell')
            }
        }
        Parent.tell();
    }
```

## 静态属性
```
{
        class Parent{
            constructor(name='mukewang'){
                this.name =name;
            }
            static tell(){
                console.log('tell')
            }
        }
        Parent.type ='test';
        console.log('静态属性',Parent.type);
    }
```