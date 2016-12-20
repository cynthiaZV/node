var charset = require('superagent-charset');
var eventproxy = require('eventproxy');
var superagent = charset(require('superagent'));
var cheerio = require('cheerio');
var url = require('url');
var cnodeUrl = 'http://www.55x.cn/html/dushi/list_36_1.html';

var http = require('http')
var fs = require('fs')

superagent.get(cnodeUrl).end(function(err,res){
    var $ = cheerio.load(res.text);
    var pageCount= $('.pageinfo strong').eq(0).text();
    //console.log('total pags is '+pageCount);

    for(var i=1;i<=pageCount;i++){
        var pageUrl = 'http://www.55x.cn/html/dushi/list_36_'+i+".html";
        //console.info(pageUrl);
        getListPageTitleLink(pageUrl);
    }
})
function  getListPageTitleLink(url){
    superagent.get(url)
        .end(function (err, res) {
            if (err) {
                return console.error(err);
            }
            var topicUrls = [];
            var $ = cheerio.load(res.text);
            $('.xiashu .qq_g a').each(function (idx, element) {
                var $element = $(element);
                //console.info($element.attr('href'));
                var downloadUrl = "http://www.55x.cn/html/dushi/"+$element.attr('href').split("/")[3];
                getDownloadLink(downloadUrl);
                //var href = url.resolve(cnodeUrl, $element.attr('href'));
                //topicUrls.push(href);
            });

            /*var ep = new eventproxy();

             ep.after('topic_html', topicUrls.length, function (topics) {
             topics = topics.map(function (topicPair) {
             var topicUrl = topicPair[0];
             var topicHtml = topicPair[1];
             var $ = cheerio.load(topicHtml);
             return ({
             title: $('.topic_full_title').text().trim(),
             href: topicUrl,
             comment1: $('.reply_content').eq(0).text().trim(),
             });
             });

             console.log('final:');
             console.log(topics);
             });

             topicUrls.forEach(function (topicUrl) {
             superagent.get(topicUrl)
             .end(function (err, res) {
             console.log('fetch ' + topicUrl + ' successful');
             ep.emit('topic_html', [topicUrl, res.text]);
             });
             });*/
        });
}
function getDownloadLink(url){
    //console.info(url);
    superagent.get(url).charset('gb2312').end(function(err,res){
        if (err) {
            return console.error(err);
        }
        var $ = cheerio.load(res.text);
        var path = $('.xiaye a').eq(0).attr("href");
        //console.info(path);
        var pathUrl = "http://www.55x.cn"+path;
        var filename = $('.shuji b').eq(0).text();
        getIOPath(pathUrl,filename);
    });
}


function getIOPath(url,filename){
   // console.info(url);
    superagent.get(url).end(function(err,res){
        if (err) {
            return console.error(err);
        }
        var $ = cheerio.load(res.text);
        var path = $('.shuji a').eq(0).attr("href");
        //console.info("======================================"+path);
        var pathFull = "http://www.55x.cn"+path;
        console.info(filename+"<===============>"+pathFull);
        down(pathFull,filename);
    });
}

function down(url,filename){
    http.get(url, function (response) {
        response.setEncoding('binary');  //二进制binary
        var Data = '';
        response.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            fs.writeFile(filename+".rar", Data , function () {
                console.log('ok')
            });
        })
    })
}