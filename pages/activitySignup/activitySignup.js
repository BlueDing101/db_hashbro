// pages/activitySignup/activitySignup.js
const api = require('../../config/api.js')
var util = require('../../utils/util.js');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id: 0,
    activity_name: '',
    activity_detail:{},
    storeList:[],
    storeChoseFlag: false,
    storeChoseName: "点击选择门店",
    storeChoseID: 0,
    storeImg: '',
    userName: null,
    cellphoneNum: '',
    uid: 'test'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      activity_id: parseInt(options.id)
    });
    var url_signup = api.ActivityInfo_Detail + '?activity_id=' + String(this.data.activity_id)
    util.request(url_signup).then(function (res) {
      if (res.status === 200) {
        that.setData({
          activity_name: res.data.activity_name,
          activity_detail: res.data,
          storeList: res.data.activity_store
        });
      }
    });

    // wx.request({
    //   url: api.ActivityInfo_Detail +'?activity_id='+String(this.data.activity_id),
    //   success: function(res){
    //     // console.log(res.data.data.activity_store)
    //     that.setData({
    //       activity_name: res.data.data.activity_name,
    //       activity_detail: res.data.data,
    //       storeList: res.data.data.activity_store
    //     })
    //   }
    // })

  },

  clickToChooseStore: function(){
    let str = JSON.stringify(this.data.storeList);
    wx.navigateTo({
      url: '../activityStore/activityStore?jsonStr=' + str,
    })
  },

  onChangeUname(event) {
    // event.detail 为当前输入的值
    let that = this
    // console.log(event.detail)
    that.setData({
      userName: event.detail
    })
  },

  onChangePhoneNum(event) {
    // event.detail 为当前输入的值
    let that = this
    that.setData({
      cellphoneNum: event.detail
    })
  },

  clickToSignUp: function(){
    console.log(this.data.uid)
    console.log(this.data.activity_id)
    console.log(this.data.storeChoseID)
    console.log(this.data.userName)
    console.log(this.data.cellphoneNum)

    util.request(api.ActivitySignUp, {
      activity: this.data.activity_id,
      store: this.data.storeChoseID,
      signup_name: this.data.userName,
      signup_phone: this.data.cellphoneNum
    }, "POST").then(function (res) {
      if (res.status === 200) {
        Dialog.alert({
          message: "报名成功！"
        }).then(() => {
          wx.switchTab({
            url: '../activity/activity',
          })
        });
      }
      if (res.status === 406) {
        console.log(res)
        Dialog.alert({
          message: res.message.non_field_errors
        }).then(() => {
          // on close
        });
      }
    });


    // wx.request({
    //   url: api.ActivitySignUp,
    //   method: 'POST',
    //   data: {
    //     user_id: this.data.uid,
    //     activity: this.data.activity_id,
    //     store: this.data.storeChoseID,
    //     signup_name: this.data.userName,
    //     signup_phone: this.data.cellphoneNum
    //   },
    //   success: (res) => {
    //     // console.log(res)
    //     if(res.data.status == 200)
    //     {
    //       Dialog.alert({
    //         message: '报名成功！'
    //       }).then(() => {
    //         // on close
    //       });
    //     }
    //     else
    //     {

    //     }
    //     console.log(res.data)
    //   }
    // })
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