/*
 * @Author: fg
 * @Date: 2022-05-06 10:00:16
 * @LastEditors: fg
 * @LastEditTime: 2022-05-07 16:34:12
 * @Description: webpack 配置
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        // 根据打包过程中所遇到的文件路径匹配是否使用该loader
        test: /\.css$/,
        // 指具体的loader
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          // 'style-loader',
          // 2. 将css打包到独立文件中
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
        /* options: {
          // 当前的css所在的文件相对于打包后的根路径dist的相对路径
          publicPath: '../img'
        } */
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {
        test: /\.(jpg|png|gif)/,

        use: [
          {
            loader: 'url-loader',
            options: {
              // 图片大小小于8kb，就会被base64处理，优点：减少请求数量（减轻服务器压力），缺点：图片体积会更大（文件请求速度更慢）
              // base64在客户端本地解码所以会减少服务器压力，如果图片过大还采用base64编码会导致cpu调用率上升，网页加载时变卡
              limit: 8000,
              // 给图片重命名，[hash:10]：取图片的hash的前10位，[ext]：取文件原来扩展名
              name: '[hash:10].[ext]',
              // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是conmonjs，解析时会出问题：[object Module]
              // 解决：关闭url-loader的es6模块化，使用commonjs解析
              esModule: false,
              outputPath: 'img'
            }
          }
        ],
        type: 'javascript/auto'

      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // HMR特性所需要插件
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
      // 输出的css文件名不变的意思
    }),
    new HtmlWebpackPlugin({
      title: '加入会议',
      template: './index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, 'public'), to: 'public' }
      ]
    })
  ],
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
    // 压缩输出结果
    minimize: false
  },
  devServer: {
    hot: true,
    compress: true,
    port: 9000
  }
}
