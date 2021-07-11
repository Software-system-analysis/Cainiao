// pages/resetpwd/resetpwd.js
var Mcaptcha = require('../../utils/mcaptcha.js');
let check_name=null;
let check_password=null;
let get_name=null;
let get_password=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgCode:'',
    user_name_for_check:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    get_name=wx.getStorageSync('name');
    get_password=wx.getStorageSync('password');
    //this.setData({user_name_for_check:wx.getStorageSync('name'),})
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
  inputPasswordCheck:function(event) {
    check_password=event.detail.value;
  },
  inputNameCheck:function(event) {
    check_name=event.detail.value;
  },
  codeImg:function(event) {
    this.data.imgCode=event.detail.value;
  },

  resetPasswordNext:function (res) {
    console.log(this.data.imgCode);
    console.log(check_name);
    var res = this.mcaptcha.validate(this.data.imgCode);
    if(check_name&&check_password&&this.data.imgCode){
      if(check_name!=get_name){
        wx.showToast({
          title: '用户名错误',
          icon: 'none',
          duration: 500
        })

      }
      else if(check_password!=get_password){
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 500
        })
      }
      else{
        /*
        if (this.data.imgCode == '' || this.data.imgCode==null) {
          wx.showToast({
            title: '请输入验证码！！',
            icon: 'none',
            duration: 500
          })
        }
        */
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
          wx.setStorageSync('reseting_name', check_name);
          wx.setStorageSync('reseting_password', check_password);
          console.log(wx.getStorageSync('reseting_name')+' '+wx.getStorageSync('reseting_password'));
          wx.navigateTo({   //跳转至下一步
            url: '../resetpwdfinal/resetpwdfinal',  
          })
        }
      }
    }
    else{
      wx.showToast({
        title: '请输入完整的验证信息(当前登录的账号密码及验证码)！！',
        icon: 'none',
        duration: 1000
      })
    }
  }
})