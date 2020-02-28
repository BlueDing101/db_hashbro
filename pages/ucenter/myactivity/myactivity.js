// pages/ucenter/myactivity/myactivity.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
import Dialog from "../../../miniprogram_npm/@vant/weapp/dialog/dialog"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myactivity_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log('########')
    util.request(api.ActivityCheckSignUp).then(function (res) {
      console.log(res)
      if(res.status === 200) {
        that.setData({
          myactivity_list: res.data
        })
      }
      console.log(that.data.myactivity_list)
    });
  },

  deleteMyActivity: function (e) {
    let that = this
    var activityID = e.currentTarget.dataset.id
    console.log(activityID)
    Dialog.confirm({
      message: '确定取消报名？'
    }).then(() => {
      console.log(api.ActivityDelete + '?signup_id=' + String(activityID))
      util.request(api.ActivityDelete + '?signup_id=' + String(activityID)).then(function (res) {
        // console.log(res)
        if(res.status === 200) {
          Dialog.alert({
            message: '取消成功！'
          }).then(() => {
            util.request(api.ActivityCheckSignUp).then(function (res) {
              console.log('flash')
              console.log(res)
              if (res.status === 200) {
                that.setData({
                  myactivity_list: res.data
                })
              }
              else{
                that.setData({
                  myactivity_list: []
                })
              }
            });
          });
        }
      })

    }).catch(() => {
      // on cancel
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})