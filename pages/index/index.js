const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    ImageServerUrl: api.ImageServerUrl,
    goodsCount: 0,
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: [],
    status: 0
    
  },
  onShareAppMessage: function () {
    return {
      title: 'NideShop',
      desc: '仿网易严选微信小程序商城',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;

    

    util.request(api.IndexUrl).then(function (res) {
      if (res.status === 200) {
        that.setData({
          
          status: res.status,
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotgoods, //=====热门商品=====
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.rollAdvPic,
          channel: res.data.channel
        });
      }
    });
  },
  onLoad: function (options) {
    
    this.getIndexData();
    //util.request(api.GoodsCount).then(res => {
    //  this.setData({
    //    goodsCount: res.data.goodsCount
    //  });
    //});
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
