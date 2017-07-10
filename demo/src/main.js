import 'es6-promise/auto'
import 'es6-object-assign/auto'

import Vue from 'vue'
import LibcrowdsViewer from 'libcrowds-viewer'
/* eslint-enable */
import Home from './pages/Home';
import Select from './pages/Select'
import Transcribe from './pages/Transcribe'
import NotFound from './pages/NotFound'

Vue.component('libcrowds-viewer', LibcrowdsViewer)

const routes = {
  '/': Home,
  '/select': Select,
  '/transcribe': Transcribe
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname.replace(process.env.BASE_URL, '')
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})
