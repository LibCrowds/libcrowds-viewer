import 'es6-promise/auto'
import 'es6-object-assign/auto'

import Vue from 'vue'
import LibcrowdsViewer from 'libcrowds-viewer'

/* eslint-enable */
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render (h) {
    return h(App)
  }
})
