// component/w-goods-list/w-goods-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object || Array,
      value: {}
    },
    currentType: {
      type: String,
      value: ""
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    goodsItem: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isArray: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e) {
      //1.获取iid
      const iid = e.currentTarget.dataset.iid
      //2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid,
      })
    },
  },
  lifetimes: {
    attached() {
      const GoodsType = this.data.goods.__proto__.nv_constructor /*获取传入goods的类型 */
      if(GoodsType == "Array") {
        this.setData({
          isArray: true
        })
      }
    }
  }


})
