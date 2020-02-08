// pages/collect/index.js
Page({
   data:{
     List:[
      { 
        id:0,
        name:"商品收藏",
        isActive:true
      },{
        id:1,
        name:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        name:"店铺收藏",
        isActive:false
      },
      {
        id:3,
        name:"浏览足迹",
        isActive:false
      }
    ],
    obj:[]
   },
   onShow:function(){
     var obj=wx.getStorageSync('collection')||[];
     this.setData({obj:obj});
   },
   TapShow:function(data){
    var index=data.detail;
    var lists=this.data.List;
    lists.forEach(function(v,i){
      if(i==index){
        v.isActive=true;
      }else{
        v.isActive=false;
      }
    })
    this.setData({List:lists});
 }
})