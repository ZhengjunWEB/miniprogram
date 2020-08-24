// pages/index/i-childCom/tab-control/tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab_item: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isActive: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changItem(event) {
      this.setData({
        isActive: event.currentTarget.dataset.index
      })
      const index = this.data.isActive
      this.triggerEvent('clickTabItem',{index},{})
      
    }
  }
})
