const webpackConfig = require('./config/webpack.test.config.js')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      '../../node_modules/es6-promise/dist/es6-promise.auto.js',
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      'test/index.js'
    ],
    reporters: ['spec', 'coverage'],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    browserNoActivityTimeout: 20000,
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
