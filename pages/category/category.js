// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'
/**
 * categories:n. 类别（category的复数）；分类
 * 
 */
Page({
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory()

  },

  _getData() {
    
  },
  _getCategory() {
    getCategory().then(res => {
      console.log(res)
      // 1.请求分类数据
      const categories = res.data.data.category.list;
      // 2.初始化每个类别的子数据
      const categoryData = {}
      for(let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDatail: []
        }
      }
      //3.修改data中的数据
      this.setData({
        categories: categories,
        categoryData: categoryData
      })

      // 4.请求第一个类别的数据
      this._getSubcategory(0)

      //5.请求5.请求第一个类别的详情数据
      this._getCategoryDetail(0)


    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取对应的maitkey
    const maitkey = this.data.categories[currentIndex].maitKey
    // 2.请求数据
    getSubcategory(maitkey).then(res => {
      console.log(res)
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list
      this.setData({
        categoryData: tempCategoryData
      })

    })

  },
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的minWallKey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey
    //2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop')
  },
  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      // 1.获取categoryData
      console.log(res)
      const categoryData = this.data.categoryData;
      // 2. 修改数据
      categoryData[index].categoryDatail = res.data
     // 3.修改data中的数据
     this.setData({
       categoryData: categoryData
     })
    })
  },
  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })
    // 2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  }
  
})