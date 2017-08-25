// building.js
//获取应用实例
var app = getApp()
var allurl = 'https://zzzz.natapp4.cc/wx/';
Page({
  data: {
    listhide: false,
    buildings: [
      {
        id: 0,
        name: '',
        address: '',
        capacity: '',
        equip: '',
        phone: '',
        src: '',
        mode: 'aspectFill',
      },
    ],

  },
  onLoad: function (options) {
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
        console.log('建筑物')
        console.log(res)
        that.setData({
          listhide: true,
        });
        var jsonText = new Array();
        for (var i = 0; i < res.data.length; i++) {
          var dg = JSON.parse(res.data[i]);
          var count = jsonText.push(dg);
        }
        console.log(jsonText)
        var more_detail = new Array();
        for (var i = 0; i < res.data.length; i++) {
          var str = jsonText[i].Value.more_detail
          var detail = str.split(/<split1>|--LongSplitString--|<split2>/);
          var param = {};
          var cont1 = "buildings[" + i + "].name";
          param[cont1] = jsonText[i].Value.building_name;

          var cont2 = "buildings[" + i + "].id";
          param[cont2] = jsonText[i].Value.id;

          var cont3 = "buildings[" + i + "].src";
          param[cont3] = 'https://zzzz.natapp4.cc/Content/building_img/' + jsonText[i].Value.img;

          var cont5 = "buildings[" + i + "].capacity";
          param[cont5] = detail[0];

          var cont6 = "buildings[" + i + "].address";
          param[cont6] = detail[1];

          var cont7 = "buildings[" + i + "].equip";
          param[cont7] = detail[2];

          var cont8 = "buildings[" + i + "].phone";
          param[cont8] = detail[3];

          that.setData(param);
        }
        console.log(more_detail)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    console.log('解析字符串')
    console.log(this.data.buildings)

  },
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: allurl + 'detail',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'user_num': wx.getStorageSync('user_num'),
        'room_name': 'none',
        'parent': 'NONE',
      },
      success: function (res) {
        console.log('建筑物')
        console.log(res)
        var jsonText = new Array();
        for (var i = 0; i < res.data.length; i++) {
          var dg = JSON.parse(res.data[i]);
          var count = jsonText.push(dg);
        }
        console.log(jsonText)
        var more_detail = new Array();
        for (var i = 0; i < res.data.length; i++) {
          var str = jsonText[i].Value.more_detail
          var detail = str.split(/<split1>|--LongSplitString--|<split2>/);
          var param = {};
          var cont1 = "buildings[" + i + "].name";
          param[cont1] = jsonText[i].Value.building_name;

          var cont2 = "buildings[" + i + "].id";
          param[cont2] = jsonText[i].Value.id;

          var cont3 = "buildings[" + i + "].src";
          param[cont3] = 'https://zzzz.natapp4.cc/Content/building_img/' + jsonText[i].Value.img;

          var cont5 = "buildings[" + i + "].capacity";
          param[cont5] = detail[0];

          var cont6 = "buildings[" + i + "].address";
          param[cont6] = detail[1];

          var cont7 = "buildings[" + i + "].equip";
          param[cont7] = detail[2];

          var cont8 = "buildings[" + i + "].phone";
          param[cont8] = detail[3];

          that.setData(param);
        }
        console.log(more_detail)
      },
    });
    wx.stopPullDownRefresh();
  },
  //传递参数
  toNextPage: function (e) {
    console.log('giretj')
    console.log(e)
    var i;
    for (i = 0; i < this.data.buildings.length; i++) {
      if (e.currentTarget.id == this.data.buildings[i].id.toString()) break;
    }
    wx.navigateTo({
      url: '../classroom/classroom?buildings=' + JSON.stringify(this.data.buildings[i]),
    })
  }
})
