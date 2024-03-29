const { defineConfig } = require('@vue/cli-service')
const path = require('path-browserify')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,           //关闭双驼峰检查

  //开启代理服务器
  devServer: {
    proxy: {
          //发送ajax请求时应该带的前缀
        '/api': {
          target: 'http://localhost:8088',
          ws: true,        //如果要代理 websockets，配置这个参数
          secure: false,  // 如果是https接口，需要配置这个参数
          changeOrigin: true  //是否跨域
        },
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
      fallback: {
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        crypto: require.resolve("crypto-browserify"),
        zlib: require.resolve("browserify-zlib"),
        async: require.resolve("async_hooks"),
        fs: false,
      },     
    },
  }
})



