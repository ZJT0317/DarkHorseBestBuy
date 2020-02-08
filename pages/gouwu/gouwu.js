// pages/gouwu/gouwu.js
import {chooseAddress,getSetting,openSetting,showToast} from '../request/Address.js'
import {Delete} from '../request/delete.js'
Page({
  data: {
    addre:{},
    goods_list:[],
    price:0,
    Allnum:0,
    AllChecked:true
  },
  checkedFunction:function(e){
      var index=e.currentTarget.dataset.index;
      var arr=this.data.goods_list;
      var price=0;
      var num=0;
      if(arr[index].checked){
        arr[index].checked=false;
      }else{
        arr[index].checked=true;
      }
      arr.forEach(function(v,i){
          if(v.checked===true){
              price+=v.goods_price*v.num;
              num+=v.num;
          }
      })
      var bool=arr.length?arr.every(function(v,i){
          return v.checked;
      }):false;
      this.setData({ goods_list:arr,price:price,Allnum:num,AllChecked:bool});
      wx.setStorageSync('obj', arr);
  },
  handlePay:function(){
    if(!this.data.addre.userName){
        showToast('您还没有添加收获地址');
    }
    else if(this.data.Allnum==0){
       showToast('没有结算的商品');
    }
    else{
      wx-wx.navigateTo({
        url: '../pay/index'
      })
    }
  },
  numJian:function(e){
	  var index=e.currentTarget.dataset.index;
    var arr=this.data.goods_list;
    var price=this.data.price;
    var num=this.data.Allnum;
    var that=this;
	  arr.forEach(function(v,i){
		  if(i===index&&v.num>0){
        v.num-=1;
        if(v.checked){
          num-=1;
          price-=v.goods_price;
        }
        if(v.num===0){
          Delete().then(function(res){
            if(res){
              arr.splice(index,1);
              that.setData({goods_list:arr,price:price,Allnum:num});
              wx.setStorageSync('obj', arr);
            }
          },function(res1){
            that.setData({goods_list:arr,price:price,Allnum:num});
            wx.setStorageSync('obj', arr);
          })
        }else{
          that.setData({goods_list:arr,price:price,Allnum:num});
          wx.setStorageSync('obj', arr);
        }
		  }
    });
  },
  numAdd:function(e){
  	  var index=e.currentTarget.dataset.index;
      var arr=this.data.goods_list;
      var price=this.data.price;
      var num=this.data.Allnum;
  	  arr.forEach(function(v,i){
  		  if(i===index){
          v.num+=1;
          if(v.checked){
            num+=1;
            price+=v.goods_price;
          }
  		  }
     });
     this.setData({goods_list:arr,price:price,Allnum:num});
     wx.setStorageSync('obj', arr);
  },
  onShow:function(){
    var add=wx.getStorageSync('Address');
    var cart=wx.getStorageSync('obj');
    var allchecked=true;
    var price=0;
    var num=0;
    if(cart.length===0){
      allchecked=false;
    }
    cart.forEach(function(v,i){
          v.checked=true;
          price+=v.goods_price*v.num;
          num+=v.num;
    })
    this.setData({ addre:add,goods_list:cart,price:price,Allnum:num,AllChecked:allchecked});
    wx.setStorageSync('obj', cart);
  },
  allCheckedFuc:function(e){
    var checked=e.currentTarget.dataset.checked;
    var arr=this.data.goods_list;
    var price=0;
    var num=0;
    if(checked){
      arr.forEach(function(v,i){
        v.checked=false;
      })
      this.setData({goods_list:arr,price:0,Allnum:0,AllChecked:false});
    }else{
      arr.forEach(function(v,i){
        v.checked=true;
        price+=v.goods_price;
        num+=v.num;
       })
       this.setData({goods_list:arr,price:price,Allnum:num,AllChecked:true});
    }
  },
  handleAddress:function(){
      getSetting().then(function(result){
        if(result.authSetting["scope.address"]==false){
          openSetting().then(function(){
            chooseAddress().then(function(res1){
              wx.setStorageSync('Address', res1);
            })
          })
        }else{
          chooseAddress().then(function(res2){
            wx.setStorageSync('Address', res2);
          })
        }
      })
  }
})