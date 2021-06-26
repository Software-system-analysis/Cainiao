// pages/register/register.js
//const dbStaff = wx.cloud.database();
const dbUser=wx.cloud.database();
const user_register = dbUser.collection('user');
//const staff=dbStaff.collection('staff');
let user_kind='USER';
let register_name=null;
let register_password=null;
let confirm_password=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    

  },
  goto_register_newuser:function(res){

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
      register_name=event.detail.value;
     

  },
  inputRegisterPassword:function(event){
      register_password=event.detail.value;
      
  },
  inputConfirmPassword:function(event){
      confirm_password=event.detail.value;
      
  },
  changeUserKind: function (e) {
    user_kind=e.detail.value;
    console.log('radio发生change事件，携带value值为：', user_kind)
  },
  registerFactory:function(role,userid) {//简单工厂函数
    console.log("factory start");
    function user(opt) {
      this.name=opt.name;
      this.password=opt.password;
      this.kind=opt.kind; 
      this.id=userid;
      console.log("producing user");
    }
    switch(role){
      case "USER":
        return new user({name:register_name,password:register_password,kind:"用户"});
        break;
      case "BRANCH_DEPOSITORY_MANAGER":
        return new user({name:register_name,password:register_password,kind:"分仓管理员"});
        break;
      case "MAIN_DEPOSITORY_MANAGER":
        return new user({name:register_name,password:register_password,kind:"总仓管理员"});
        break;
    }
  },
  gotoRegisterNewuser:function(res){
    user_register.get({
      success:(res)=>{
        let user_register_info = res.data;
        //console.log(register_name+' '+register_password+' '+confirm_password+' '+user_kind);
       if(register_name&&register_password&&confirm_password){
        for (let i = 0; i < user_register_info.length; i++) {  //遍历数据库对象集合
          if (register_name === user_register_info[i].user_name) { //用户名存在
            wx.showToast({
              title: '用户已存在！！',
              icon: 'none',
              duration: 500
            })
          }
        }
          if(register_password!=confirm_password){
            wx.showToast({
              title: '确认密码错误！！',
              icon: 'none',
              duration: 500
            })
          }
          else if(register_password.length<8||register_password.length>24){
            wx.showToast({
              title: '密码长度必须为8~24位！！',
              icon: 'none',
              duration: 500
            })
          }
          else{
            console.log("success "+register_name+' '+register_password+' '+confirm_password+' '+user_kind);
            let new_user=this.registerFactory(user_kind,user_register_info.length+1);
            console.log("factory has produced a new accout:"+new_user.name+' '+new_user.password+' '+new_user.kind+' '+new_user.id);
            if(new_user.kind == "总仓管理员"){
            user_register.add({
              data:{
                password:new_user.password,
                user_id:1,
                user_name:new_user.name,
                userid:new_user.kind
              },
              success(res){
                console.log('注册成功');
              }
            })}
            if(new_user.kind == "分仓管理员"){
              user_register.add({
                data:{
                  password:new_user.password,
                  user_id:2,
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
              })}
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