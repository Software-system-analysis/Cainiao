// pages/resetpwdfinal/resetpwdfinal.js
const dbUser=wx.cloud.database();
const user_reset = dbUser.collection('user');
let new_name=null;
let new_password=null;
let old_name=null;
let old_password=null;
let confirm_password=null;
let user_kind=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    set_name_value:'',
    set_kind_value:'',
    set_main_manager:'',
    set_branch_manager:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user_kind=wx.getStorageSync('id');
    new_name=wx.getStorageSync('reseting_name');
    new_password=wx.getStorageSync('reseting_password');
    this.setData({set_name_value:wx.getStorageSync('reseting_name'),})
    switch(user_kind){
      case 1: {
        this.setData({set_main_manager:'true',})
        break;
      }
      case 2:{
        this.setData({set_branch_manager:'true',})
        break;
      }
    }
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
  resetUserKind:function(event) {
    user_kind=event.detail.value;
  },
  inputResetName:function(event) {
    new_name=event.detail.value;
  },
  inputResetPassword:function(event) {
    new_password=event.detail.value;
  },
  inputConfirmResetPassword:function(event) {
    confirm_password=event.detail.value;
  },
  cancelReset:function(res) {
    switch(user_kind){
      case 1:{//按取消按钮则跳回原来的主页
        wx.switchTab({   //跳转首页
          url: '../test/test',  
        })
        break;
      }
      case 2:{
        wx.switchTab({   
          url: '../scan1/scan1',  
        })
        break;
      }     
    }
  },
  resetAccount:function (res) {
    if(new_name&&new_password&&confirm_password){
      wx.showModal({
        title: '确认修改?',
        content: '修改账户后将跳转至登录页面重新登录。',
        success: function (res) {
          if (res.confirm) {
            //页面跳转
            wx.redirectTo({
              url: '../demo/demo',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      wx.showToast({
        title: '任意输入不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    console.log("账户"+user_kind+" "+new_name);
  }
})