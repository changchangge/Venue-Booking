// pages/classroom/classroom.js
var app = getApp()
var allurl = 'https://zzzz.natapp4.cc/wx/';
Page({
  data: {
    id: '',
    name: '',
    address: '',
    capacity: '',
    phone: '',
    src: '',
    equip: '',
    classrooms: [
      {
        id: '',
        name: '',
        address: '',
        capacity: '',
        src: '',
        equip: '',
        phone: '',
      }
    ],
  },
  onLoad: function (options) {
    var that = this;
    //获取传递的参数
    var obj = JSON.parse(options.buildings);
    that.setData({
      'id': obj.id,
      'name': obj.name,
      'address': obj.address,
      'phone': obj.phone,
      'src': obj.src,
    })
    //请求服务器数据
    wx.request({
      url: allurl + 'detail',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'user_num': wx.getStorageSync('user_num'),
        'room_name': 'none',
        'parent': '/' + this.data.id,
      },

      success: function (res) {
        var jsonText = new Array();
        for (var i = 0; i < res.data.length; i++) {
          var dg = JSON.parse(res.data[i]);
          var count = jsonText.push(dg);
        }
        for (var i = 0; i < res.data.length; i++) {
          var str = jsonText[i].Value.more_detail
          var detail = str.split(/<split1>|--LongSplitString--|<split2>/);
          var param = {};

          var cont1 = "classrooms[" + i + "].id";
          param[cont1] = jsonText[i].Value.id;

          var cont2 = "classrooms[" + i + "].name";
          param[cont2] = jsonText[i].Value.room_name;

          var cont3 = "classrooms[" + i + "].src";
          param[cont3] = 'https://zzzz.natapp4.cc/Content/building_img/' + jsonText[i].Value.img;

          var cont4 = "classrooms[" + i + "].capacity";
          param[cont4] = detail[0];

          var cont6 = "classrooms[" + i + "].address";
          param[cont6] = detail[1];

          var cont6 = "classrooms[" + i + "].equip";
          param[cont6] = detail[2];

          var cont7 = "classrooms[" + i + "].phone";
          param[cont7] = detail[3];
          that.setData(param);
        }
      },
      fail: function (err) {
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  contact: function () {
    var phone = JSON.stringify(this.data.phone)
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  //参数传递
  toNextPage: function (e) {
    
    var i;
    for (i = 0; i < this.data.classrooms.length; i++) {
      if (e.currentTarget.id == this.data.classrooms[i].id.toString()) break;
    }
    wx.navigateTo({
      url: '../time/time?classrooms=' + JSON.stringify(this.data.classrooms[i]),
    })
  }
})