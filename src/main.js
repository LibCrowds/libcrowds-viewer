import 'es6-promise/auto'
import 'es6-object-assign/auto'

import Viewer from './components/Viewer.vue'
import 'normalize.css'

export default {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    Vue.component('libcrowds-viewer', Viewer)
  }
}
