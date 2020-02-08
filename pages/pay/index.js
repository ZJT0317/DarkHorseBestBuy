// pages/pay/index.js
import {chooseAddress,getSetting,openSetting,showToast} from '../request/Address.js'
import {Delete} from '../request/delete.js'
Page({
  data: {
    addre:{},
    goods_list:[],
    price:0,
    Allnum:0
  },
  onShow:function(){
    var add=wx.getStorageSync('Address');
    var cart=wx.getStorageSync('obj');
    var arr=[];
    var price=0;
    var num=0;
    cart.forEach(function(v,i){
         if(v.checked===true){
          price+=v.goods_price*v.num;
          num+=v.num;
          arr.push(v);
         }
    })
    this.setData({ addre:add,goods_list:arr,price:price,Allnum:num});
  },
  handlePay:function(){
    wx.showToast({
      title: '暂不支持支付功能',
      icon:'none',
      mask: true,
    })
  }
})