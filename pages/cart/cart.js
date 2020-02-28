var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    ImageServerUrl:api.ImageServerUrl,
    cartGoods: [],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0.00
    },
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数


  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    this.getCartList();
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  getCartList: function () {
    let that = this;
    util.request(api.CartList).then(function (res) {
      if (res.status === 200) {
        console.log(res.data);
        that.setData({
          cartGoods: res.data.items,
          cartTotal: res.data.checkedGoodsAmount
        });

      console.log("============");
      
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  },
  isCheckedAll: function () {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function (element) {
              console.log(element.checkbox)
      if (element.checkbox == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  checkedItem: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;
    console.log(itemIndex);
    console.log(that.data.cartGoods[itemIndex]);
    if (!this.data.isEditCart) {//如果前端不在编辑状态下，点击check框。pass productId & 当前check状态去服务端
      util.request(api.CartChecked, [{ productId: that.data.cartGoods[itemIndex].productbaseinfo.productId, isChecked: that.data.cartGoods[itemIndex].checkbox ? 0 : 1 }], 'POST').then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
          that.setData({
            cartGoods: res.data,
            cartTotal: res.data.checkedGoodsAmount
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态。（往往是要做删除操作）
      let tmpCartData = this.data.cartGoods.map(function (element, index, array) {
        if (index == itemIndex){
          element.checkbox = !element.checkbox;
        }
        
        return element;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal': that.getCheckedGoodsCount()
      });
    }
  },
  getCheckedGoodsCount: function(){
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function (v) {
      if (v.checked === true) {
        checkedGoodsCount += v.nums;
      }
    });
    console.log(checkedGoodsCount);
    return checkedGoodsCount;
  },
  checkedAll: function () {
      let that = this;
      let checkproductlist = []
      if (!this.data.isEditCart) {
        var product = this.data.cartGoods;

      for (var i = 0; i < product.length; i++) { 
        checkproductlist.push({productId: product[i].productbaseinfo.productId,isChecked:that.isCheckedAll() ? 0 : 1})
        console.log(checkproductlist)
      }
      
      if (checkproductlist.length <= 0) {
        return false;
      }
      util.request(api.CartChecked, checkproductlist, 'POST').then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
          that.setData({
            cartGoods: res.data,
            cartTotal: res.data.checkedGoodsAmount
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function (v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal': that.getCheckedGoodsCount()
      });
    }

  },
  editCart: function () {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function (v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal': that.getCheckedGoodsCount()
      });
    }

  },
  updateCart: function (number,productId) {
    let that = this;
    console.log("123eee")
    util.request(api.CartUpdate, {
      nums: number,
      productId: productId
      
    }, 'POST').then(function (res) {
      if (res.status === 200) {
        console.log(res.data);
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll(),

        cartTotal: res.data.checkedGoodsAmount
      });
    });

  },
  cutNumber: function (event) {

    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.nums - 1 > 1) ? cartItem.nums - 1 : 1;
    cartItem.nums = number;
    this.setData({
      cartGoods: this.data.cartGoods,
      cartTotal: this.data.checkedGoodsAmount
    });
    this.updateCart(number,cartItem.productbaseinfo.productId);
  },
  addNumber: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = cartItem.nums + 1;
    cartItem.nums = number;
    this.setData({
      cartGoods: this.data.cartGoods,
      cartTotal: this.data.checkedGoodsAmount
    });
    this.updateCart(number,cartItem.productbaseinfo.productId);

  },
  checkoutOrder: function () {
    //获取已选择的商品
    let that = this;

    var checkedGoods = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checkbox == true) {
        return true;
      } else {
        return false;
      }
    });

    if (checkedGoods.length <= 0) {
      return false;
    }


    wx.navigateTo({
      url: '../shopping/checkout/checkout'
    })
  },
  deleteCart: function () {
    //获取已选择的商品
    let that = this;
    let product_delete_list = []
    //let productId = this.data.cartGoods.filter(function (element, index, array) {
    // function checkdeletebox(element,) {
    // return age >= 18;
    // }
    
    let product = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checkbox == true) {
        console.log(element)
        console.log(index)
        console.log(array)
        return true;
      } else {
        return false;
      }
    });
    //let productId = product.productbaseinfo.productId
    console.log(product)
    
    for (var i = 0; i < product.length; i++) { 
      product_delete_list.push(product[i].productbaseinfo.productId)
    }
    console.log(product_delete_list)
    if (product_delete_list.length <= 0) {
      return false;
    }

    // product_delete_list = product_delete_list.map(function (element, index, array) {
    //   if (element.checkbox == true) {
    //     return element.productId;
    //   }
    // });

    console.log(product_delete_list)
    console.log("....//////")
    util.request(api.CartDelete, {
      productId_list: product_delete_list
    }, 'DELETE').then(function (res) {
      if (res.status === 200) {
        console.log(res.data);
        // let cartList = res.data.map(v => {
        //   console.log(v);
        //   v.checked = false;
        //   return v;
        // });
        
        that.setData({
          cartGoods: res.data,
          cartTotal: res.data.checkedGoodsAmount
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  }
})