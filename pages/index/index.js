//index.js
//获取应用实例
const app = getApp()
import request from '../../network/home'
Page({
  data: {
    banner:[],
    recommend:[],
    tab_item: ['流行','新款','精选'],
    index: 0,
    t_top: 0,
    //存储goods数据
    goods: [
      {type: 'pop', page: 1, list: []},
      {type: 'new', page: 1, list: []},
      {type: 'sell', page: 1, list: []}
    ],
    isHidden: true,
    isFixed: false
  },
  onLoad() {
    // 获取首页数据(轮播图 | 推荐)
   request({
     url: '/home/multidata'
   }).then((res) => {
     const data = res.data.data
     this.setData({
       banner: data.banner.list ,
       recommend: data.recommend.list
     })
   })
  //  获取商品数据
   this.getGoods(0)
   this.getGoods(1)
   this.getGoods(2)
  },
  // 获取商品数据
  getGoods(i) {
    let index = i || this.data.index
    let type = this.data.goods[index].type
    let page = this.data.goods[index].page
    let list = this.data.goods[index].list
    request({
      url: '/home/data',
      data: {
       type,
       page
      }
    }).then((res) => {
      let newList = res.data.data.list
      list.push(...newList)
      let g_list = "goods["+ index +"].list"
      let g_page = "goods["+ index +"].page"
      this.setData({
        [g_list]: list,
        [g_page]: page+1
      })
      // console.log(list);
    })
  },
  //tab_control栏设置
  clickTabItem(event) {
    this.setData({
      index: event.detail.index
    })
  },
  //上拉加载
  onReachBottom() {
    wx.showLoading({
      title: '加载中',
    })
    this.getGoods()
    setTimeout(() => {
      wx.hideLoading()
    }, 200);
  },
  //回到顶部
  goTop() {
    wx.pageScrollTo({
      duration: 500,
      scrollTop: 0
    })
    this.setData({
      isHidden: true
    })
  },
  //页面滚动
  onPageScroll(e) { 
    let top = e.scrollTop
    //判断回到顶部按钮是否显示
    let flag = top <= 700
    if(flag != this.data.isHidden) { 
      this.setData({
        isHidden: flag
      })
    }
    //判断tab栏
    let t_flag = top >= this.data.t_top + 40
    if(t_flag != this.data.isFixed) {
      this.setData({
        isFixed: t_flag
      })
    }
  },
  onReady() {
    wx.createSelectorQuery().select("#tab_control").boundingClientRect(rect => {
      console.log(rect);
      this.setData({
        t_top: rect.top
      })
    }).exec()
  }
})

