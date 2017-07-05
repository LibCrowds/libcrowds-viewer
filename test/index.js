import 'es6-promise/auto'

const testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
