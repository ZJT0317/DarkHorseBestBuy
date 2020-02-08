var ajaxTimes=0;
export const request=function(params){
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  return new Promise(function(resolve,reject){
    ajaxTimes++;
    wx.request({
      //...params
      url:params.url,
      header:params.header,
      method:params.method,
      success:function(result){
        resolve(result);
      },
      fail:function(err){
        reject(err);
      },
      complete:function(){
        ajaxTimes--;
        if(ajaxTimes==0){
          wx.hideLoading();
        }
      }
    })
  })
}