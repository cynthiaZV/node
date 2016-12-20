/**
 * Created by Administrator on 2016/12/15.
 */
var http = require("http");
var url  = require("url");
//进行函数传递
//基于事件驱动的函数回调


function start(){
    http.createServer(onRequest).listen("8080",function(){
        console.info("server start");
    });

    function onRequest(req,res){

        console.dir(req.url);
        var pathname = url.parse(req.url).pathname;
        console.dir(pathname);
        res.writeHead("200",{"Content-Type":"text/plain"});
        res.write("<h1>测试地址下载</h1>");
        res.end(pathname);
    }
}


exports.start = start;