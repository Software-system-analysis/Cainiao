// pages/demo/demo.js
let app = getApp();
const db = wx.cloud.database();
const user = db.collection('user');
let name = null;
let password = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  inputName:function(event){
    name = event.detail.value
  },

  inputPassword:function(event){
    password = event.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.getUserInfo({
      success: this.setUserInfo.bind(this)
    })
    this.setData({

    })

  },

  setUserInfo: function(res){
    this.setData({user: res.userInfo})
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
    wx.hideTabBar({
      animation: true,
    })

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
   * 用户点击右上角分享...
   */
  onShareAppMessage: function () {

  },

  goto_index: function(res){
    /*wx.switchTab({
      url: '../test/test',
    })*/
    let that = this;
    //登陆获取用户信息
    user.get({
      success:(res)=>{
        let userinfo = res.data;
       // console.log(res.data);
        for (let i = 0; i < userinfo.length; i++) {  //遍历数据库对象集合
          if (name === userinfo[i].user_name) { //用户名存在
            if (password !== userinfo[i].password) {  //判断密码是否正确
              wx.showToast({
                title: '密码错误！！',
                icon: 'loading',
                duration: 500
              })
            } else {
              console.log('登陆成功！')
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 500
              })
              wx.switchTab({   //跳转首页
                url: '../test/test',  //这里的URL是你登录完成后跳转的界面
              })
            }
          }else{   //不存在
            wx.showToast({
              title: '无此用户名！！',
              icon: 'loading',
              duration: 500
            })
          }
        }
      }
    })
  }

  
})