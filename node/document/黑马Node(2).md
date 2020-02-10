# 黑马Node(2)

## Node.js模块化开发

### Node.js中模块化开发规范

+ node.js规范一个JavaScript文件就是一个模块，模块内部定义的变量和函数默认情况下在外部无法得到
+ 模块内部可以使用exports对象进行成员导出，使用require方法导入其他模块

![1580782588339](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1580782588339.png)

模块成员的导出

```javascript
//a.js
//在模块内部定义变量
let version =1.0;
//在模块内部定义方法
const sayHi = name =>`您好，${name}`;
//向模块外导出数据
exports.version = version； 
exports.sayhi = sayhi;
```

模块成员的导入

```javascript
//b.js
//在b.js模块中导入模块a
let a = require('./b.js');
//输出b模块中的version变量
console.log(a.version);
//调用b模块中的sayHi方法并输入其返回值
console.log(a.sayHi('黑马讲师'));
```

模块导出的另一种方式

```javascript
module.exports.version = version; 
```

exports是module.exports的别名(地址引用关系)，导出对象最终以module.exports为准

模块导出两种方式的联系与区别

![1580827627258](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1580827627258.png)

### 系统模块

Node运行环境是提供的API，因为这些API都是以模块化的方式进行开发的，所以我们又称为Node运行环境提供的API为系统模块

#### 系统模块fs文件操作

```javascript
const fs = require('fs');
```

读取文件内容

```javascript
fs.readFile('文件路径/文件名称',['文件编码'],callback);
```

导入文件内容

```javascript
fs.writeFile('文件路径/文件名称','数据'，callback)
```

#### 系统模块path路径操作

为什么要进行路径拼接

+ 不同操作系统的路径分隔符不统一
+ /public/uploads/avatar
+ windows上是\ /
+ Linux上是/

路径拼接语法

```javascript
path.join('路径','路径',...)
```

```javascript
//导入path模块
const path = require('path');
//路径拼接
let finalPath = path.join('itcast','a','b','c.css')
//输出的结果itcast/a/b/c.css   linux 和widow系统打印结果不同
console.log(finalPath);
```

相对路径vs绝对路径

+ 大多数情况下使用绝对路径，因为相对路径有时候相对的是命令行工具的当前工作目录
+ 在读取文件或者设置文件路径都会选择绝对路径

+ 使用__dirname获取文件的绝对路径

### 第三方模块

别人写好的，具有特定功能的，我们能直接使用的模块即第三方模块，由于第三方模块通常都是由多个文件组成并且被放置在一个文件夹内，所以有名包。

第三方模块有两种存在形式：

+ 以js文件的形式存在，提供实现项目具体功能的API接口
+ 以命令行工具形式存在，以辅助项目开发

获取第三方模块

npm(node package manager):node的第三方模块管理工具

+ 下载： npm install 模块名称
+ 卸载：npm uninstall package 模块名称

第三方模块nodemon

nodemon是一个命令行工具，用于辅助项目开发。在Node.js中，每次修改文件都要在命令行工具中重新执行该文件，非常繁琐。

使用步骤

1. 使用npm install nodemon -g 下载它
2. 在命令行工具中用nodemon命令行代替node命令执行文件

第三放工具 nrm

nrm(npm registry manager)：npm下载地址切换工具

npm默认的下载地址在国外，国内下载速度慢

使用步骤

1. 使用npm install nrm -g 下载它
2. 查询可用下载地址列表 nrm ls
3. 切换npm 下载地址nrm use 下载地址名称

