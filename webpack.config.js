const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = {
  // 入口文件
  entry: "./index.js",

  // 输出地址
  output: {
    filename: "chunk1.js",
    path: resolve(__dirname, "build")
  },

  // loader
  module: {
    // test: RegExp 匹配到的文件类型
    // use: Array<string> 对匹配到的文件通过 loader 按照从后到前的顺序依次进行处理
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader" // 引入 img 等资源将其交付给 url-loader
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        loader: "url-loader", // url-loader & file-loader
        options: {
          limit: 4 * 1024, // 当图片小于4kb, 转换为base64
          name: "[hash:8].[ext]", // 生成图片的 hash 取8位, ext 表示取原后缀
          outputPath: "image"
        }
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 创建 style 标签并将相应的 js 模块(css)资源插入 head 标签
          MiniCssExtractPlugin.loader, // 接管 style-loader, 将 css 提取为文件
          "css-loader", // 将 css 文件变为可识别的 js 模块, 内容为样式字符串
          {
            loader: "postcss-loader", // css 兼容
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")()]
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader", // css 兼容
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")()]
            }
          },
          "sass-loader" // sass-loader & node-sass
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true // 自动修复格式错误
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          preset: [
            "@babel/preset-env",
            {
              useBuiltIns: "usage", // 按需加载
              corejs: {
                // 使用的库及版本
                version: 3
              },
              targets: {
                // 兼容的版本
                chrome: 49
              }
            }
          ]
        }
      },
      {
        exclude: /\.(html|css|js|scss|sass|jpg|jpeg|png|gif|svg|webp)$/, // 排除 html... 资源
        loader: "file-loader",
        options: {
          name: "[hash:8].[ext]" // 生成文件的 hash 取8位, ext 表示取原后缀
        }
      }
    ]
  },

  // plugins
  plugins: [
    // 会自动引入打包后生成的资源
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true // 移除注释
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    }),
    new OptimizeCssAssetsWebpackPlugin() // 压缩 css
  ],

  // 开发服务器, 自动进行监听打包到内存, 不会输出到文件(build)
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true, // 启动 gzip
    port: 3000,
    open: true // 自动打开浏览器
  },

  // 模式
  // 开发环境(development), 生产环境(production)自动压缩js
  mode: "development"
};
