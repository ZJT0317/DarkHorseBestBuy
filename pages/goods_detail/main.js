import { request } from "../request/index.js";
// pages/goods_detail/index.js
Page({
  data: {
    id:0,
    pic:[],
    obj:{},
    isChecked:false
  },
  getRequest:function(){
    var that=this;
    request({url:'https://api.zbztb.cn/api/public/v1/goods/detail?goods_id='+that.data.id})
       .then(function(res){
         that.setData({pic:res.data.message.pics,obj:res.data.message});
       })
  },
  addGouwu:function(){
    var arr=wx.getStorageSync('obj')||[];
    var len=arr.length;
    var index=-1;
    for(var i=0;i<len;++i){
      if(arr[i].id===this.data.obj.goods_id){
          index=i;
          break;
      }
    }
    if(index===-1){
       arr.push({id:this.data.obj.goods_id,num:1,goods_name:this.data.obj.goods_name,goods_price:this.data.obj.goods_price,
     goods_small_logo:this.data.obj.goods_small_logo,
     checked:true});
    }else{
       arr[index].num++;
    }
    wx.setStorageSync('obj', arr);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },
  PreImage:function(e){
    var Url=this.data.pic.map(function(v,i){
      v=v.pics_mid;
      return v;
    })
    var Cur=e.currentTarget.dataset.index;
     wx.previewImage({
       urls: Url,
       current: Url[Cur]
     })
  },
  onShow: function () {
    var pages=getCurrentPages();
    var currentPage=pages[pages.length-1];
    var options=currentPage.options;
    this.data.id=options.goods_id;
    var coll=wx.getStorageSync('collection')||[];
    var len=coll.length;
    var index=-1;
    for(var i=0;i<len;++i){
      if(coll[i].id==this.data.id){
        index=i;
        break;
      }
    }
    if(index!==-1){
      this.setData({ isChecked:true});
    }
    this.getRequest();
  },
  getIsChecked:function(){
     var isChecked=this.data.isChecked;
     var coll=wx.getStorageSync('collection')||[];
     if(isChecked===false){
       isChecked=true;
       //不存在该商品信息,添加
       wx.showToast({
         title: '收藏成功',
         icon:'success',
         mask: true
       })
     }else{
       isChecked=false;
       //删除该商品
       wx.showToast({
        title: '取消收藏',
        icon:'success',
        mask: true
      })
     }
     var len=coll.length;
     var index=-1;
     for(var i=0;i<len;++i){
       if(coll[i].id===this.data.obj.goods_id){
         index=i;
         break;
       }
     }
     if(index===-1){
      coll.push({id:this.data.obj.goods_id,goods_name:this.data.obj.goods_name,goods_price:this.data.obj.goods_price,
      goods_small_logo:this.data.obj.goods_small_logo});
     }else{
       coll.splice(index,1);
     }
     wx.setStorageSync('collection', coll);
     this.setData({isChecked:isChecked});
  }
})