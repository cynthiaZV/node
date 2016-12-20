/**
 * Created by Administrator on 2016/12/9.
 */
var http = require('http')
var fs = require('fs')
/*http.get("http://www.55x.cn/plus/download.php?open=2&id=35526&uhash=b0ef2fab8fbb02d365625c8c", function (response) {
    response.setEncoding('binary');  //二进制binary
    var Data = '';
    response.on('data', function (data) {    //加载到内存
        Data += data;
    }).on('end', function () {          //加载完
        fs.writeFile("demo.zip", Data , function () {
            console.log('ok')
        });
    })
})*/

var charset = require('superagent-charset');
var eventproxy = require('eventproxy');
var superagent = charset(require('superagent'));
var cheerio = require('cheerio');
superagent.get("http://www.55x.cn/plus/download.php?open=2&id=35526&uhash=b0ef2fab8fbb02d365625c8c").end(function(err,res){
    if (err) {
        return console.error(err);
    }
    var $ = cheerio.load(res.data);
    fs.writeFile("demo.zip", $ , function () {
        console.log('ok')
    });
});