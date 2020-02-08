// pages/search/index.js
import {request} from '../request/index.js'
Page({
  data:{
    isFocus:false,
    obj:[],
    value:''
  },
  TimeId:0,
  SearchInput:function(e){
   var v=e.detail.value;
   var that=this;
   clearTimeout(that.TimeId);
   if(!v.trim()){
     //不合法
     this.setData({isFocus:false,obj:[]});
     return;
   }else{
     this.setData({isFocus:true});
     that.TimeId=setTimeout(function(){
      request({url:'https://api.zbztb.cn/api/public/v1/goods/qsearch?query='+v})
      .then(function(res){
        var obj=res.data.message;
        that.setData({obj:obj,value:v});
      })
     },1000);
   }
  },
  cancel:function(){
     this.setData({isFocus:false, obj:[],value:''})
  }
})