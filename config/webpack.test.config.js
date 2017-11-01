require('babel-polyfill')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const webpackConfig = merge(baseConfig, {
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
