const ApiRootUrl = 'http://www.digital-boundary.com:31881/api/wxapp/v1/';
const ImageServer = 'http://www.digital-boundary.com:31881';
module.exports = {
  ImageServerUrl: ImageServer,
  IndexUrl: ApiRootUrl + 'home/all', //首页数据接口OK
  CatalogList: ApiRootUrl + 'catalog/index',  //分类目录全部分类数据接口
  CatalogCurrent: ApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口

  //test api
  Test: 'http://101.132.103.176:31132/api/wxapp/v1/product/items?productId=JM1104',
  AuthLoginByWeixin: ApiRootUrl + 'user/register', //微信登录ok

  ActivityInfo: ApiRootUrl + 'activity/activity_view',  //活动信息
  ActivityInfo_Detail: ApiRootUrl + 'activity/activitydetail_view', //活动详细信息
  ActivitySignUp: ApiRootUrl + 'signup/signup_create', //活动报名，提交报名信息
  ActivityCheckSignUp: ApiRootUrl + 'signup/signup_view', //查看已报名的活动
  ActivityDelete: ApiRootUrl + 'signup/signup_cancel', //删除活动

  GoodsCount: ApiRootUrl + 'goods/count',  //统计商品总数
  GoodsList: ApiRootUrl + 'goods/list',  //获得商品列表
  GoodsCategory: ApiRootUrl + 'goods/category',  //获得分类数据
  GoodsDetail: ApiRootUrl + 'items/detail',  //获得商品的详情OK
  GoodsNew: ApiRootUrl + 'goods/new',  //新品
  GoodsHot: ApiRootUrl + 'goods/hot',  //热门
  GoodsRelated: ApiRootUrl + 'goods/related',  //商品详情页的关联商品（大家都在看）

  BrandList: ApiRootUrl + 'brand/list',  //品牌列表
  BrandDetail: ApiRootUrl + 'brand/detail',  //品牌详情

  CartList: ApiRootUrl + 'trolly/item', //获取购物车的数据ok
  CartAdd: ApiRootUrl + 'trolly/item', // 添加商品到购物车ok
  CartUpdate: ApiRootUrl + 'trolly/num', // 更新购物车的商品ok
  CartDelete: ApiRootUrl + 'trolly/item', // 删除购物车的商品ok
  CartChecked: ApiRootUrl + 'trolly/checkbox', // 选择或取消选择商品ok
  CartGoodsCount: ApiRootUrl + 'cart/goodscount', // 获取购物车商品件数
  CartCheckout: ApiRootUrl + 'cart/checkout', // 下单前信息确认

  OrderSubmit: ApiRootUrl + 'order/submit', // 提交订单
  PayPrepayId: ApiRootUrl + 'pay/prepay', //获取微信统一下单prepay_id

  CollectList: ApiRootUrl + 'collect/list',  //收藏列表
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete',  //添加或取消收藏

  CommentList: ApiRootUrl + 'comment/list',  //评论列表
  CommentCount: ApiRootUrl + 'comment/count',  //评论总数
  CommentPost: ApiRootUrl + 'comment/post',   //发表评论

  TopicList: ApiRootUrl + 'topic/list',  //专题列表
  TopicDetail: ApiRootUrl + 'topic/detail',  //专题详情
  TopicRelated: ApiRootUrl + 'topic/related',  //相关专题

  SearchIndex: ApiRootUrl + 'search/index',  //搜索页面数据
  SearchResult: ApiRootUrl + 'search/items',  //搜索数据ok
  SearchHelper: ApiRootUrl + 'search/helper',  //搜索帮助
  SearchClearHistory: ApiRootUrl + 'search/clearhistory',  //搜索帮助

  AddressList: ApiRootUrl + 'address/list',  //收货地址列表
  AddressDetail: ApiRootUrl + 'address/detail',  //收货地址详情
  AddressSave: ApiRootUrl + 'address/save',  //保存收货地址
  AddressDelete: ApiRootUrl + 'address/delete',  //保存收货地址

  RegionList: ApiRootUrl + 'region/list',  //获取区域列表

  OrderList: ApiRootUrl + 'order/list',  //订单列表
  OrderDetail: ApiRootUrl + 'order/detail',  //订单详情
  OrderCancel: ApiRootUrl + 'order/cancel',  //取消订单
  OrderExpress: ApiRootUrl + 'order/express', //物流详情

  FootprintList: ApiRootUrl + 'footprint/list',  //足迹列表
  FootprintDelete: ApiRootUrl + 'footprint/delete',  //删除足迹
};