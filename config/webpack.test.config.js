require('babel-polyfill')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config')

var webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  }
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
