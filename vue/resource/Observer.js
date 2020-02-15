/**
 * Created by 刘如刚 on 2020/2/15.
 */
class Watcher{
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr =expr;
        this.cb =cb;
        //先把旧值保存起来
        this.oldVal =this.getOldVal();
    }
    getOldVal(){
       Dep.target =this;
       const oldVal = compileUtil.getVal(this.expr,this.vm);
       Dep.target =null;
       return oldVal;
    }
    update(){
        const newVal = compileUtil.getVal(this.expr,this.vm);
        if(newVal !== this.oldVal){
            this.cb(newVal);
        }
    }
}
class Dep{
    constructor(){
        this.subs =[];
    }
    //收集观察者
    addSub(watcher){
        this.subs.push(watcher);
    }
    //通知观察者去更新
    notify(){
        console.log('通知了观察者');
        this.subs.forEach(w=>w.update())
    }
}
class Observer{
    constructor(data){
        this.observer(data)
    }
    observer(data){
        /*
        *
         person:{
         name: '张三',
         fav:{
           a:'爱好'
          }
         }
        *
        * */
        if(data && typeof data === 'object'){
            Object.keys(data).forEach(key=>{
                this.definedReactive(data,key,data[key])//遍历获取对象所有值
            })
        }
    }
    definedReactive(data,key,value){
        //递归遍历
        this.observer(value);
        const dep =new Dep();
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:false,
            get(){
                //初始化
               //订阅数据变化时，往Dep中添加观察者
               Dep.target && dep.addSub(Dep.target);
               return value;
            },
            set:(newVal)=>{
                this.observer(newVal);
                if(newVal !== value){
                    value = newVal
                }
                //告诉Dep通知变化
                dep.notify()
            }
        });
    }
}