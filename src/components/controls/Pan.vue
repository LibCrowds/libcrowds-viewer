<template>
  <div class="lv-pan-controls">

    <controls
      position="bottom"
      scale="1"
      :buttons="buttons">
    </controls>

  </div>
</template>

<script>
import Controls from '@/components/Controls'
import OpenSeadragon from 'openseadragon'

export default {
  props: {
    viewer: {
      type: Object,
      required: true
    },
    panBy: {
      type: Number,
      required: true
    }
  },

  components: {
    Controls
  },

  computed: {
    buttons: function () {
      let buttons = [
        {
          id: 'pan-up',
          tooltip: 'Move up',
          icon: 'chevron-up',
          click: () => {
            this.viewer.viewport.panBy(new OpenSeadragon.Point(0, -this.panBy))
          }
        },
        {
          id: 'pan-down',
          tooltip: 'Move down',
          icon: 'chevron-down',
          click: () => {
            this.viewer.viewport.panBy(new OpenSeadragon.Point(0, this.panBy))
          }
        },
        {
          id: 'pan-left',
          tooltip: 'Move left',
          icon: 'chevron-left',
          click: () => {
            this.viewer.viewport.panBy(new OpenSeadragon.Point(-this.panBy, 0))
          }
        },
        {
          id: 'pan-right',
          tooltip: 'Move right',
          icon: 'chevron-right',
          click: () => {
            this.viewer.viewport.panBy(new OpenSeadragon.Point(this.panBy, 0))
          }
        }
      ]
      return buttons
    }
  }
}
</script>
