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
        id: '',
        name: '',
        intro: '',
        capacity: '',
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
        console.log('返回可用教室')
        console.log(res)
        if (res.data.length != undefined) {
          var jsonText = new Array();
          for (var i = 0; i < res.data.length; i++) {
            var dg = res.data[i];
            var count = jsonText.push(dg);
          }
          console.log(jsonText)
          for (var i = 0; i < res.data.length; i++) {
            var param = {};

            var content = "classrooms[" + i + "].id";
            param[content] = jsonText[i].id;

            var content2 = "classrooms[" + i + "].name";
            param[content2] = jsonText[i].room_name;

            var content3 = "classrooms[" + i + "].intro";
            var str = jsonText[i].more_detail
            var n = str.split("<")
            param[content] = n[0];

            var content4 = "classrooms[" + i + "].src";
            param[content4] = 'https://zzzz.natapp4.cc/Content/building_img/' + jsonText[i].img;
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
            // success: function () {
            //   setTimeout(function(){wx.navigateBack({
            //     delta: 1,
            //   })}, 2000)
            // },
          })
        }
      },
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  toNextPage: function (e) {
    console.log('git commit')
    console.log(e)
    console.log(e.currentTarget.id);
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

