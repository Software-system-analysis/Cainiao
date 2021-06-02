// pages/list/list.js
const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      list_name: "",
      list_title: "此处应该是一个快递编号",
      list_img: ""
    }, {
      list_name: "",
      list_title: "此处应该是一个快递编号",
      list_img: ""
    }, {
      list_name: "",
      list_title: "此处应该是一个快递编号",
      list_img: ""
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      num: options.numData,
      phonenum: options.phonenumData,
      msg:options.msgData
    })

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