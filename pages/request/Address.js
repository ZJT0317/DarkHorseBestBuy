export const chooseAddress=function(){
  return new Promise(function(resolve,reject){
    wx.chooseAddress({
      success: (res) => {
        resolve(res);
      },
      fail: (result) => {
        reject(result);
      }
    })
  })
}

export const getSetting=function(){
  return new Promise(function(resolve,reject){
    wx.getSetting({
      success: (res) => {
        resolve(res);
      },
     fail: (result) => {
        reject(result);
      }
    })
  })
}

export const openSetting=function(){
  return new Promise(function(resolve,reject){
    wx.openSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (result) => {
        reject(result);
      }
    })
  })
}

export const showToast=function(title){
  return new Promise(function(resolve,reject){
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000,
      success: function(res){
        resolve(res);
      },
      fail:function(err){
        reject(err);
      }
    })
  })
}