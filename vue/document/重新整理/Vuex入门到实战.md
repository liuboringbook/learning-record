# Vuex入门到实战

## 目标

+ 能够说出Vuex的基础使用步骤
+ 能够说出Vuex的核心概念
+ 能够基于Vuex实现业务功能

## 目录

### 1，Vuex概述

组件之间共享数据的方式

父向子传值：` v-bind` 属性绑定

子向父传值：`v-on` 事件绑定

兄弟组件之间共享数据：EventBus

+ `$on`接收数据的那个组件
+ `$emit`发送数据的那个组件

Vuex是实现组件全局状态(数据)管理的一种机制，可以方便的实现组件之间数据的共享

![1589275894261](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1589275894261.png)

使用Vuex统一管理状态的好处

1. 能够在vuex中集中管理共享的数据，易于开发和后期维护
2. 能够高效地实现组件之间的数据共享，提高开发效率
3. 存储在vuex中的数据都是响应式的，能够实时保持数据与页面的同步

存储到vuex中的数据：只有组件之间共享的数据，才有必要存储到vuex中；对于组件中的私有数据，依旧存储在组件自身的data中即可。

### 2，Vuex的基础使用

1. 安装vuex依赖包

```javascript
npm install vuex --save
```

2. 导入vuex包

```javascript
import vuex from 'vuex'
Vue.use(Vuex)
```

3. 创建store对象

```javascript
const store = new Vuex.Store({
    //state 中存放的就是全局共享的数据
    state:{count:0}
})
```

4. 将store对象挂载到vue实例中

```javascript
new Vue({
    el:'#app',
    render:h=>h(app),
    router,
    //将创建的共享数据对象，挂载到Vue实例中
    //所有的组件，就可以直接从store中获取全局的数据了
    store
})
```

### 3，Vuex的核心概念

Vuex中的主要核心概念如下：

+ State

state提供唯一的公共数据源，所有共享的数据都要统一放到Store中进行存储

```javascript
//创建store数据源，提供唯一公共数据
const store =new Vuex.store({
    state:{count:0}
})
```

组件访问State中数据的第一种方式：

```javascript
this.$state.state.全局名称
```

组件访问State中数据的第二种方法：

```javascript
//1.从vuex中按需导入mapState函数
import {mapState} from 'vuex'
```

通过刚才导入的mapState函数，将当前组件需要的全局数据，映射为当前组件的computed计算属性：

```javascript
computed:[
    ...mapState(['count'])
]
```

+ Mutation

Mutation 用于变更Store中数据

1. 只能通过mutation变更Store数据，不可以直接操作Store中的数据
2. 通过这种方式虽然操作起来比较繁琐，但是可以集中监控所有数据的变化.

```javascript
//定义Mutation
cosnt store = new Vuex.Store({
    state:{
        count:0
    },
    mutations:{
        add(state){
            //变更状态
            state.count++;
        }
    }
})
```

```javascript
//触发mutation
methods:{
    handle(){
        //触发mutations的第一种方式
        this.$store.commit('add')
    }
}
```

可以在触发mutations时传递参数：

```javascript
//定义Mutation
const store = new Vuex.Store({
    state:{
        count:0
    },
    mutations:{
        addN(state,step{
            //变更状态
              state.count+=step
        }
    }
})
```

```javascript
//触发mutation
methods:{
    handle2(){
        //在调用commit函数 作用就是调用某个mutation函数
        //触发mutations时携带参数
        this.$store.commit('addN',3)
    }
}
```

`this.$store.commit()`是触发mutations的第一种方式，触发mutations的第二种方式：

```javascript
//1. 从vuex中按需导入mapMutations函数
import {mapMutations} from 'vuex'
```

通过刚才导入的mapMutations函数将需要的mutations函数，映射为当前组件的methods方法

```javascript
//2. 将指定的mutations函数，映射为当前组件的methods函数
methods:{
    ...mapMutations(['add','addN'])
}
```

+ Action

Action用于处理异步任务

如果通过异步操作变更数据，必须通过Action，而不能使用Mutation，但是在Action中还是要通过触发Mutation的方式间接变更数据。

```javascript
//定义Action
const store =new Vuex.Store({
    mutations:{
        add(state){
            state.count++
        }
    },
    actions:{
        addAsync(context){
            setTimeout(()=>{
                context.commit('add')
            },1000)
        }
    }
})
```

```javascript
//触发Action
methods:{
    handle(){
        //触发actions的第一种方式
        this.$store.dispatch('addAsync')
    }
}
```



+ Getter

### 4，基于Vuex的案例

