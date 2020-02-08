export const Delete=function(){
  return new Promise(function(reslove,reject){
    wx.showModal({
      title: '提示',
      content: '是否从购物车中移除该商品?',
      success:function(res){
        if (res.confirm) {
          reslove(res);
        } else if (res.cancel) {
          reject(res);
        }
      }
    })
  })
}