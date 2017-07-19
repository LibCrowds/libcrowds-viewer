const webpackConfig = require('./config/webpack.test.config.js')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'test/index.js'
    ],
    reporters: ['spec', 'coverage'],
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage'],
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
