import Vue from 'vue'

Vue.config.productionTip = false

const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
const srcContext = require.context('../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
