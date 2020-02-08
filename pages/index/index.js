//index.js
//获取应用实例
import {request} from "../request/index.js"

Page({
  data:{
    obj:[],
    naviObj:[],
    floor:[]
  },
  onLoad:function(){
     var that=this;
     request({ url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata'})
      .then(function(res){
        that.setData({obj:res.data.message});
      })
      request({ url: 'https://api.zbztb.cn/api/public/v1/home/catitems'})
      .then(function(res){
        that.setData({naviObj:res.data.message});
      })
      request({ url: 'https://api.zbztb.cn/api/public/v1/home/floordata'})
      .then(function(res){
        var floor=res.data.message;
        var len=floor.length;
        for(var i=0;i<len;++i){
          var k=floor[i].product_list;
          var kLen=k.length;
          for(var j=0;j<kLen;++j){
            var f= k[j].navigator_url;
            var url= f.replace('goods_list','category/index');
            k[j].navigator_url=url;
          }
        }
        console.log(floor);
        that.setData({floor:floor});
      })
  }
})