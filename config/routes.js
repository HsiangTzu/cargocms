
/**
 * Route Mappings
 * (sails.config.routes)
 */


import customConfigLoader from './util/customConfigLoader.js';

var customConfig = customConfigLoader('routes.js');

var defaultConfig = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //----- index -----


  //----- api -----
  'get /api/admin/mock': "api/admin/MockController.find",

  'post /api/admin/upload': 'api/admin/ImageController.upload',
  'delete /api/admin/upload/:id': 'api/admin/ImageController.destroy',

  'post /api/admin/user/exportBirthday': 'api/user/UserController.exportBirthday',
  'get /api/admin/user': 'api/admin/UserController.find',
  'get /api/admin/user/:id': 'api/admin/UserController.findOne',
  'post /api/admin/user': 'api/admin/UserController.create',
  'put /api/admin/user/:id': 'api/admin/UserController.update',
  'delete /api/admin/user/:id': 'api/admin/UserController.destroy',
  'put /api/admin/user/activate/:id': 'api/admin/UserController.activate',

  'get /api/admin/post': 'api/admin/PostController.find',
  'get /api/admin/post/:id': 'api/admin/PostController.findOne',
  'post /api/admin/post': 'api/admin/PostController.create',
  'put /api/admin/post/changePublish/:id': 'api/admin/PostController.changePublish',
  'put /api/admin/post/:id': 'api/admin/PostController.update',
  'delete /api/admin/post/:id': 'api/admin/PostController.destroy',

  'get /api/admin/config': 'api/admin/ConfigController.find',
  'get /api/admin/config/:id': 'api/admin/ConfigController.findOne',
  'post /api/admin/config': 'api/admin/ConfigController.create',
  'put /api/admin/config/:id': 'api/admin/ConfigController.update',
  'delete /api/admin/config/:id': 'api/admin/ConfigController.destroy',
  'post /api/admin/config/reload': 'api/admin/ConfigController.reload',

  'get /api/admin/quote': 'api/admin/QuoteController.find',
  'get /api/admin/quote/:id': 'api/admin/QuoteController.findOne',
  'post /api/admin/quote': 'api/admin/QuoteController.create',
  'put /api/admin/quote/:id': 'api/admin/QuoteController.update',
  'delete /api/admin/quote/:id': 'api/admin/QuoteController.destroy',

  'post /api/admin/allpay/find':  'api/admin/AllpayController.find',
  'post /api/admin/allpay/export': 'api/admin/AllpayController.export',
  'post /api/admin/allpay/exportSend': 'api/admin/AllpayController.exportSend',
  'post /api/admin/allpay/exportExcel': 'api/admin/AllpayController.exportExcel',
  'post /api/admin/allpay/exportSendExcel': 'api/admin/AllpayController.exportSendExcel',
  'post /api/admin/allpay/import/trackingNumber': 'api/admin/AllpayController.importTrackingNumberExcel',
  'put /api/admin/allpay/trackingNumber': 'api/admin/AllpayController.updateTrackingNumberfromExcel',

  'get /api/admin/allpay/:id':    'api/admin/AllpayController.findOne',
  'post /api/admin/allpay':       'api/admin/AllpayController.create',
  'put /api/admin/allpay/:id':    'api/admin/AllpayController.update',
  'delete /api/admin/allpay/:id': 'api/admin/AllpayController.destroy',

  'get /api/admin/message':        'api/admin/MessageController.find',
  'get /api/admin/message/:id':    'api/admin/MessageController.findOne',
  'post /api/admin/message':       'api/admin/MessageController.create',
  'put /api/admin/message/:id':    'api/admin/MessageController.update',
  'delete /api/admin/message/:id': 'api/admin/MessageController.destroy',

  'get /api/user/current': 'api/UserController.getCurrentUser',
  'post /api/user/follow/:id':    'api/UserController.follow',
  'post /api/user/unfollow/:id':  'api/UserController.unfollow',
  'post /api/user/edit':      'api/UserController.update',
  'post /api/user/forgotPassword':'api/UserController.forgotPassword',
  'post /api/user/password':       'api/UserController.updatePassword',
  'get /api/user/validate/resend':  'api/UserController.validateResend',

  'post /api/contact':       'api/ContactController.create',
  'get /api/admin/contact':        'api/admin/ContactController.find',
  'get /api/admin/contact/:id':    'api/admin/ContactController.findOne',
  // 'post /api/admin/contact':       'api/admin/ContactController.create',
  // 'put /api/admin/contact/:id':    'api/admin/ContactController.update',
  'delete /api/admin/contact/:id': 'api/admin/ContactController.destroy',

  'get /api/admin/event':        'api/admin/EventController.find',
  'get /api/admin/event/new':    'api/admin/EventController.findNewEvent',
  'get /api/admin/event/:id':    'api/admin/EventController.findOne',
  'get /api/admin/event/new/:id':'api/admin/EventController.findByPostOrNew',
  'post /api/admin/event':       'api/admin/EventController.create',
  'put /api/admin/event/:id':    'api/admin/EventController.update',
  'delete /api/admin/event/:id': 'api/admin/EventController.destroy',
  'post /api/event/paid':        'api/admin/EventController.paid',
  'post /api/event/paymentinfo': 'api/admin/EventController.paymentinfo',

  'post /api/admin/eventallpay/find':  'api/admin/EventAllpayController.find',
  'post /api/admin/eventallpay/export': 'api/admin/EventAllpayController.exportExcel',
  'post /api/admin/eventallpay/exportSign': 'api/admin/EventAllpayController.exportSignExcel',
  'get /api/admin/eventallpay/:id':    'api/admin/EventAllpayController.findOne',
  // 'post /api/admin/eventallpay':       'api/admin/EventAllpayController.create',
  'put /api/admin/eventallpay/:id':    'api/admin/EventAllpayController.update',
  'delete /api/admin/eventallpay/:id': 'api/admin/EventAllpayController.destroy',
  'put /api/admin/eventorder/status/:id': 'api/admin/EventOrderController.updateProductionStatus',

  'get /api/admin/download': 'api/admin/DownloadController.download',

  'get /api/admin/facebook/feed':        'api/admin/facebook/FeedController.find',
  'get /api/admin/facebook/import':        'api/admin/facebook/FeedController.import',
  'put /api/admin/facebook/update':        'api/admin/facebook/FeedController.update',

  'get /api/admin/product': 'api/admin/ProductController.find',
  'get /api/admin/product/:id': 'api/admin/ProductController.findOne',
  'post /api/admin/product': 'api/admin/ProductController.create',
  'put /api/admin/product/:id': 'api/admin/ProductController.update',
  'delete /api/admin/product/:id': 'api/admin/ProductController.destroy',

  'get /api/admin/productdescription':      'api/admin/ProductDescriptionController.find',
  'get /api/admin/productdescription/:id':  'api/admin/ProductDescriptionController.findOne',
  'post /api/admin/productdescription':      'api/admin/ProductDescriptionController.create',
  'put /api/admin/productdescription/:id':  'api/admin/ProductDescriptionController.update',
  'delete /api/admin/productdescription/:id':  'api/admin/ProductDescriptionController.destroy',

  'post /api/order': 'api/OrderController.createOrder',

  // 'put /api/admin/order/confirm/:id': 'api/admin/OrderController.confirm',

  'post  /api/admin/suppliershiporder/all': 'api/admin/SupplierShipOrderController.find',
  'put /api/admin/suppliershiporder/status/:id': 'api/admin/SupplierShipOrderController.status',

  'post  /api/admin/suppliershiporderproduct/all': 'api/admin/SupplierShipOrderProductController.find',
  'put /api/admin/suppliershiporderproduct/status/:id': 'api/admin/SupplierShipOrderProductController.status',

  'get /api/admin/order': 'api/admin/OrderController.find',
  'get /api/admin/order/:id': 'api/admin/OrderController.findOne',
  'post /api/admin/order': 'api/admin/OrderController.create',
  'put /api/admin/order/status/:id': 'api/admin/OrderController.updateStatus',
  'put /api/admin/order/:id': 'api/admin/OrderController.update',
  'delete /api/admin/order/:id': 'api/admin/OrderController.destroy',

  'get /api/admin/orderproduct': 'api/admin/OrderProductController.find',
  'get /api/admin/orderproduct/:id': 'api/admin/OrderProductController.findOne',
  'post /api/admin/orderproduct': 'api/admin/OrderProductController.create',
  'put /api/admin/orderproduct/:id': 'api/admin/OrderProductController.update',
  'delete /api/admin/orderproduct/:id': 'api/admin/OrderProductController.destroy',

  'get /api/admin/suppliershiporder': 'api/admin/SupplierShipOrderController.find',
  'get /api/admin/suppliershiporder/:id': 'api/admin/SupplierShipOrderController.findOne',
  'post /api/admin/suppliershiporder': 'api/admin/SupplierShipOrderController.create',
  'put /api/admin/suppliershiporder/:id': 'api/admin/SupplierShipOrderController.update',
  'delete /api/admin/suppliershiporder/:id': 'api/admin/SupplierShipOrderController.destroy',

  'get /api/admin/supplier': 'api/admin/SupplierController.find',
  'get /api/admin/supplier/:id': 'api/admin/SupplierController.findOne',
  'post /api/admin/supplier': 'api/admin/SupplierController.create',
  'put /api/admin/supplier/:id': 'api/admin/SupplierController.update',
  'delete /api/admin/supplier/:id': 'api/admin/SupplierController.destroy',

  'get /api/admin/suppliershiporderproduct': 'api/admin/SupplierShipOrderProductController.find',
  'get /api/admin/suppliershiporderproduct/:id': 'api/admin/SupplierShipOrderProductController.findOne',
  'post /api/admin/suppliershiporderproduct': 'api/admin/SupplierShipOrderProductController.create',
  'put /api/admin/suppliershiporderproduct/:id': 'api/admin/SupplierShipOrderProductController.update',
  'delete /api/admin/suppliershiporderproduct/:id': 'api/admin/SupplierShipOrderProductController.destroy',


  'get /api/admin/orderpayment': 'api/admin/OrderPaymentController.find',
  'get /api/admin/orderpayment/:id': 'api/admin/OrderPaymentController.findOne',
  'post /api/admin/orderpayment': 'api/admin/OrderPaymentController.create',
  'put /api/admin/orderpayment/:id': 'api/admin/OrderPaymentController.update',
  'delete /api/admin/orderpayment/:id': 'api/admin/OrderPaymentController.destroy',

  'get /api/admin/orderpaymentstatus': 'api/admin/OrderPaymentStatusController.find',
  'get /api/admin/orderpaymentstatus/:id': 'api/admin/OrderPaymentStatusController.findOne',
  'post /api/admin/orderpaymentstatus': 'api/admin/OrderPaymentStatusController.create',
  'put /api/admin/orderpaymentstatus/:id': 'api/admin/OrderPaymentStatusController.update',
  'delete /api/admin/orderpaymentstatus/:id': 'api/admin/OrderPaymentStatusController.destroy',

  'get /api/admin/orderhistory': 'api/admin/OrderHistoryController.find',
  'get /api/admin/orderhistory/:id': 'api/admin/OrderHistoryController.findOne',

  'get /api/admin/orderpaymenthistory': 'api/admin/OrderPaymentHistoryController.find',
  'get /api/admin/orderpaymenthistory/:id': 'api/admin/OrderPaymentHistoryController.findOne',
  // 'post /api/admin/orderpaymenthistory': 'api/admin/OrderPaymentHistoryController.create',
  // 'put /api/admin/orderpaymenthistory/:id': 'api/admin/OrderPaymentHistoryController.update',
  // 'delete /api/admin/orderpaymenthistory/:id': 'api/admin/OrderPaymentHistoryController.destroy',

  'get /api/admin/suppliershiporderhistory': 'api/admin/SupplierShipOrderHistoryController.find',
  'get /api/admin/suppliershiporderhistory/:id': 'api/admin/SupplierShipOrderHistoryController.findOne',
  // 'post /api/admin/suppliershiporderhistory': 'api/admin/SupplierShipOrderHistoryController.create',
  // 'put /api/admin/suppliershiporderhistory/:id': 'api/admin/SupplierShipOrderHistoryController.update',
  // 'delete /api/admin/suppliershiporderhistory/:id': 'api/admin/SupplierShipOrderHistoryController.destroy',

  //-----language-----
  'post /api/admin/language': 'api/admin/LanguageController.create',
  'put /api/admin/language/:name': 'api/admin/LanguageController.update',
  'get /api/admin/language/:name': 'api/admin/LanguageController.find',
  'delete /api/admin/language/:name': 'api/admin/LanguageController.destroy',

  'get /api/product': 'api/ProductController.find',

  'get /orderinfo/:orderNumber': 'api/OrderController.getOrderInfo',
  'post /order': 'api/OrderController.createOrder',

  //----- Event -----
  'get /events/:name': 'EventController.show',

  //----- QA -----
  'get /questions': 'EventController.index',
  'get /questions/:name': 'EventController.show',

  //----- Blog -----
  'get /blogs/:name': 'BlogController.show',

  //----- Admin -----
  '/admin':           'AdminController.index',
  '/admin/config.js': 'AdminController.configJson',

  //----- AuthController -----
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',
  'get /forgot': 'AuthController.forgot',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',

  //----- WallController -----
  'get /wall/:id': 'WallController.show',

  //----- Facebook -----
  'get /admin/facebook/:controller/:action/:id?': {},

  //----- robots ---
  'get /robots.txt': 'RobotsController.robots',

  //---- mobile ----
  'get /m': '/',
  'get /mobile': '/',
};

module.exports.routes = {

  ...customConfig,
  ...defaultConfig,
  "/admin/:controller/:action/:id?": {},
  "/:controller/:action/:id?": {}
};
