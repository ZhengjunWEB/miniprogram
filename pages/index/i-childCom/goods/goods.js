// pages/index/i-childCom/goods/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods:{
      type: Array
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickItem(e) {
      // this.setData({
      //   id: e.currentTarget.dataset.iid
      // })
      let id = e.currentTarget.dataset.iid
      wx.navigateTo({
        url: '/pages/goods_detail/goods_detail?id='+ id,
      })
    }
  }
})
