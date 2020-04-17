/**
 * Created by 刘如刚 on 2020/4/17.
 */
const url = require('url');

require('http').createServer((req, res)=>{
    const data={
        x:10
    };
    const callback =url.parse(req.url, true).query.callback;
    console.log(callback);
    res.writeHead(200);
    res.end(`${callback}(${JSON.stringify(data)})`);
}).listen(3000,'127.0.0.1');

console.log('启动服务器,监听127.0.0.1');

