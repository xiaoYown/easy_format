const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/easy_format/api', {
    target: 'http://localhost:3010',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/easy_format/api': '/api'
    }
  }))
  app.use(proxy('/static/compress-images', {
    target: 'http://localhost:3004',
    secure: false,
    changeOrigin: true
  }))
};
