# HTTP协议(2)

## URL与URI

+ URI：一个紧凑的字符串用来标志抽象或物理资源

+ a URI 可以进一步被分别定位符，名字或两者都是
+ URL是URI的子集，除了确定一个资源，还提供一个定位该资源的主要访问机制
+ URI可以分为URL，URN或同时具备locators和names特性的一个东西
+ URN作用就好像是一个名字，URL就像一个人的地址 换句话说：URN确定了东西的身份，URL提供了找到它的方式
+ URL是URI的一种，但不是所有的URI都是URL
+ URI和URL最大的差别是“访问机制”
+ URN是唯一标识的一部分，是身份信息

## HTTP报文结构分析--请求报文

![1583076961692](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583076961692.png)

### HTTP报文头

+ HTTP的报文头大体可以分为四类，分别是：通用报文头，请求报文头，响应报文头和实体报文头

![1583077245034](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583077245034.png)

![1583077270349](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583077270349.png)

![1583077331618](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583077331618.png)

![1583077342991](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583077342991.png)

Accept

作用： 浏览器端可以接受的媒体类型

Accept：text/html代表浏览器可以接受服务器回发的类型为text/html也就是我们常说的html文档，如果服务器无法返回text/html类型的数据，服务器应该返回一个406错误

Accept:`*/*`代表浏览器可以处理所有类型

Accept-Encoding

作用:浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法(gzip,deflate)

Accept-language

作用浏览器申明自己接收的语言

`Accept-language:zh-cn,zh;q=0.7,en-us:q=0.3`

客户端在服务器有中文版资源的情况下，会请求其返回中文版对应的响应，没有中文版时，则请求返回英文版响应

Connection

+ Connection：keep-alive 当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接

+ Connection:close 代表一个Request完成后，客户端和服务器之间用于传输HTTP数据的TCP连接会关闭，当客户端再次发送Request，需要重新建立TCP连接

HOST

 作用：请求报文头主要用于指定被请求资源的Internet主机和端口号，它通常从HTTP URL中提取出来的

Referer

当浏览器向web服务器发送请求的时候，一般会带上Referer，告诉服务器我们是从哪个页面连接过来的，服务器借此可以告诉一些信息用于处理

User-Agent

作用：告诉HTTP服务器，客户端使用的操作系统和浏览器的名称和版本

很多情况下我们通过User-Agent来判断浏览器类型，从而进行不同的兼容设计

Content-Type

作用：说明了报文体内对象的媒体类型

text/html: HTML格式

text/plain: 纯文本格式

text/xml XML格式

image/png png图片格式

### 响应报文

![1583078484397](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583078484397.png)

## 状态码

是用于表示网页服务器超文本传输协议响应状态的3位数字代码

![1583078612552](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583078612552.png)

常用的HTTP状态码

![1583078660032](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583078660032.png)

![1583078707213](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583078707213.png)

![1583078720415](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583078720415.png)

![1583078763996](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583078763996.png)

## HTTP状态管理：Cookie与Session

### Cookie

+ Cookie实际上是一小段的文本信息。客户端请求服务器，如果服务器需要记录该用户状态，就向客户端颁发一个Cookie
+ 客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie异同提交给服务器。服务器检查该Cookie,以此来辨认用户状态

![1583234870319](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583234870319.png)

![1583234950640](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583234950640.png)

### Session

+ Session是另一种记录客户状态的机制，保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上
+ 客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了

![1583235181126](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583235181126.png)

保存Session ID的方式

+ Cookie

+ URL重写

+ 隐藏表单

Session的有效期

+  Session超时失效
+  程序调用HttpSession.invalidate()
+  服务器进程被停止

Cookie与Session

+  存放的位置不同
+  安全性(隐藏策略)的不同
+  有效期上的不同
+  对服务器压力的不同

## HTTP协议结构和通讯原理

### 字符集与编码

![1583235842098](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583235842098.png)

  

  ![1583236012490](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583236012490.png)

  

URL的编码与解码

+ URL是采用ASCII字符集进行编码的，所以如果URL中含有非ASCII字符集中的字符，要对其进行编码
+ URL中一些保留字符，如“&”表示参数分隔符，如果想要在URL中使用这些保留字，那就需要编码

+ ”%编码“规范
+ 对URL中属于ASCII字符集的非保留字不做编码；对URL中保留字需要取其ASCII内码，然后加上“%”前缀将该字符进行编码；对于URL中的非ASCII字符需要取其Unicode内码，然后加上"%"前缀将字符进行编码。

## 身份认证

身份认真信息

+ 密码
+ 动态令牌
+ 数字认证
+ 生物认证
+ IC卡等

常见的认证方式

+ BASIC认证(基本认证)

![1583236608578](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583236608578.png)

![1583236711425](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583236711425.png)

+ DIGEST认证(摘要认证)

为弥补BASIC认证存在的弱点，从HTTP/1,1起就有了DIGEST认证

DIGEST认证同样使用质询/响应的方式，但不会像BASIC认证那样直接发送明文密码

![1583236977186](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583236977186.png)

+ SSL客户端认证

SSL客户端认证是借由HTTPS的客户端证书完成认证的方式。凭借客户端证书认证，服务器可确认访问是否来自已登录的客户端。

+ FormBase认证(基于表单认证)

基于表单的认证方法并不是在HTTP协议中定义的，使用由web应用程序各自实现基于表单的认证方式，使用Cookie和Session的方式来保护用户登录状态

## HTTP的长连接与短连接

+ HTTP协议是基于请求/响应模式的，因此只要服务端给了响应，本次HTTP请求就结束了

+ HTTP的长连接和短连接本质上是TCP长连接和短连接

+ HTTP/1.0中，默认使用的是短连接。也就是说，浏览器和服务器每进行一次HTTP操作，就建立一次连接，结束就中断
+ HTTP/1.1起，默认使用长连接，用于保持连接特性。

短连接

建立连接----数据传输----关闭连接------建立连接----数据传输----关闭连接

长连接

建立连接----数据传输---(保持连接)----数据传输-----关闭连接

## HTTP中介之代理

![1583237668853](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583237668853.png)

典型的代理服务器

![1583237784216](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583237784216.png)

抓包

![1583237817429](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583237817429.png)

过滤器

![1583237872257](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583237872257.png)

## HTTP中介之网关

+ 网关可以作为某种翻译器使用，它抽象出了一种能够达到资源的方法。网关是资源和应用程序之间的粘合剂
+ 网关扮演的是"协议转换器"的角色

![1583238054052](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583238054052.png)

web网关在一侧使用HTTP协议，在另一侧使用另一种协议<客户端协议>/<服务器端协议>

（HTTP/）服务器端网关：通过HTTP协议与客户端对话，通过其他协议与服务器通信

  (/HTTP)客户端网关：通过其他协议与客户端对话，通过HTTP协议与夫妻器通信

常见的网关类型

+ (HTTP/*)服务器端web网关
+ (HTTP/HTTPS) 服务器端安全网关
+ (HTTPS/HTTP)客户端安全加速器网关
+ 资源网关

## HTTP缓存

### HTTP缓存头部字段

+ Cache-Control

请求/响应头，缓存控制字段
no-store: 所有内容都不缓存
no-cache: 缓存，但是浏览器使用缓存前，都会请求服务器判断缓存资源是否是最新
max-age=x(单位秒)请求缓存后的X秒不再发起请求
s-maxage=x(单位秒)代理服务器请求源站缓存后的X秒不再发起请求，只对CDN缓存有效
public 客户端和代理服务器(CDN)都可缓存
private只有客户端可以缓存

+ Last-Modified

响应头，资源最新修改时间，由服务器告诉浏览器。

+ if-Modified-Since

请求头，资源最新修改时间，由浏览器告诉服务器，和Last-Modified 是一对，它两会进行对比

### HTTP缓存工作方式
+ 场景一：让服务器与浏览器约定一个文件过期时间---Expires
+ 场景二： 让服务器与浏览器在约定文件过期时间的基础上，再加一个文件最新修改时间的对比---- Last-Modified 与if-Modified-Since 
+ 场景三: 让服务器与浏览器在过期时间Expires+Last-Modified 的基础上，增加一个文件内容标记---- Etag与if-None-Match。Expires不稳定，再加上一个max-age来加以代替

缓存改进方案
+ Md5/hash缓存

通过不缓存html，为静态文件添加MD或者hash标识，解决浏览器无法跳过缓存过期时间主动感知文件变化的问题

+ CDN缓存

CDN是构建在网络之上的内容分发网络，依赖部署在各地的边缘服务器，通过中心平台的负载均衡，内容均衡，内容分发，调度等功能模块，使用户就近获取所需要内容，降低网络拥塞，提高用户访问响应速度和命中率

![1583239720768](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583239720768.png)

![1583239733641](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583239733641.png)

![1583239774269](C:\Users\刘如刚\AppData\Roaming\Typora\typora-user-images\1583239774269.png)

## 内容协商机制

+ 指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端滋味合适的资源。内容协商会以响应资源的语言，字符集，编码方式等作为判断的基准。

内容协商方式

+ 客户端驱动

客户端发起请求，服务器发送可选项列表，客户端做出选择后在发送第二次请求。

+ 服务器驱动

服务器检查客户端的请求头部集并决定提供哪个版本的页面

+ 透明协商

某个中间设备(通常是缓存代理)代表客户端进行协商

服务器驱动内容驱动协商---请求首部集

+ Accept ： 告知服务器发送何种媒体类型
+ Accept-Language: 告知服务器发送何种语言
+ Accept-Charset： 告知服务器发送何种字符集
+ Accept-Encoding: 告知服务器采用何种编码

