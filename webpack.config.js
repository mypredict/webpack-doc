import { resolve } from 'path';

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
        test: /\.css$/,
        use: [
          'style-loader', // 创建style标签并将相应的js模块(css)资源插入head标签
          'css-loader' // 将css文件变为可识别的js模块, 内容为样式字符串
        ]
      }
    ]
  },

  // plugins
  plugins: [],

  // 模式
  // 开发环境(development), 生产环境(production)
  mode: 'development'
}
