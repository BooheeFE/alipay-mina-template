/**
 * @desc app.js
 * @author simbawu
 * @date 2018-08-14
 */

App({
  globalData: {
    token: ''
  },
  onLaunch: function(options) {
  	// 开发者工具启动参数请添加：env=qa 或 env=production
    my.setStorageSync({
      key: 'env',
      data: options.query.env
    });
  }
})