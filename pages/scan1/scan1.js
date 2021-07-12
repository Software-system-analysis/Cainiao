// pages/scan1/scan1.js
let app = getApp();
const db = wx.cloud.database();
const expressage = db.collection('expressage');
let num = null;
let scanCodeMsg = null;
//原型模式
var success0 = {
  A:function(){
    wx.showToast({
      title: '操作成功',
      duration:1000
    })
    console.log('1')
  }
};
class chain{//职责链模式
  constructor(fn){
    this.fn=fn;
    this.successor = null;
  }
  setNextSuccessor = function( successor ){//指定在链中的下一个节点
    return this.successor = successor;
  };
  passRequest = function(){//传递请求给某个节点
    var ret = this.fn.apply( this, arguments );
    if ( ret === 'next' ){
        return this.successor && this.successor.passRequest.apply( this.successor, arguments );
    }
    return ret
  }
}
Page({
  /**
   * 页面的初始数据
   */
  data: {


  },
  testA:function(result){
    var b = this.clone(success0);
    if(result=='已上架'){
      b.A();
    }
    else{
      return 'next';
    }
  },
  testB:function(result){
    if(result=='已分仓'){
      wx.showToast({
        title: '未上架的包裹',
        duration:1000
      })
    }
    else{
      wx.showToast({
        title: '未处理的包裹',
        duration:1000
      });
    }
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
  clone:function(superClass){
    function F(){
  
    };
    F.prototype = superClass;
    return new F();
  },
 

  buttonListen: function(res){
    var that = this;

    var b = this.clone(success0);
    
    expressage.get({
      success:(res)=>{
        b.A();
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
    /*wx.switchTab({
      url: '../list/list'
    });*/
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  buttonListen1: function(res){
    var that = this;

    

    var b = this.clone(success0);
    
    var chain1 = new chain(this.testA);
    var chain2 = new chain(this.testB);
    chain1.setNextSuccessor(chain2);
    expressage.get({
      success:(res)=>{
       // b.A();
        let expressageinfo = res.data;
       // console.log(res.data);
        for (let i = 0; i < expressageinfo.length; i++) {
          if(scanCodeMsg == expressageinfo[i].scanCodeMsg){
            chain1.passRequest(expressageinfo[i].state);
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
    /*wx.switchTab({
      url: '../list/list'
    });*/
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