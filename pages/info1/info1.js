// pages/info1/info1.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myinfo:null,
    detailnum:null,
    detailmsg:null,
    detailstate:null,
    detailphone:null,
    detailgoods:null
  },
  back:function(){
    wx.navigateBack({
      delta: 1,
    })

  },


    


  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var stu = wx.getStorageSync('student');
    this.setData({ 
      myinfo: stu,
      detailnum:wx.getStorageSync('detailnum'),
      detailmsg:wx.getStorageSync('detailmsg'),
      detailstate:wx.getStorageSync('detailstate'),
      detailphone:wx.getStorageSync('detailphone'),
      detailgoods:wx.getStorageSync('detailgoods')
    });
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
        selected: 1
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

  },

  exit:function(e){
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('student');
          //页面跳转
          wx.redirectTo({
            url: '../demo/demo',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
resetpwd:function(e){
    var no=this.data.myinfo.no;
    console.log(no);
    wx.navigateTo({
      url: '../resetpwd/resetpwd?no=' + no,
    })
  },
  setemail: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../email/email?no=' + no,
    })
  }

})