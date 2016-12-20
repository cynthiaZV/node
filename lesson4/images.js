/**
 * Created by Administrator on 2016/12/14.
 */
var images = require('images');
var path = require('path');

var watermarkImg = images(path.join(__dirname, 'path/to/shuiying.jpg'));
var sourceImg = images(path.join(__dirname, 'path/to/target.jpg'));
var savePath = path.join(__dirname, 'path/to/saveImg.jpg');

// 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
var sWidth = sourceImg.width();
var sHeight = sourceImg.height();
var wmWidth = watermarkImg.width();
var wmHeight = watermarkImg.height();

images(sourceImg).draw(watermarkImg, sWidth - wmWidth - 10, sHeight - wmHeight - 10).save(savePath);