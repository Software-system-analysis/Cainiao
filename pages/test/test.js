// pages/test/test.js

let app = getApp();
const db = wx.cloud.database();
const expressage = db.collection('expressage');


Page({

  /**
   * 页面的初始数据
   */
  data: {
     num : null,
    phonenum : null,
    scanCodeMsg : null
  },

  inputNum:function(event){
    num = event.detail.value;
    console.log('ing')
  },

  inputPhone:function(event){
    phonenum = event.detail.value
  },

  inputMsg:function(event){
    let scanmsg = event.detail.value;
    this.setData({
      scanCodeMsg:scanmsg
    })
  },


  scanCode: function() {
    var that = this;
    wx.scanCode({ //扫描API     
      success(res) { //扫描成功       
        console.log(res) //输出回调信息  
          that.setData({
          scanCodeMsg: res.result
        });
        wx.showToast({
          title: '成功',
          duration: 1000
        })
      }
    })
  },

  buttonListen: function(res){
    var that = this;
    db.collection('expressage').add({
      data:{
        num: this.data.num,
        phonenum: this.data.phonenum,
        scanCodeMsg: this.data.scanCodeMsg,
        state :'已分仓',
        goods:null
      },
      success(res){
        console.log('success')
      },
      fail(res){
        console.log('fail')
      }
    });
    
    
    this.setData({
      num: null,
      phonenum: null,
      scanCodeMsg:null
    })
    wx.switchTab({
      url: '../list/list'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})