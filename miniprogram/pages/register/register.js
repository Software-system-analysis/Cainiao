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
    switch(role){//根据注册选择的账户类型创建用户对象
      /*
      case "USER":
        return new user({name:register_name,password:register_password,kind:"用户"});
        break;*/
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
          if (register_name === user_register_info[i].user_name) { 
            //对比数据库里已有的用户名，若输入的用户名有重复则输出提示信息
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
            //检查密码长度
            wx.showToast({
              title: '密码长度必须为8~24位！！',
              icon: 'none',
              duration: 500
            })
          }
          else{//若输入的信息符合要求则生成相应的用户对象存入数据库
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
              /*
              if(new_user.kind == "用户"){
                user_register.add({
    
                  data:{
                    password:new_user.password,
                    user_id:3,
                    user_name:new_user.name,
                    userid:new_user.kind
                  },
                  success(res){
                    console.log('注册成功');
                  }
                })}
                */

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