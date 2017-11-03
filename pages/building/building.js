// building.js
var app = getApp()
var allurl = 'https://zzzz.natapp4.cc/wx/';

Page({
  data: {
    listhide: false,
    buildings: [],
  },
  onLoad: function () {
    var that = this;
    //请求服务器数据
    wx.request({
      url: allurl + 'detail',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'user_num': wx.getStorageSync('user_num'),
        'room_name': 'none',
        'parent': 'NONE',
      },
      //请求成功返回建筑物列表
      success: function (res) {
        that.setData({
          listhide: true,
        });
        var jsonText = [];
        for (var i = 0; i < res.data.length; i++) {
          var dg = JSON.parse(res.data[i]);
          var count = jsonText.push(dg);
        }
        var more_detail = [];
        var buildings = [];
        console.log(jsonText);
        for (var i = 0; i < res.data.length; i++) {
          var str = jsonText[i].Value.more_detail
          var detail = str.split(/<split1>|--LongSplitString--|<split2>/);
          var item = {};
          item.name = jsonText[i].Value.building_name;
          item.id = jsonText[i].Value.id
          item.src = 'https://zzzz.natapp4.cc/Content/building_img/' + jsonText[i].Value.img;
          item.capacity = detail[0];
          item.address = detail[1];
          item.phone = detail[3];
          buildings.push(item)
        }
        that.setData({buildings:buildings});
      },
      fail: function (err) {
        wx.showToast({
          "title": "加载失败",
          "icon": "loading",
          "duration": 2000
        })
      },
      complete: function() {
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    setTimeout(
      function() {
        that.onLoad();
      },2000
    )
    wx.stopPullDownRefresh();
  },
  toNextPage: function (e) {
    for (var i = 0; i < this.data.buildings.length; i++) {
      if (e.currentTarget.id == this.data.buildings[i].id.toString()) break;
    }
    wx.navigateTo({
      url: '../classroom/classroom?buildings=' + JSON.stringify(this.data.buildings[i]),
    })
  }
})
