# 开发服务器 devServer

1. 开发时服务器, 自动监听文件内容变化, 打包到内存中通过服务提供

```js
const { resolve } = require('path');

{
  devServer: {
    // 提供服务的位置
    // 1. resolve(__dirname, "dist")
    // 2. [path.join(__dirname, "public"), path.join(__dirname, "dist")]
    // 3. false
    contentBase: resolve(__dirname, "dist"),

    // 所在位置的文件进行 gzip 压缩
    compress: true,

    // dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”。
    lazy: true,

    // 惰性模式
    // 1. 在惰性模式中，此选项可减少编译。 默认在惰性模式，每个请求结果都会产生全新的编译。
    // 2. 配合 lazy: true 才可以开启
    filename: "bundle.js",

    // 在所有响应中添加首部内容
    headers: {
      "X-Custom-Foo": "bar"
    },

    // history 模式下 任意 404 情况下替换的 html 文件
    /*
      使用 rewrites 这个选项，此行为可进一步地控制
      rewrites: [
        { from: /^\/$/, to: '/views/landing.html' },
        { from: /^\/subpage/, to: '/views/subpage.html' },
        { from: /./, to: '/views/404.html' }
      ]
    */
    historyApiFallback: true,

    // hot 启动模块热更替
    hot: true,

    hotOnly: true,

    https: true,

    // 诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    noInfo: true,

    proxy: {
      "/api1": {
        target: "http://localhost:8080",
        pathRewrite: {
          "^/api1": ""
        }
      }
    },

    // 使浏览器可以使用您的本地IP打开。
    useLocalIp: true,

    // host
    host: "0.0.0.0",

    // 开启的端口号
    port: 3000,

    // 自动打开浏览器
    open: true
  }
}
```
