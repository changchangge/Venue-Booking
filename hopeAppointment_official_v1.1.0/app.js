//app.js
///快点绑定微信开发平台，弄unionID
App({

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    var logs = wx.getStorageSync('logs') || []
    var allurl = 'https://zzzz.natapp4.cc/wx/';
    //请求用户信息
    wx.getUserInfo(function (userInfo) {
      wx.setStorageSync("userInfo", userInfo);
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          that.setData({
            userInfo: res.data
          })
          console.log(that.data.userInfo)
        }
      })
    })
    //调用登录API
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: allurl + 'login',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              'js_code': res.code,
            },
            success: function (res) {
              let tap = res.data;
              console.log(tap);
              wx.setStorageSync("user_auth", tap.identigy);
              wx.setStorageSync("user_num", tap.user_num);
              wx.getStorage({
                key: 'user_auth',
                success: function (res) {
                  console.log('权限值' + res.data)
                }
              })
              if (tap.msg == 'success') {
                console.log('登陆成功');
                wx.request({
                  url: allurl + 'detail',
                  method: 'POST',
                  header: { 'content-type': 'application/x-www-form-urlencoded' },
                  data: {
                    'user_num': wx.getStorageSync('user_num'),
                    'room_name': 'none',
                    'parent': 'NONE',
                  },
                  success: function (llo) {
                    console.log('建筑物')
                    console.log(llo)
                    wx.request({
                      url: allurl + 'my',
                      method: 'POST',
                      header: { 'content-type': 'application/x-www-form-urlencoded' },
                      data: {
                        'user_num': wx.getStorageSync('user_num'),
                        'target': 'mybook',
                      },
                      success: function (qaq) {
                        console.log('预约信息')
                        console.log(qaq)
                      }
                    })
                  }
                })
              };
              if (tap.msg == 'require register') {
                wx.getUserInfo({
                  withCredentials: true,
                  success: function (atp) {
                    wx.request({
                      url: allurl + 'register',
                      method: 'POST',
                      header: { 'content-type': 'application/x-www-form-urlencoded' },
                      data: {
                        'user_num': wx.getStorageSync('user_num'),
                        'encryptedData': atp.encryptedData,
                        'iv': atp.iv,
                      },
                      success: function (iop) {
                      }
                    })
                  }
                })
              }

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getUserInfo: function (cb) {
    console.log('getInfo')
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  globalData: {
    userInfo: null,
  }
})

//注意，要写一个函数自定义读取storage,每次读写前判断是否存在，是否过期（另存过期时间），过期后要重新login获取user_num，未过期则要刷新过期时间