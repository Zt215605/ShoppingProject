const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, //关闭语法检查
  // 代理跨域
  devServer:{
    proxy: {
      "/api": {
        // target: "http://39.98.123.211",   请求地址变为了:http://gmall-h5-api.atguigu.cn
        target:"http://gmall-h5-api.atguigu.cn"             // target:'http://localhost:5011'   本地服务器
        // target:'http://localhost:5011'
        // pathRewrite: {"^/api" : ""}
      }
    }
  },
  
})
