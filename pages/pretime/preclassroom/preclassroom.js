// // preclassroom.js
var app = getApp();
var allurl = 'https://zzzz.natapp4.cc/wx/';
Page({
  data: {
    date: '',
    building_id: '',
    name: '',
    address: '',
    capacity: '',
    phone: '',
    listhide: true,
    classrooms: [
      {
        id: 0,
        name: '',
        equip: '',
        src: '',
      }
    ],
  },
  onLoad: function (options) {

    var that = this;
    //获取传递的参数
    var obj = JSON.parse(options.obj);
    console.log(obj)
    that.setData({
      'date': obj.date,
    })
    wx.request({
      url: allurl + 'details',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'user_num': wx.getStorageSync('user_num'),
        'people_min': obj.people_min,
        'people_max': obj.people_max,
        'parent': '/' + obj.building_id,
      },
      //请求成功返回
      success: function (res) {
        if (res.data.length != undefined) {
          var jsonText = new Array();
          for (var i = 0; i < res.data.length; i++) {
            var dg = res.data[i];
            console.log(dg)
            var count = jsonText.push(dg);
          }
          console.log(jsonText)
          for (var i = 0; i < res.data.length; i++) {
            var str = jsonText[i].more_detail
            var detail = str.split(/<split1>|--LongSplitString--|<split2>/);
            var param = {};

            var content = "classrooms[" + i + "].id";
            param[content] = jsonText[i].id;

            var content2 = "classrooms[" + i + "].name";
            param[content2] = jsonText[i].room_name;

            var content4 = "classrooms[" + i + "].src";
            param[content4] = 'https://zzzz.natapp4.cc/Content/building_img/' + jsonText[i].img;

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
        } else {
            that.setData({
              'listhide': false,
            })
          wx.showToast({
            title: '没有符合的教室，请重新选择',
            icon: 'success',
            duration: 2000,
          })
        }
      },
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  toNextPage: function (e) {
    var i;
    for (i = 0; i < this.data.classrooms.length; i++) {
      if (e.currentTarget.id == this.data.classrooms[i].id.toString()) break;
    }
    console.log('ss' + i);
    wx.navigateTo({
      url: '../../time/time?classrooms=' + JSON.stringify(this.data.classrooms[i]) + '&date=' + this.data.date,
    })
  }
})

