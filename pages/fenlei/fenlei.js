// pages/fenlei/fenlei.js
import {request} from "../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:[],
    RightMenu:[],
    currentIndex:0,
    ScrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates=wx.getStorageSync('cates');
    if(!Cates){
      //第一次请求
      this.getRequest();
    }else{
      if(Date.now()-Cates.time>1000*3600*24){
        this.getRequest();
      }else{
        this.Cates=Cates.data;
        var cates=this.Cates.map(function(v,i){
          v=v.cat_name;
          return v;
        })
        this.setData({obj:cates,RightMenu:this.Cates[this.data.currentIndex].children});
      }
    }
  },
  getRequest:function(){
    var that=this;
    request({url:'https://api.zbztb.cn/api/public/v1/categories'})
     .then(function(res){
       that.Cates=res.data.message;
       wx.setStorageSync('cates', {time:Date.now(),data:res.data.message});
       var cates=that.Cates.map(function(v,i){
           v=v.cat_name;
           return v;
       })
       that.setData({obj:cates,RightMenu:that.Cates[that.data.currentIndex].children});
     })
  },
  tapFunction:function(e){
      var eData=e.currentTarget.dataset.index;
      var Right=this.Cates[eData].children;
      this.setData({RightMenu:Right,currentIndex:eData,ScrollTop:0
      });
  }
})