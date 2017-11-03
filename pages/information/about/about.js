// about.js
var app = getApp()
var allurl = 'https://zzzz.natapp4.cc/wx/';
Page({
  data: {
    phone: '84115662',
  },
  contact: function() { 
    var phone = JSON.stringify(this.data.phone)
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

})