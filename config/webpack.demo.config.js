var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, '../demo/src/main.js'),
  output: {
    path: path.resolve(__dirname, '../demo/dist'),
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'libcrowds-viewer': path.resolve(__dirname, '../src/main.js'),
      '@': path.resolve(__dirname, '../src'),
      style: path.resolve(__dirname, '../src/assets/style/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'demo/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
})

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '""',
        GITHUB_URL: '"https://github.com/libcrowds/libcrowds-viewer"'
      }
    })
  ])
}

if (process.env.NODE_ENV === 'production') {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BASE_URL: '"libcrowds-viewer/"',
        GITHUB_URL: '"https://github.com/libcrowds/libcrowds-viewer"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ])
}
