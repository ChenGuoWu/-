module.exports = {
  publicPath: "./",
  assetsDir: "static",
  outputDir: 'dist',

  css: {
    loaderOptions: {
           css: {
                   // options here will be passed to css-loader
           },
    //  postcss: {
    //             // options here will be passed to postcss-loader
    //             plugins: [require('postcss-px2rem')({
    //                       remUnit: 37.5,//设计稿的 十分之一
    //                       "exclude": /node_modules/i
    //             })]
    //        }
      }
  },
  // devServer: {
  //   proxy: {
  //     "/pro": {
  //       target: "http://172.25.42.35:8888",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/pro': ''
  //       }
  //     },
  //     "/dev": {
  //       target: "http://172.25.42.35:8888",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/dev': ''
  //       }
  //     }
  //   }
   
  // },
  lintOnSave: false 
};