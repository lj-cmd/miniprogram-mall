// pages/cart/cart.js
const app = getApp()

Page({
  data: {
    cartList: [],
    isSelectAll: false,
    totalPrice: 0,
    totalCounter: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("购物车页面加载")
    // 1. 第一次加载数据
    this.setData({
      cartList: app.globalData.cartList /*会与app.js里的globalData.cartList同步，但是界面不会感知到 */
    })
    console.log(app.globalData.cartList)
    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList /*重新覆盖以下，让界面也同步 */
      })
      this.changeData()
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.changeData()
  },
  /**
   * 商品选中按钮事件
   */
  checkClick(e) {
    console.log(e)
    this.synData(e.detail.iid,e.detail.index)
    this.changeData()
    


  },
  /**
   * 底部全选按钮监听事件
   */
  bottomCheckall() {
    // 1.判断是否是全部选中
    if(this.data.isSelectAll) { //如果全部选中
      app.globalData.cartList.forEach((item, i) => {
        item.checked = false
        this.setData({
          [`cartList[${i}]`]: item,
          isSelectAll: false
        })
      })
      
    }else {
      app.globalData.cartList.forEach((item, i) => {
        item.checked = true
        this.setData({
          [`cartList[${i}]`]: item,
          isSelectAll: true
        })
      })
    }
    this.changeData()
  },

  synData(iid,index) {
    const goods = app.globalData.cartList.find(item => item.iid == iid )
    goods.checked = !goods.checked
    this.setData({
      [`cartList[${index}]`]: goods
    })
  },

  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;
    let selectAll = true
    for(let item of this.data.cartList) {
      if(item.checked) {
        counter ++
        totalPrice += item.price * item.count
      }else if(selectAll){
        selectAll = false
      }
    }

    // 2.修改数据
   this.setData({
     totalCounter: counter,
     totalPrice: totalPrice,
     isSelectAll: selectAll
   })
 }

})