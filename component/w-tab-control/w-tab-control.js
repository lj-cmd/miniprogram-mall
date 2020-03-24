// pages/home/childCpns/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type:  Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(event) {
      //1. 获取传入的index
      const index = event.currentTarget.dataset.index;
      //2.改变记录的currentIndex
      this.setData({
        currentIndex: index
      })
      //3.发出自定义事件
      this.triggerEvent('titleclick', {index}, {})
    }
  }
})
