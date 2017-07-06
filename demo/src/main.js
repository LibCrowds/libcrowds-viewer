import 'es6-promise/auto'
import 'es6-object-assign/auto'

import Vue from 'vue'
import LibcrowdsViewer from 'libcrowds-viewer'
/* eslint-enable */
import App from './App.vue';

Vue.component('libcrowds-viewer', LibcrowdsViewer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
