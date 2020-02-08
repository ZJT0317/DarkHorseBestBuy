// pages/category/index.js
import {request} from "../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[
      { 
        id:0,
        name:"综合",
        isActive:true
      },{
        id:1,
        name:"销量",
        isActive:false
      },
      {
        id:2,
        name:"价格",
        isActive:false
      }
    ],
    QueryParams:{
      query:"",
      cid:"",
      pagenum:1,
      pagesize:10
    },
    obj:[],
    length:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid=options.goods_id||[];
    var query=options.query||[];
    this.setData({cid:cid,query:query});
    this.getRequest();
  },
  onPullDownRefresh:function(){
    this.setData({obj:[]});
    var that=this;
    that.data.QueryParams.pagenum=1;
    this.getRequest();
 },
  getRequest:function(){
    var that=this;
    request({url:'https://api.zbztb.cn/api/public/v1/goods/search',data:that.data.QueryParams})
      .then(function(res){
        var arr=[];
        var total=res.data.message.goods;
        var len=Math.ceil(total.length/that.data.QueryParams.pagesize);
        for(var i=0;i<that.data.QueryParams.pagesize;++i){
          arr.push(total[i]);
        }
        that.setData({obj:arr,length:len});
        wx.stopPullDownRefresh();
      })
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
  },
  onReachBottom:function(){
    var that=this;
    var currPage=that.data.QueryParams.pagenum;
    var nextPage=currPage+1;
    var size=that.data.QueryParams.pagesize;
    if(nextPage>that.data.length){
      wx.showToast({title:'没有下一页数据'});
    }else{
      that.data.QueryParams.pagenum=nextPage;
      request({url:'https://api.zbztb.cn/api/public/v1/goods/search',data:that.data.QueryParams})
      .then(function(res){
        var arr=that.data.obj;
        var total=res.data.message.goods;
        for(var i=currPage*size;i<nextPage*size&&i<total.length;++i){
          arr.push(total[i]);
        }
        that.setData({obj:arr});
        wx.hideLoading();
      })
    }
  }
})