import Vue from 'vue'
import LibcrowdsViewer from 'libcrowds-viewer'
/* eslint-enable */
import App from './App.vue';

Vue.component('lc-viewer', LibcrowdsViewer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
