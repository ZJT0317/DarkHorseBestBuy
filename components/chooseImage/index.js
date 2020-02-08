// components/chooseImage/index.js
Component({
  properties: {
     src:{
       type:String,
       value:""
     },
     index:{
        type:Number,
        value:-1
     }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelImage:function(e){
      var index=e.currentTarget.dataset.index;
      this.triggerEvent('Cancel',index);
    }
  }
})
