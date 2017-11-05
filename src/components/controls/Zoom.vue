<template>
  <div class="lv-toolbar" id="lv-zoom-controls">
    <control-button
      v-for="(b, index) in buttons"
      :key="`lv-zoom-${index}`"
      :tooltip="b.tooltip"
      :callback="b.callback"
      position="bottom"
      hint-position="top">
      <icon :name="b.icon" scale="1.35"></icon>
    </control-button>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/minus-circle'
import 'vue-awesome/icons/refresh'
import ControlButton from '@/components/controls/ControlButton'

export default {
  props: {
    viewer: {
      type: Object,
      required: true
    },
    zoomBy: {
      type: Number,
      required: true
    }
  },

  components: {
    Icon,
    ControlButton
  },

  computed: {
    buttons () {
      return [
        {
          tooltip: 'Zoom in',
          icon: 'plus-circle',
          callback: () => {
            const currentZoom = this.viewer.viewport.getZoom(true)
            const zoomTo = currentZoom + (currentZoom * this.zoomBy)
            this.viewer.viewport.zoomTo(zoomTo)
          }
        },
        {
          tooltip: 'Reset zoom',
          icon: 'refresh',
          callback: () => {
            const homeZoom = this.viewer.viewport.getHomeZoom()
            this.viewer.viewport.zoomTo(homeZoom)
          }
        },
        {
          tooltip: 'Zoom out',
          icon: 'minus-circle',
          callback: () => {
            const currentZoom = this.viewer.viewport.getZoom(true)
            const zoomTo = currentZoom - (currentZoom * this.zoomBy)
            this.viewer.viewport.zoomTo(zoomTo)
          }
        }
      ]
    }
  }
}
</script>
