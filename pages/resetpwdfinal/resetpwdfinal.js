// pages/resetpwdfinal/resetpwdfinal.js
const dbUser=wx.cloud.database();
const user_reset = dbUser.collection('user');
let dataId=null;
let confirm_password=null;
var temp_userkind=null;
let info;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    set_name_value:'',
    set_main_manager:'',
    set_branch_manager:'',
    new_name:null,
    new_password:null,
    confirm_password:null,
    user_kind:null,
    set_new_kind:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.user_kind=wx.getStorageSync('id');
    this.data.new_name=wx.getStorageSync('reseting_name');
    user_reset.where({user_name:this.data.new_name}).get({//从数据库获取当前账户的id
      success:(res)=> {
        info=res.data;
        dataId=info[0]._id;
      }
    });
    this.setData({set_name_value:wx.getStorageSync('reseting_name'),})
    switch(this.data.user_kind){
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
    this.data.user_kind=event.detail.value;        
  },
  inputResetName:function(event) {
    this.data.new_name=event.detail.value;
  },
  inputResetPassword:function(event) {
    this.data.new_password=event.detail.value;
  },
  inputConfirmResetPassword:function(event) {
    this.data.confirm_password=event.detail.value;
  },
  cancelReset:function(res) {
    switch(this.data.user_kind){
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
    console.log("查询id:"+dataId+' '+this.data.new_name+' '+this.data.user_kind);
    if(this.data.new_name&&this.data.new_password&&this.data.confirm_password){
      if(this.data.new_password!=this.data.confirm_password){
        wx.showToast({
          title: '第二次输入的密码必须和新密码一致！',
          icon: 'none',
          duration: 1000
        })
      }
      else if(this.data.new_password.length<8||this.data.new_password.length>24){
        //检查新密码长度
        wx.showToast({
          title: '新密码长度必须为8~24位！！',
          icon: 'none',
          duration: 500
        })
      }
      else{
        console.log(this.data.user_kind);
        if(this.data.user_kind=="1"){//设置用户类型
          this.data.set_new_kind='总仓管理员';
          temp_userkind=1;
        }
        else{
          this.data.set_new_kind='分仓管理员';
          temp_userkind=2;
        }       
        var temp_name=this.data.new_name;
        var temp_password=this.data.new_password;
        var temp_set_kind=this.data.set_new_kind;
        console.log(temp_userkind+' '+temp_set_kind);
        wx.showModal({
          title: '确认修改?',
          content: '修改账户后将跳转至登录页面重新登录。',
          success: function (res) {
            if (res.confirm) {
              user_reset.doc(dataId).update({//修改数据库中的账户信息
                data:{
                  password:temp_password,
                  user_id:temp_userkind,
                  user_name:temp_name,
                  userid:temp_set_kind,
                },
                success:(res) =>{
                  console.log("修改完成");
                }
              })
              //页面跳转
              wx.redirectTo({
                url: '../demo/demo',
              })
            } else if (res.cancel) {}
          }
        })
      }   
    }
    else{
      wx.showToast({
        title: '任意输入不能为空',
        icon: 'none',
        duration: 1000
      })
    }
  }
})