# Set和Map

## Set的数据结构

### 基本用法

ES6提供了新到的数据结构Set，它类似于数组，但是成员的值，都是唯一的，没有重复的值

声明set的方法
```
 {
    let list = new Set();
    list.add(5)
    list.add(7)
    console.log(list)//set {5，7}
 }

 {
    let arr =[1,2,3,4,5];
    let list =new Set(arr);
    console.log(list)//Set {1,2,3,4,5}
 }
```

数组去重

```
  {
    let arr2 =[1,2,3,2,1];
    let list3= new Set(arr2);
    console.log('unique',list3);//Set{1,2,3}
  }
```

### Set中的方法
```
{
        //add Set中添加元素
        //delete 删除Set中的元素
        //clear 清除Set内的数据
        //has  判断Set数据中是否有这个元素

        let arr=['add','delete','clear','has'];
        let list= new Set(arr);


        //遍历Set  可以用for..of..，也可以用forEach
        for(let key of list.keys()){
            console.log('keys',key)
        }
        for(let value of list.values()){
            console.log('value',value)
        }
        for(let [key,value] of list.entries()){
            console.log('entries',key,value)
        }
        list.forEach(function(item){
            console.log(item);
        })
    }
```

## Map的数据结构

### 基本用法
```
{
    //Map添加元素的方法是set 
    let map =new Map();
    let arr = ['123'];
    map.set(arr,4567);
    console.log('map',map,map.get(arr));//map Map {['123']:4567} 4567
}
```


```
{
    let map = new Map([['a','123'],['b','456']]);
    console.log('map args',map);//{"a" => "123", "b" => "456"}
    console.log('size',map.size);//2
    console.log('delete',map.delete('a'),map);//{"b" => "456"}
    console.log('clear',map.clear(),map);//{}
}
```
