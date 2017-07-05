const webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: ['test/index.js'],
    preprocessors: {
      'test/index.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })
}
