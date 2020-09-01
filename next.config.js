const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');

const baseURL = process.env.BASE_URL || '';

module.exports = Object.assign(
  {},
  withLess(withCss({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: {}
    }
  })),
  {
    assetPrefix: baseURL,
    env: {
      BASE_URL: baseURL
    }
  }
)