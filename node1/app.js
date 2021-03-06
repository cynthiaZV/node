/**
 * Created by Administrator on 2016/12/9.
 */
var express = require('express');
var app = express();


var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];


app.set('port', process.env.PORT || 3000);

// 设置 handlebars 视图引擎
var handlebars = require('express3-handlebars')
    .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
/*app.get('/', function (req, res) {
 res.type('text/plain');
 res.send('Meadowlark Travel');
 });
 app.get('/about', function (req, res) {
 res.type('text/plain');
 res.send('About Meadowlark Travel');
 })

 app.use(function (req, res) {
 res.type("text/plain");
 res.status(404);
 res.send('404 - Not Found');
 })
 app.use(function (err, req, res, next) {
 console.error(err.stack);
 res.type('text/plain');
 res.status(500);
 res.send('500 - Server Error');
 });*/
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function (req, res) {
    var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune })
});
// 404 catch-all 处理器（ 中间件）
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 错误处理器（ 中间件）
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});