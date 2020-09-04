const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/easy_format/api', {
    target: 'http://localhost:3002',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/easy_format/api': '/api'
    }
  }))
};
