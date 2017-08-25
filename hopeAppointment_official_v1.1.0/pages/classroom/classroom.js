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
        capacity: '',
        src: '',
      }
    ],
  },
  onLoad: function (options) {
    var that = this;
    //获取传递的参数
    var obj = JSON.parse(options.buildings);
    console.log(obj)
    that.setData({
      id: obj.id,
      name: obj.name,
      address: obj.address,
      phone: obj.phone,
      src: obj.src,
      equip: obj.equip,
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
        console.log('指定建筑物')
        console.log(res)
        var jsonText = new Array();
        for (var i = 0; i < res.data.length; i++) {
          var dg = JSON.parse(res.data[i]);
          var count = jsonText.push(dg);
        }

        //修改页面表头

        for (var i = 0; i < res.data.length; i++) {
          var str = jsonText[i].Value.more_detail

          var param = {};

          var cont1 = "classrooms[" + i + "].id";
          param[cont1] = jsonText[i].Value.id;

          var cont2 = "classrooms[" + i + "].name";
          param[cont2] = jsonText[i].Value.room_name;

          var cont3 = "classrooms[" + i + "].capacity";
          var n = str.split("<")
          console.log(n[0])
          param[cont3] = n[0];
          that.setData(param);

          var content = "classrooms[" + i + "].src";
          param[content] = 'https://zzzz.natapp4.cc/Content/building_img/' + jsonText[i].Value.img;
          that.setData(param);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  //参数传递
  toNextPage: function (e) {
    console.log(e.currentTarget.id);
    var i;
    for (i = 0; i < this.data.classrooms.length; i++) {
      if (e.currentTarget.id == this.data.classrooms[i].id.toString()) break;
    }
    console.log('ss' + i);
    wx.navigateTo({
      url: '../time/time?classrooms=' + JSON.stringify(this.data.classrooms[i]),
    })
  }
})