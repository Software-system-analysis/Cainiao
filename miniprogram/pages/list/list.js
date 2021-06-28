// pages/list/list.js
const app = new getApp();
const db = wx.cloud.database({});
const cont = db.collection('expressage');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*list: [{
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
    }]*/
    ne:[]

  },

  //查看详情页
  detail:function(event){
    var that = this
    console.log('success')
    var searchid = event.currentTarget.dataset.searchid
    console.log(searchid)
    db.collection('expressage').get({
      success:(res)=>{
        var searchinfo = res.data
        console.log('success')
        for(let i = 0; i < searchinfo.length; i++){
          if(searchid == searchinfo[i].scanCodeMsg){
            console.log(searchinfo[i].phonenum)
            wx.setStorageSync('detailmsg', searchinfo[i].scanCodeMsg)
            wx.setStorageSync('detailnum', searchinfo[i].num)
            wx.setStorageSync('detailphone', searchinfo[i].phonenum)
            wx.setStorageSync('detailstate', searchinfo[i].state)
            wx.navigateTo({
              url: '../info1/info1',
            })
          }
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database({
      env:'rjxtfx-9ganomild41a3d96'
    })
    db.collection('expressage').get({
      success:res =>{
        console.log(res.data)
        this.setData({
          ne:res.data
        })
      }
    })
    /*that.setData({
      num: options.numData,
      phonenum: options.phonenumData,
      msg:options.msgData
    })*/

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
    wx.showToast({
      title: '加载中',
      duration: 1000
    })
    this.onLoad();
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