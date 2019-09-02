1. get和post区别
  - get用来获取数据，post用来提交数据
  - get参数有长度限制(受限于url长度，具体的数值取决于浏览器和服务器的限制)，而post无限制
  - get请求的数据会附加到url之上，以"?"分割url和传输数据，多个参数用"&"连接，而post请求是把请求的数据放在http请求体中
  - get请求会保存在浏览器历史记录中，还可能保存啊在web服务器的日志中
  - get比post更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
2. HTTP状态码及其含义
  - 1xx: 信息状态码
     + 100 继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
  - 2xx: 成功状态码
     + 200 Ok 正常返回信息
     + 201 Created 请求成功并服务器创建了新的资源
     + 202 Accepted 服务器已接收请求，单尚未处理
  - 3xx 重定向
     + 301 请求的网页已永久移动到新位置
     + 302 临时性重定向
     + 304 自从上次请求后，网页未修改过
  - 4xx 客户端错误
     + 400 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发送请求
     + 401 请求未授权
     + 403 禁止访问
     + 404 找不到如何与URI 想匹配的资源
  - 5xx 服务器错误
     + 500 最常见的服务器端错误
     + 503 服务器端暂时无法处理请求
3. AJax原理
  Ajax的原理简单来说就是在用户和服务器之间加了一个中间层(Ajax引擎)，通过xmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面。使用户操作与服务器响应异步化，这其中关键的异步是从服务器获得请求数据
  Ajax的过程值涉及JavaScript，XMLHttpRequest和DOM,XMLHttpRequest是ajax的核心机制

  ```
    //1,创建连接
    var xhr = null;
    xhr = new XMLHttpRequest()
   //2.连接服务器
   xhr.open('get',url,true)
   //3. 发送请求
   xhr.send(null);
   //4.接收请求
   xhr.onreadystatechange = function(){
     if(xhr.readyState ==4){
        if(xhr.status ==200){
            success(xhr.responseText)
        }else{
            fail && fail(xhr.status);
        }
     }
   } 
  ```        
4. 为什么要有同源限制
  - 同源策略指的是：协议，域名，端口号相同，同源策略是一种安全协议
  - 是为了预防某些恶意行为，浏览器限制了从同一个源文件的文档或脚本如何与来自另一个源的资源进行交互
5. HTTP 和HTTPS的概念

HTTP: 超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务端请求和应答的标准(TCP)，用于从www服务器传输超文本到本地浏览器对的传输协议，它可以使浏览器更加高效，使网络传输减少

HTTPS: 是以安全为目标的HTTP通道，简单的来讲是HTTP的安全版,即HTTP下加入SSL层

HTTP和HTTPS的区别
  
  - HTTP协议需要ca证书，费用较高
  - http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议
  - 使用不同的链接方式，端口也不同，一般而言，http协议的端口为80，https的端口为443
  - http的链接很简单，是无状态的，HTTPS协议是由SSL+HTTP协议构建的可进行加密传输，身份认证的网络协议，比http协议安全
 
HTTPS协议的优点
  
  - 使用HTTPS协议可以认证用户和服务器，确保数据发送到正确的客户机和服务器
  - HTTPS协议是由SSL+HTTP协议构建的可进行加密传输，身份认证的网络协议，要比http协议安全，可防止数据在传输过程中不被窃取，改变，确保数据的完整性
  - HTTPS是现行框架最安全的解决方案，虽然不是绝对安全，但是它大幅度增加了中间人攻击的成本

HTTPS的缺点
   
   - hTTPS握手阶段比较费时，或使网页加载时间延长50%，增加10%~20%的耗电
   - https缓存不如http高效，会增加数据开销
   - SSL证书需要钱，功能越强大的证书费用越高
   - SSL证书需要绑定IP，不能再同一个IP下绑定多个域名

6. 简介TCP三次握手

三次握手，实际上就是Client和Server端建立稳定TCP连接的发送三个包的过程

![三次握手](https://user-gold-cdn.xitu.io/2019/8/18/16ca31b2b22d223a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

三次握手：客户端发送请求连接服务端确认，也发送连接客户端确认。第一次握手:服务端只可以去人自己可以接受客户端发送的报文段第二次握手：客户端可以确认服务端收到了自己发送的报文段，并可以确认自己可以接受服务端发送的报文段，第三次握手：客户端和服务端正式连接

SYN(联机) ACK(确认) FIN(结束)   
- 第一次握手:(SYN=1,ACK=0,seq=x);
  客户端发送SYN标志位1的包到Server，以及初始化序号x(保存在包头的序列号seq字段，简称ISN)，ACK标志位为0，并进入SYN_SEND状态，等待服务端确认
- 第二次握手(SYN=1, ACK=1, seq=y, ack=x+1)   
Server发回确认包(ACK)应答。即 SYN 标志位和 ACK 标志位均为1。Server确认ISN序列号，放到seq域里，同时将确认序号(ack)设置为Client的ISN加1，即x+1。 发送完毕后，Server进入 SYN_RCVD 状态。
- 第三次握手(ACK=1，seq=x+1，ack=y+1)
Client再次发送确认包(ACK)，ACK标志位为1，并且把Server发来ISN的序号字段+1，放在确定字段中发送给对方。


7.  WebStocket的实现和应用

- 什么是WebSocket?

WebSocket是HTML5中的协议，支持持久连接，http协议不支持持久性连接。http1.0和http1.1都不支持持久性的连接，HTTP1.1中keep-alive，将多个http请求合并为1个

- WebSocket是什么样的协议，具体有什么优点？

  + HTTP的生命周期是通过Request来界定，也就是一个Request有一个Response，那么在HTTP1.0协议中，这次HTTP请求就结束了，在Http1.1中进行了改进，新增了connection:Keep-alive,也就是说在一个HTTP连接中可以发送多个Request，接收多个Response，但事实必须记住，在HTTP中一个REquest志能不能对应有一个Response。而且这Response是被动的，不能主动发起
  + WebStoket是基于HTTP协议的，或者借用了HTTP协议来完成一部分握手，在握手阶段与HTTP是相同的。我们来看一个websocket握手协议的实现，基本是2个属性，upgrade。connection

基本请求如下：
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```  

多了下面两个属性：
```
Upgrade:webSocket
Connection:Upgrade
告诉服务器发送的是websocket
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

8. Cookie，sessionSstorage,localStorage的区别

共同点： 都是保存在浏览器端，并且是同源的

- Cookie: Cookie是数据始终在同源的http请求中携带，即cookie在浏览器和服务器件来回传递。而SessionStroage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径的概念，可以限制cookie只属于某个路径下，存储的大小很小只有4k左右

- SessionStorage: 仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持，localStorage始终有效，窗口或浏览器关闭也一致保存，因此用作持久数据l；cookie值在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。（key:本身就是一个回话过程，关闭浏览器后消失，session为一个回话，当页面不同即使同一页面打开两次，也被视为同一次回话）

-localStorage: localStorage在所有同源窗口中都是共享的;cookie也是在所有同源窗口中都是共享的(同源窗口都会共享，并且不会失效，不管窗口或者浏览器关闭与否都会始终生效)

补充说明一下cookie的作用：

- 保存用户登录状态。例如将用户id存储于一个cookie内，这样当用户下次访问该网页时就不需要重新登录了，现在很多论坛和社区都提供这样的功能，cookie还可以设置过期时间，当超过时间期限后，cookie就会自动消失。因此，系统往往可以提示用户保持登录状态的时间；常见选项有一个月，三个月，一年等

- 跟踪用户行为。例如一个天气预报网站，能够根据用户选择的地区显示当地的天气状况，如果每次都需要选择所在地是繁琐的，当利用cookie后就会显示很人性化了，系统能够记住上一次访问的地区，当下次再打开该页面时，就会自动显示上次用户所在的天气情况，以为一切都在后台完成，所以这样的页面就像为某个用户所指定的一样，使用起来非常方便

- 定制页面，如果网站提供了换肤或者更换布局的功能，那么可以使用cookie来记录用户的选项

9. script标签的defer,async的区别

defer是在HTML标签解析完之后才会执行，如果是多个，按照加载的顺序依次执行
async是在加载完成后立即执行，如果是多个，执行顺序和加载顺序无关
