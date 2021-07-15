// pages/register/register.js
const user_register = wx.cloud.database().collection('user');
let user_kind='BRANCH_DEPOSITORY_MANAGER';//默认工作人员类型
let register_name=null;
let register_password=null;
let confirm_password=null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_kind:'BRANCH_DEPOSITORY_MANAGER',//默认选择的工作人员类型
    register_name:null,
    register_password:null,
    confirm_password:null,
    user_id:2,
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
    this.setData({user_register: res.user_register_info})
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
  inputRegisterName:function(event){     
      this.data.register_name=event.detail.value;
  },
  inputRegisterPassword:function(event){
      this.data.register_password=event.detail.value;
  },
  inputConfirmPassword:function(event){
    this.data.confirm_password=event.detail.value;
  },
  changeUserKind: function (e) {
    this.data.user_kind=e.detail.value;
    switch(this.data.user_kind){
      case "BRANCH_DEPOSITORY_MANAGER":{
        this.data.user_id=2;
        break;
      }
      case "MAIN_DEPOSITORY_MANAGER":{
        this.data.user_id=1;
        break;
      }
    }
  },
  
  registerFactory:function(role) {//简单工厂函数
    console.log("factory start");
    function user(opt,staff) {
      this.name=opt.register_name;
      this.password=opt.register_password;
      this.id=opt.user_id;
      this.kind=staff; 
      console.log("producing user");
    }
    switch(role){//根据注册选择的账户类型创建用户对象
      case "BRANCH_DEPOSITORY_MANAGER":
        return new user(this.data,"分仓管理员");
        break;
      case "MAIN_DEPOSITORY_MANAGER":
        return new user(this.data,"总仓管理员");
        break;
    }
  },
  gotoRegisterNewUser:function(res){
    user_register.get({
      success:(res)=>{
        let user_register_info = res.data;
       if(this.data.register_name&&this.data.register_password&&this.data.confirm_password){
        for (let i = 0; i < user_register_info.length; i++) {  //遍历数据库对象集合
          if (this.data.register_name === user_register_info[i].user_name) { 
            //对比数据库里已有的用户名，若输入的用户名有重复则输出提示信息
            wx.showToast({
              title: '用户已存在！！',
              icon: 'none',
              duration: 500
            })
            return;
          }
        }
          if(this.data.register_password!=this.data.confirm_password){
            wx.showToast({
              title: '确认密码错误！！',
              icon: 'none',
              duration: 500
            })
          }
          else if(this.data.register_password.length<8||this.data.register_password.length>24){
            //检查密码长度
            wx.showToast({
              title: '密码长度必须为8~24位！！',
              icon: 'none',
              duration: 500
            })
          }
          else{//若输入的信息符合要求则生成相应的用户对象存入数据库
            console.log("success:"+this.data.register_name+' '+this.data.register_password+' '+this.data.confirm_password+' '+this.data.user_kind);
            let new_user=this.registerFactory(this.data.user_kind);
            console.log("factory has produced a new accout:"+new_user.name+' '+new_user.password+' '+new_user.kind+' '+new_user.id);
            user_register.add({
              data:{
                password:new_user.password,
                user_id:new_user.id,
                user_name:new_user.name,
                userid:new_user.kind
              },
              success(res){
                console.log('注册成功');
              }
            })
              wx.showToast({
                title: '注册成功！',
                icon: 'none',
                duration: 1000
              }) 
              wx.navigateTo({   //跳转首页
                url: '../demo/demo',  
              })
          }      
        }
      else{
        wx.showToast({
          title: '请填写完整的注册信息！',
          icon: 'none',
          duration: 500
        }) 
      }
      }
    })
  }
})