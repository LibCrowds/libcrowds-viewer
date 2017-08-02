<template>
  <div class="lv-zoom-controls">

    <controls
      position="bottom"
      scale="1"
      hint-position="top"
      :buttons="buttons">
    </controls>

  </div>
</template>

<script>
import Controls from '@/components/Controls'

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
    Controls
  },

  computed: {
    buttons: function () {
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
