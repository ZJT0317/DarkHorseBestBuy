// pages/mine/mine.js
Page({
   data:{
    userInfo:{},
    storeNum:0,
    coll:[]
   },
   onShow:function(){
     var userinfo=wx.getStorageSync('UserInfo');
     var coll=wx.getStorageSync('collection')||[];
     var len=coll.length;
     this.setData({userInfo:userinfo,storeNum:len,coll:coll});
   }
})