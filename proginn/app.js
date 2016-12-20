/**
 * Created by Administrator on 2016/12/13.
 */
var express = require('express');
var app = express();


app.get('/oauth2/authorize', function(req, res){
    var backUrl = req.query["redirect_uri"];
    var code = "test";
    var url  = backUrl+"?code="+code;
    //console.info(url);
    //res.location(url);
    res.redirect(301, url);

});
app.post('/oauth2/access_token', function(req, res){
    var token={
        "token_type": "Bearer",
        "expires_in": 3600,
        "access_token": "TOKEN",
        "uid": 123
        };
    res.json(token);
});
app.post('/openapi/user/basic_info', function(req, res){
    var userInfo={
        "uid": 123,
        "avatar": "http://domain/avatar.jpg",
        "nickname": "ssss"
    };
    res.json(userInfo);
});
app.listen(9090);
console.log("reload server");