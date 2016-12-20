/**
 * Created by Administrator on 2016/12/12.
 */
var charset = require('superagent-charset');
var eventproxy = require('eventproxy');
var superagent = charset(require('superagent'));
var cheerio = require('cheerio');
var url = require('url');
var http = require('http');
var fs = require('fs');

var cnodeUrl = 'http://zzt.tingyun.com:8083/newlens-saas/provider/logon/proginn/back';

var data={
    "code" : "test"
};
superagent.post(cnodeUrl).type('form')
    .send('{"code":"tj"}')
    .end(function(err,res){

});