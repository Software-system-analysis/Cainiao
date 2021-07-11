// pages/resetpwdfinal/resetpwdfinal.js
const dbUser=wx.cloud.database();
const user_reset = dbUser.collection('user');
let new_name=null;
let new_password=null;
let user_kind=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    set_name_value:'',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user_kind=wx.getStorageSync('id');
    new_name=wx.getStorageSync('reseting_name');
    new_password=wx.getStorageSync('reseting_password');
   // this.setData({set_name_value:wx.getStorageSync('reseting_name'),})
    //console.log( this.data.set_name_value);
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

  },

  cancelReset:function(res) {
    switch(user_kind){
      case 1:{
        wx.switchTab({   //跳转首页
          url: '../test/test',  
        })
        break;
      }
      case 2:{
        wx.switchTab({   
          url: '../scan1/scan1',  
        })
      }
        
    }
  }
})