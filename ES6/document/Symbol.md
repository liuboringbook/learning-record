# Symbol


## 解决的问题

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因

ES6中引入了一种新的原始数据类型`Symbol`，表示独一无二的值


## 声明
 - 直接用Symbol()声明
 ```
    {
        let a1=Symbol(2);
        let a2=Symbol(2);
        console.log(a1===a4);//false
    }
 ```
 - 使用Symbol.for()进行声明
 ```
    {
        let a3=Symbol.for('a3');
        let a4=Symbol.for('a3');
        console.log(a3===a4);//true
    }
 ```

 Symbol.for()和Symbol()的区别：前者会被登记在全局环境中供搜索，后者不会。
 Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会检查给定的key值是否已经存在，如果不存在才会新建一个值，Symbol()每次都会返回一个不同的值

## 获取Symbol的值

如果用for..in和for..of循环是取不到Symbol的值的
Symbol可以通过getOWnPropertySymbol方法取出Symbol，返回值是一个数组
通常我们需要取出Symbol和普通的数据，可以使用Reflect.ownkey()方法实现
```
   {
    let a1=Symbol.for('abc');
    let obj={
        [a1]:'123',
        'abc':345,
        'c':456
    };
    console.log('obj',obj);//{abc:345,c:456,Symbol(abc):123}
    for(let [key,value] of Object.entries(obj)){
        console.log('for of',key,value)//for of  abc 345
        //for of c 456
    }
    Object.getOWnPropertySymbol(obj).forEach(function(item){
        console.log(obj[item]);//123
    })
    Reflect.owbKeys(obj).forEach(function(item){
        console.log('ownkeys',item,obj[item])//ownkeys abc 345
        //ownkeys c 456
        //ownkeys Symbol(abc) 123  
    })
   }
```
