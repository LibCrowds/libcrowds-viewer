import 'whatwg-fetch'
import 'es6-promise/auto'
import 'es6-object-assign/auto'

import Viewer from './components/Viewer.vue'
import ModalBase from './components/modals/Base.vue'

export default {
  install (Vue) {
    if (this._libcrowds_viewer_installed) {
      return
    }

    this._libcrowds_viewer_installed = true

    Vue.component('lv-modal', ModalBase)

    Vue.component('libcrowds-viewer', Viewer)
  }
}
