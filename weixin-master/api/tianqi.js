var request = require('request');
var config = require('../config/config');
var tqConfig = config.wx_config.tq;


module.exports = function(word, callback) {
  if (!word) {
    request.get(tqConfig.ipURL, function(error, response, body) {
      var ipResult = JSON.parse(body);
      console.info(ipResult);
      var options = {
        url: tqConfig.ipToCityNameURL + ipResult.ip,
        headers: {
          'apikey': tqConfig.ipToCityNameApiKey
        }
      };
      request.get(options, function(error, response, body) {
        var cityNameResult = JSON.parse(body);
        console.info(cityNameResult);
        if (cityNameResult && cityNameResult.retData && cityNameResult.retData.city) {
          var city = cityNameResult.retData.city;
          getDataByCityName(city, function(json) {
            returnTqCallback(json, callback);
          });
        }else{
          callback('error');
        }
        //getDataByCityName(city, returnTqCallback(json,callback));

      });
    });
  } else {
    //getDataByCityName(word, callback);
    getDataByCityName(word, function(json){
      returnTqCallback(json,callback);
    });
  }
}

function returnTqCallback(json, _callback) {
  var content = '';
  if (!json.err) {
    return _callback('');
  }
  var data = json.msg;
  if (data && !data.errNum) {
    var today = data.retData;
    var todayStr = " " + today.city + "天气 " + today.weather + "\n";
    todayStr += "  当前时间 " + today.date+" "+today.time + "\n";
    todayStr += "  当前温度 " + today.temp + "摄氏度\n";
    todayStr += "  最低温度 " + today.l_tmp + "\n";
    todayStr += "  最高温度 " + today.h_tmp + "\n";
    todayStr += "  风力 " + today.WS + "\n";
    content = todayStr ;
  }
  _callback(content);
}

function getDataByCityName(word, callback) {
  word = encodeURIComponent(word);
  var options1 = {
    url: "http://apis.baidu.com/apistore/weatherservice/cityinfo?cityname=" + word,
    headers: {
      'apikey': tqConfig.weatherApikey
    }
  };
  request.get(options1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.info(body);
      var cityResult = JSON.parse(body);
      if (cityResult && !cityResult.errNum) {
        var options = {
          url: "http://apis.baidu.com/apistore/weatherservice/cityid?cityid=" + cityResult.retData.cityCode,
          headers: {
            'apikey': tqConfig.weatherApikey
          }
        };
        request.get(options, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.info(JSON.parse(body));
            callback({
              err: true,
              msg: JSON.parse(body)
            });
          }
        });
      } else {
        callback({
          err: true,
          msg: cityResult.retMsg
        });
      }
    }
  });
}
