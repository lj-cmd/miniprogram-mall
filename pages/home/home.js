// pages/home/home.js
import {
  getMultiData, getGoodsData
} from '../../service/home.js'

const TOP_DISTANCE = 1000; /*下滚动1000显示回到顶部按钮 */

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners: {},
    recommends: {},
    titles: ['流行', '新款', '精选'],
    goods: { /*商品数据*/
      pop: {page:0, list: []},
      new: {page:0, list: []},
      sell: {page:0, list: []}
    },
    currentType: 'pop', /*当前展示商品 */
    showBackTop: false, /*是否显示回到顶部按钮 */
    isTabFixed: false,  /*tab-control是否固定*/
    tabScrollTop: 0,    /*tab-control距离顶部的距离 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.请求轮播图以及推荐数据
    this._getMultiData()
    //2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  _getMultiData() {
    getMultiData().then(res => {
      console.log(res)
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      }) 
    })
  },
  tabClick(e) {                       //tab-control点击监听事件
    const index = e.detail.index      //获取被点击的下标 
    let count = 0                     //记录循环下标 
    for(let currentType in this.data.goods) {   //对goods进行遍历；i 是key
      if(index == count) {            //匹配出对应的key
        this.setData({currentType})
      }
      count += 1
    }  
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      //1.取出数据
      const list = res.data.data.list
      //2.将数据设置到对应的type的list中
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      // 3.将数据设置到data中的goods中
      const pageKey = "goods."+ type +".page"
      const listKey = "goods."+ type +".list"
      this.setData({
        [pageKey]: page,
        [listKey]: oldList
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getGoodsData(this.data.currentType)
  },

  /**
   * 页面滚动监听
   */
  onPageScroll(options) {
    // console.log(options)
    //1.取出scroll Top
    const scrollTop = options.scrollTop;
    //2.修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
    //3.修改showBackTop属性
    //官方建议：不要再滚动的函数回调中频繁的调用this.setData
    const flag = scrollTop >= TOP_DISTANCE
    if( flag != this.data.showBackTop) {
      this.setData({
        showBackTop : flag
      })
    }

  },

  imageLoad() {
      wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
        console.log(rect)
        this.data.tabScrollTop = rect.top
      }).exec()
  }
})