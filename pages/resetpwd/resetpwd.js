// pages/resetpwd/resetpwd.js
var Mcaptcha = require('../../utils/mcaptcha.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgCode:''
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
    this.mcaptcha=new Mcaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: ""
      });
  },
//刷新验证码
  onTap(){
    this.mcaptcha.refresh();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },
  codeImg:function(event) {
    this.data.imgCode=event.detail.value;
  },
  resetPassword:function (res) {
    console.log(this.data.imgCode);
   
    var res = this.mcaptcha.validate(this.data.imgCode);
    if (this.data.imgCode == '' || this.data.imgCode==null) {
      wx.showToast({
        title: '请输入验证码！！',
        icon: 'none',
        duration: 500
      })
    }
    if (!res) {
      wx.showToast({
        title: '验证码错误！！',
        icon: 'none',
        duration: 500
      })
    }
    if(res){
      wx.showToast({
        title: '验证码正确！！',
        icon: 'none',
        duration: 500
      })
    }
  }
})