const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件
  entry: './index.js',
  
  // 输出地址
  output: {
    filename: 'chunk1.js',
    path: resolve(__dirname, 'build')
  },

  // loader
  module: {
    // test: RegExp 匹配到的文件类型
    // use: Array<string> 对匹配到的文件通过loader按照从后到前的顺序依次进行处理
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader' // 引入img将其交付给url-loader
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        loader: 'url-loader', // url-loader & file-loader
        options: {
          limit: 4 * 1024, // 当图片小于4kb, 转换为base64
          name: '[hash:8].[ext]' // 生成图片的hash取8位, ext表示取原后缀
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 创建style标签并将相应的js模块(css)资源插入head标签
          'css-loader' // 将css文件变为可识别的js模块, 内容为样式字符串
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader' // sass-loader & node-sass
        ]
      },
      {
        exclude: /\.(html|css|js|scss|sass)$/, // 排除 html... 资源
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]' // 生成文件的hash取8位, ext表示取原后缀
        }
      }
    ]
  },

  // plugins
  plugins: [
    // 会自动引入打包后生成的资源
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],

  // 模式
  // 开发环境(development), 生产环境(production)
  mode: 'development'
}
