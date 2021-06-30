// module.exports = {
//     configureWebpack: config => {
//       if (process.env.NODE_ENV === 'production') {
//         // 为生产环境修改配置...
//       } else {
//         // 为开发环境修改配置...
//       }
//     }
//   }

// const webpack = require("webpack");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const isProd = process.env.NODE_ENV === "product";

module.exports = {
  productionSourceMap: false, // 生产环境禁用sourceMap
  lintOnSave: true,
  publicPath: `/`,
  outputDir: `dist/`,
  devServer: {
    host: "0.0.0.0",
    hotOnly: true,
    open: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://10.10.202.66:18889/",
        changeOrigin: true, //后台在本地启动， 是否支持跨域
        secure: false, // https下设置为true
        logLevel: "debug",
        pathRewrite: {
          "^/api": "",
        },
        cookiePathRewrite: {
          "/unchanged.path/": "/unchanged.path/",
          "/old.path/": "/new.path/",
          "*": "",
        },
        cookieDomainRewrite: {
          "unchanged.domain": "unchanged.domain",
          "old.domain": "new.domain",
          "*": "",
        },
      },
    },
  },
};
