# pm2

## 背景

对于线上项目，如果直接用node app 来启动，如果报错了，可能直接停止导致整个服务器崩溃，一般监控node有几种方案

+ supervisor： 一般用作开发环境的使用
+ forever：管理多个站点，一般每个站点的访问量不大的情况，不需要监控
+ PM2:网站的访问量比较大，需要完整的监控页面

## PM2的主要特性

+ 内部负载均衡
+ 后台运行
+ 0秒停机重载，我理解大概意思是维护升级的时候不需要停机
+ 具有Ubuntu和CentOS的启动脚本
+ 停止不稳定的进程(避免无限循环)
+ 控制台检测
+ 提供HTTP API
+ 远程控制和实时的API

## 安装

```javascript
//全局安装pm2，依赖node和npm
npm install -g pm2
```

## 用法

+ 基本启动命令

```javascript
//pm2 start
//start命令启动对应的node server文件
pm2 start ./build/server.js
```

启动之后，控制台会看到如下消息：

![img](https://user-gold-cdn.xitu.io/2018/11/8/166f2ba717997b20?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 如上图所示，可以看到项目kafazhe启动成功，id是0，并且状态是online

+ 查看详细状态信息

```javas
// pm2 show (appname|id)
pm2 show kaifazhe
```

![img](https://user-gold-cdn.xitu.io/2018/11/8/166f2bae6ed0fb41?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 如上图所示，可以查看kaifazhe进程的详细信息

+ 查看所有启动的进程列表

```javascript
pm2 list
```

![img](https://user-gold-cdn.xitu.io/2018/11/8/166f2ba717997b20?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

+ 监控每个node进程对的cpu和内存使用情况

```javascript
pm2 monit
```

![img](https://user-gold-cdn.xitu.io/2018/11/8/166f2b9519339ad1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 可以使用pm2 monit功能监控所有node进程的运行情况，包括各种响应，错误信息

+ 显示所有进程的日志

```javascript
pm2 logs
```

![img](https://user-gold-cdn.xitu.io/2018/11/8/166f2b95198103f3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

+ 监控运行这些进程的机器的状态

```javascript
pm2 web
```

![img](https://user-gold-cdn.xitu.io/2018/11/8/166f2b95199a77a9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

+ 停止 指定/所有进程

```javascript
pm2 stop (id|all)
```

![img](https://user-gold-cdn.xitu.io/2018/11/8/166f2b95514f5929?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 如图，我们运行了两个服务状态都是online，使用stop 0 之后，kaifazhe的服务编程了stopped，然后使用stop all，所有进程状态变成了stopped

+ 启动 指定/所有进程

```javascript
pm2 restart (id|all)
```

+ 杀死 指定/所有进程

```javas
pm2 delete (id|all)
```

![img](https://user-gold-cdn.xitu.io/2018/11/8/166f2b9552c23eaa?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 从上图我们可以看出，restart 0 之后，0进程从stopped状态变成了online，然后我们使用delete 0，进程0 就消失不见了，我们再delete all,可以看到现在没有任何进程在运行。

## 配置PM2启动文件

pm2启动的方式可以进行很多的扩展，比如设置环境，设置错误信息打印，设置输入信息打印等等高级功能。那么一条命令就不能完成这些任务，所有pm2提供了配置文件的方式来启动

### pm2.config.js

```javascript
module.exports = {
  apps: [
    {
      name: 'kaifazhe', // 应用名称
      script: './build/server.js', // 启动文件地址
      cwd: './', // 当前工作路径
      watch: [
        // 监控变化的目录，一旦变化，自动重启
        'src',
        'build',
      ],
      ignore_watch: [
        // 忽视这些目录的变化
        'node_modules',
        'logs',
        'public',
      ],
      node_args: '--harmony', // node的启动模式
      env: {
        NODE_ENV: 'development', // 设置运行环境，此时process.env.NODE_ENV的值就是development
        ORIGIN_ADDR: 'http://www.yoduao.com'
      },
      env_production: {
        NODE_ENV: 'production',
      },
      out_file: './logs/out.log', // 普通日志路径
      error_file: './logs/err.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
```

### 负载均衡

pm2厉害的点是，自动给你做负载均衡，只需要一条命令

```javascript
pm2 start server.js -i (number|max)
//开启三个进程运行项目
pm2 start app.js -i 3
//根据机器CPU核数，开启对应数目的进程运行项目
pm2 start app.hs 04-i max
```

> 配置文件里对应的：`"instance":(number|max)`

```javascript
//pm2 config.js
“instances”:2 //启动两个实例
```

## 配合pm2-web实现监控可视化

### 安装

```javascript
npm install -g pm2-web
```

### 使用

默认pm2-web会自动启动一个8080，但是我们还是喜欢可控状态，因此安装配置文件的方法启动

```javascript
pm2-web --config pm2-web-config.json
```

```javascript
{
    "www":{
        "host":"localhost",
         "address":"0.0.0.0",
          "port":6666   
    }
}
```

这样你就要可以在浏览器查看可视化的监控状态了

![img](https://user-gold-cdn.xitu.io/2018/11/9/166f7afa936b0fd7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

