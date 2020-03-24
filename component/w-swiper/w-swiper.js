// component/w-swiper/w-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    circular: {
      type: Boolean,
      value: true
    },
    autoplay: {
      type: Boolean,
      value: true
    },
    duration: {
      type: String,
      value: 500
    },
    interval: {
      type: String,
      value: 3000
    },
    indicatorDots: {
      type: Boolean,
      value: true
    },
    indicatorActiveColor: {
      type: String,
      value: "#ff5777"
    },
    hei: {
      type: String,
      value: ""
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
    imgLoad(e) {
      if(this.properties.hei == "") {
        var winWid = wx.getSystemInfoSync().windowWidth        //获取当前屏幕的宽度
        var imgh=e.detail.height　　　　　　　　　　　　　　　//图片高度
        var imgw=e.detail.width
        var swiperH=winWid*imgh/imgw + "px"　
        this.setData({
          hei: swiperH
        })
      }
    }
  },
  
})
