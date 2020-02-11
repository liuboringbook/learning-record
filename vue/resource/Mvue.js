const compileUtil ={
    getVal(expr,vm){
      return expr.split('.').reduce((data,currentVal)=>{
          return data[currentVal]
      },vm.$data)
    },
    text(node,expr,vm){// expr:msg 学习MVVM原理
        const value = this.getVal(expr,vm);
        this.updater.textUpdater(node,value)
    },
    html(node,expr,vm){
        const value = this.getVal(expr,vm);
        this.updater.htmlUpdater(node,value);
    },
    model(node,expr,vm){
        const value =this.getVal(expr,vm);
        this.updater.modelUpdater(node,value)
    },
   on(node,expr,vm,eventName){

   },
   //更新的函数
   updater:{
       textUpdater(node,value){
           node.textContent =value;
       },
       htmlUpdater(node,value){
           node.innerHTML =value;
       },
       modelUpdater(node,value){
           node.value =value
       }
   }
}

class Compile{
    constructor(el,vm){
        //判断是否是元素节点，是的话就返回，不是的话就获取该元素节点
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm =vm;
        //1.获取文档碎片对象.放入内存中会减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el);
        //2.编译模板
        this.compile(fragment);

        //3. 追加子元素到根元素
        this.el.appendChild(fragment);
    }
    compile(fragment){
        //1. 获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child=>{
            if(this.isElementNode(child)){
                //是元素节点
                //编译元素节点
                this.compileElement(child);
            }else{
                this.compileText(child);
            }
            if(child.chidNode && child.childNodes.length){
                this.compile(child);
            }
        })
    }
    //编译元素节点
    compileElement(node){
        const attributes = node.attributes;
        [...attributes].forEach(attr=>{
            const {name,value} =attr;
            if(this.isDirective(name)){ //是一个指令，v-text v-html v-on:click
               name.split('-');
               const [,dirctive] =name.split('-'); //text html model on:click
               const [dirName,eventName] = dirctive.split(':');

               //更新数据 数据驱动视图
               compileUtil[dirName](node,value,this.vm,eventName);

               //删除有指令的标签上的属性
               node.removeAttribute('v-'+dirctive)
            }
        })
    }
    //编译文本节点
    compileText(node){
       //{{}} v-text
        console.log(node)
        const content =node.textContent;
        console.log(content);

        if(/\{\{(.+?)\}\}/.test(content)){
            console.log(content)
        }
    }
    //判断是否为追加的指令
    isDirective(attrName){
     return attrName.startsWith('v-')
    }
    node2Fragment(el){
        //创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild =el.firstChild){
            f.appendChild(firstChild);
        }
        return f;
    }
    isElementNode(node){
        return node.nodeType ===1;
    }
}
class MVue{
    constructor(options){
        this.$el =options.el;
        this.$data =options.data;
        this.$options =options;
        if(this.$el){
            //1.实现一个数据观察者
            //2.实现一个指令解析器

            new Compile(this.$el,this);
        }
    }
}