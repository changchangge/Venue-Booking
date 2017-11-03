// information.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    userIden: '0',
  },
  onLoad: function () {
    var that = this
    //获取用户信息
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getStorage({
      key: 'user_auth',
      success: function (res) {
        that.setData({
          userIden: res.data
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  mainInfo: function () {
    wx.navigateTo({
      url: 'account/account',
    })
  },
  history: function () {
    wx.navigateTo({
      url: 'history/history',
    })
  },
  authority: function () {
    wx.navigateTo({
      url: 'authority/authority',
    })
  },
  aboutUs: function () {
    wx.navigateTo({
      url: 'about/about',
    })
  },
})
