// pages/scan1/scan1.js
let app = getApp();
const db = wx.cloud.database();
const expressage = db.collection('expressage');
let num = null;
let scanCodeMsg = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  inputNum:function(event){
    num = event.detail.value;
    console.log('ing')
  },



  inputMsg:function(event){
    scanCodeMsg = event.detail.value
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
    expressage.get({
      success:(res)=>{
        let expressageinfo = res.data;
       // console.log(res.data);
        for (let i = 0; i < expressageinfo.length; i++) {
          if(scanCodeMsg == expressageinfo[i].scanCodeMsg){
            if(expressageinfo[i].state == '已分仓'){
            var id = expressageinfo[i]._id;
            db.collection('expressage').doc(id).update({
              data:{
                state:'已上架',
                goods:num
              }
            })
          }}

        }
      }
    });
    
    
    this.setData({
      num: null,
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
    var staff_name=wx.getStorageSync('username');
    console.log("Enter Page scan1");
    console.log('scan1: '+staff_name+' '+wx.getStorageSync('userid'));
  },

  buttonListen1: function(res){
    var that = this;
    expressage.get({
      success:(res)=>{
        let expressageinfo = res.data;
       // console.log(res.data);
        for (let i = 0; i < expressageinfo.length; i++) {
          if(scanCodeMsg == expressageinfo[i].scanCodeMsg){
            if(expressageinfo[i].state == '已上架'){
            var id = expressageinfo[i]._id;
            db.collection('expressage').doc(id).update({
              data:{
                state:'已取件'
              }
            })
          }}

        }
      }
    });
    
    
    this.setData({
      num: null,
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
    var staff_name=wx.getStorageSync('username');
    console.log("Enter Page scan1");
    console.log('test:'+staff_name+' '+wx.getStorageSync('userid'));
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