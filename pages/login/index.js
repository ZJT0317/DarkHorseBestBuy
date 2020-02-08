// pages/login/index.js
Page({
  data:{

  },
  getUserInfo:function(e){
     var userInfo=e.detail.userInfo;
     wx.setStorageSync('UserInfo',userInfo);
     wx.navigateBack({
        delta:1
     })
  }
})