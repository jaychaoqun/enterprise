//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    baseurl:"http://jaa.ngrok.cc/web1"
  },
  getJSON:function(url,data,callback){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    const baseurl = this.globalData.baseurl;
    wx.request({
      url: baseurl+url, //仅为示例，并非真实的接口地址
      data: data,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) { 
        wx.hideToast();
        if(res.statusCode == 200){
          if(res.data.code == 1){
            callback.call(null,res.data);
          }else if(res.data.code == 0){
             console.log("fail");
            //请求失败
          }else{
            //错误
          }
        }else{
          //请求错误
        }
      },
      fail:function(){//接口调用失败的回调函数
          console.log("fail");
      }
    })
  }
})