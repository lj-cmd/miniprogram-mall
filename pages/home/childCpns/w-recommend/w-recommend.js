// pages/home/childCpns/w-recommends/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad() {
      if(!this.data.isLoad) {
        this.triggerEvent('imageLoad')
        this.data.isLoad = true
      }
    }
  }
})
