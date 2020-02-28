const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
  data: {
    userInfo: {},
    showLoginDialog: false,
    showLogoutDialog: true
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {

  },
  onShow: function() {
    if (wx.getStorageSync('token')) {
      console.log(wx.getStorageSync('token'))
      console.log(app.globalData.userInfo)

          this.setData({
        userInfo: app.globalData.userInfo,
        showLogoutDialog: true
        });
       
    }else{
        this.setData({
        userInfo: {},
        showLogoutDialog: false
        });
    }

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },

  onUserInfoClick: function() {
    if (wx.getStorageSync('token')) {

    } else {
      this.showLoginDialog();
    }
  },

  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },

  onCloseLoginDialog () {
    this.setData({
      showLoginDialog: false
    })
  },

  onDialogBody () {
    // 阻止冒泡
  },

  onWechatLogin(e) {
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({
        title: '微信登录失败',
      })
      return false
    }
    util.login().then((res) => {
      e.detail.userInfo['code'] = res
      this.userInfo = e.detail.userInfo
      console.log(e.detail.userInfo)
      console.log("=========")
      return util.request(api.AuthLoginByWeixin, e.detail.userInfo, 'POST');
    }).then((res) => {
      console.log(res)
      if (res.status !== 200) {
        wx.showToast({
          title: '微信登录失败',
        })
        return false;
      }
      // 设置用户信息
      this.setData({
        userInfo: res.data.userinfo,
        showLoginDialog: false,
        showLogoutDialog: true
      });
      app.globalData.userInfo = res.data.userinfo;
      app.globalData.token = res.data.session_key;
      wx.setStorageSync('userInfo', JSON.stringify(res.data.userinfo));
      wx.setStorageSync('token', res.data.session_key);
    }).catch((err) => {
      console.log(err)
    })
  },

  onOrderInfoClick: function(event) {
    wx.navigateTo({
      url: '/pages/ucenter/order/order',
    })
  },

  onSectionItemClick: function(event) {

  },

  // TODO 移到个人信息页面
  exitLogin: function() {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          
          wx.switchTab({
            url: '/pages/index/index'
          });


        }
      }
    })

  }
})