// pages/cart/childCpns/cart-list-item/cart-list-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: String
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
    checkClick() {
      const iid = this.data.goods.iid
      const index = this.data.index
      this.triggerEvent('checkClick', {iid,index}, {})
    }
  }
})
