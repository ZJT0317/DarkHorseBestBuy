// pages/feedback/index.js
Page({
  data: {
    List:[
      { 
        id:0,
        name:"体验问题",
        isActive:true
      },{
        id:1,
        name:"商品,商家投诉",
        isActive:false
      }
    ],
    src:[],
    value:""
  },
  TimeId:0,
  UpImaging:[],
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
addTap:function(e){
  var that=this;
  wx.chooseImage({
    count: 9,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths;
      var filePaths=[...that.data.src,...tempFilePaths];
      that.setData({src:filePaths});
    }
  })
 },
 deleteImage:function(e){
   var index=e.detail;
   var arr=this.data.src;
   arr.splice(index,1);
   this.setData({src:arr});
 },
 Input:function(e){
   var that=this;
   clearTimeout(that.TimeId);
   that.TimeId=setTimeout(function(){
     var i=e.detail.value;
     that.setData({value:i});
   },1000)
 },
 submitBtn:function(){
    var f=this.data.value;
    var that=this;
    var srcList=this.data.src;
    if(!f.trim()){
      wx.showToast({
        title: '文本框无内容',
        icon:'none',
        mask:true
      })
      return;
    }else{
      if(srcList.length!==0){
        wx-wx.showToast({
          title: '图片上传中',
          icon: 'loading',
          mask: true
        })
        srcList.forEach(function(v,i){
          wx.uploadFile({
            filePath:v,
            name: 'file',
            //url表示将图片上传到那里去
            url: 'https://imgchr.com/',
            formData:{},
            success: (result) => {
              var url=result.data;
              that.UpImaging.push(url);
              if(i==srcList.length-1){
                  wx.hideToast();
                  //代替将外网图片提交到服务器的过程
                  that.setData({value:'',src:[]});
                  console.log('上传了图片和文件');
                  wx.navigateBack({
                    delta: 1
                  })
              }
            },
          })
        })
      }else{
        console.log('只上传了文字')
        wx.navigateBack({
          delta: 1
        })
      }
    }
 }
})