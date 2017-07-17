const webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine', 'phantomjs-shim'],
    files: ['test/index.js'],
    reporters: ['spec', 'coverage'],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
