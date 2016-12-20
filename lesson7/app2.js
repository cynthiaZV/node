/**
 * Created by Administrator on 2016/12/19.
 */
var koa = require('koa'),
    co = require('co'),
    fs = require('fs'),
    request = require('co-request');
var route = require('koa-route');
var WechatAPI = require('wechat-api');
var wechat = require('koa-wechat');

//初始化 koa框架
var app = koa();

exports.init = function(app) {
    app.use(wechat({ token: 'your token' }));
    app.use(route.post('/api/wechat', postFun));
};

//因为服务器多进程，故需要保存token到全局，其他参见wechat-api文档
var api = new WechatAPI('appid', 'appsecret', function(callback) {
    // 传入一个获取全局token的方法
    fs.readFile('access_token.txt', 'utf8', function(err, txt) {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(txt));
    });
}, function(token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    fs.writeFile('access_token.txt', JSON.stringify(token), callback);
});


var weixin = {
    appid: 'appid',
    appsecret: 'appsecret',
    prefix: 'https://api.weixin.qq.com/cgi-bin/',
    mpPrefix: 'https://mp.weixin.qq.com/cgi-bin/',
    fileServerPrefix: 'http://file.api.weixin.qq.com/cgi-bin/',
    payPrefix: 'https://api.weixin.qq.com/pay/',
    merchantPrefix: 'https://api.weixin.qq.com/merchant/',
    customservicePrefix: 'https://api.weixin.qq.com/customservice/'
};

//这里是在最初的时候运行下创建一个'access_token.txt，（因为在设置token为全局后总是不成功，怀疑初始化没有获取token）有更好的办法可以交流
function* getAccessToken() {
    console.log("getAccessToken start");
    var url = weixin.prefix + 'token?grant_type=client_credential&appid=' + weixin.appid + '&secret=' + weixin.appsecret;
    var response = yield request.get(url);
    var result = JSON.parse(response.body);
    console.log('result', result);
    weixin.token = result.access_token;
    console.log("token", weixin.token);
    return weixin.token;
}

function* postFun(next) {
    console.log("**************postFun***********");
    var info = this.req.body
    console.log("postFun info", info);
    console.log("info raw", info.raw);
    if (info.type === 'text') {
        if (info.raw.Content == '你好') {
            this.body = {
                content: '你好',
                type: 'text'
            }
        } else {
            this.body = {
                type: "music",
                content: {
                    title: "什么都不说了,来段音乐吧",
                    description: "一路上有你",
                    musicUrl: "http://www.xxxxx.com/yilushangyouni.mp3",
                    hqMusicUrl: "http://www/yilushangyouni.mp3",
                    thumbMediaId: "thisThumbMediaId"
                }
            }
        }
    } else if (info.type === 'event') {
        if (info.raw.Event === 'subscribe') { //添加关注事件
            console.log("用户：" + info.uid + "新添加了关注");
            this.body = {
                content: '你好,欢迎',
                type: 'text'
            };
        } else {
            console.log('event::', info.raw);
        }
    } else {
//经试验这个是有问题的，实际是没法播放的，估计是需要上传到微信服务器
        this.body = {
            type: "music",
            content: {
                title: "什么都不说了,来段音乐吧",
                description: "一路上有你",
                musicUrl: "http://sc.111ttt.com/up/mp3/239837/2DF7A5657F60BE1DEF33B8DC3EA42492.mp3",
                hqMusicUrl: "http://sc.111ttt.com/up/mp3/239837/2DF7A5657F60BE1DEF33B8DC3EA42492.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        }
    }
    console.log("************** postFun end ***********");
}

var menu = {
    "button": [{
        "name": "父按钮",
        "sub_button": [{
            "type": "view",
            "name": "子按钮",
            "url": "http://www."
        }, {
            "type": "view",
            "name": "子按钮",
            "url": "http://www."
        }, {
            "type": "view",
            "name": "子按钮",
            "url": "http:/"
        }]
    }, {
        "name": "父按钮",
        "sub_button": [{
            "type": "view",
            "name": "子按钮",
            "url": "http:"
        }, {
            "type": "view",
            "name": "子按钮",
            "url": "http:"
        }]
    }, {
        "name": "父按钮",
        "sub_button": [{
            "type": "view",
            "name": "关于我",
            "url": "http:"
        }, {
            "type": "view",
            "name": "遇到我",
            "url": "http:"
        }, {
            "type": "view",
            "name": "联系我们",
            "url": "http:"
        }]
    }]
};


//创建菜单函数，只为了试验有效性，更多API参考官方文档
function* appMenu() {
    console.log('appMenu start');
    yield api.createMenu(menu, function(err, result) {
        if (err) {
            throw err
        };
        console.log('appMenu', result);
    });
    console.log('appMenu end');
}
//只是为了试验而执行了一下，自己根据需要执行
co(appMenu());


/*// x-response-time

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
    console.info(this.request.query.echostr);
    this.body = this.request.query.echostr;
});

app.listen(3000);*/
console.info("LifeLoading weChat server start at port : 3000 ");