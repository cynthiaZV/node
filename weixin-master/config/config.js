module.exports = {
  wx_config: {
    aotu: {
      token: 'test',
      appid: 'wxe15948b01f837dc1',
      secret: 'd4624c36b6795d1d99dcf0547af5443d',
      cached: {},
      menu: {
        "button": [{
          "name": "关于我",
          "sub_button": [{
            "type": "view",
            "name": "博客",
            "url": "http://www.cnblogs.com/tom-zhu"
          }, {
            "type": "view",
            "name": "JSSDK",
            "url": "http://hhqqnu163.ngrok.cc/jssdk"
          },{
            "type": "view",
            "name": "登录",
            "url": "http://verazzt.tunnel.2bdata.com/api/login"
          }]
        }, {
          "name": "生活工具",
          "sub_button": [{
            "type": "click",
            "name": "天气",
            "key": "getlocationweather",
            "sub_button": []
          }, {
            "type": "location_select",
            "name": "发送位置",
            "key": "location_select",
            "sub_button": []
          }, {
            "type": "click",
            "name": "我的信息",
            "key": "my_info",
            "sub_button": []
          }]
        }, {
          "name": "开发小工具",
          "sub_button": [{
            "type": "scancode_push",
            "name": "扫码推事件",
            "key": "scancode_push",
          }, {
            "type": "scancode_waitmsg",
            "name": "扫码带提示",
            "key": "scancode_waitmsg"
          }, {
            "type": "pic_sysphoto",
            "name": "系统拍照发图",
            "key": "pic_sysphoto",
            "sub_button": []
          }, {
            "type": "pic_photo_or_album",
            "name": "拍照或者相册发图",
            "key": "pic_photo_or_album",
            "sub_button": []
          }, {
            "type": "pic_weixin",
            "name": "微信相册发图",
            "key": "pic_weixin",
            "sub_button": []
          }]
        }]
      }
    },
    tq: {
      "ipURL": "http://whois.pconline.com.cn/ipJson.jsp?json=true",
      "ipToCityNameURL": "http://apis.baidu.com/apistore/iplookupservice/iplookup?ip=",
      "ipToCityNameApiKey": "60948e88e1db38d8d08e8a9347d14c0b",
      'cityUrl': 'http://apistore.baidu.com/microservice/cityinfo?cityname=',
      'weatherApikey': '60948e88e1db38d8d08e8a9347d14c0b',
      'weatherUrl': 'http://apis.baidu.com/apistore/weatherservice/cityname?cityname='
    }
  }
};
