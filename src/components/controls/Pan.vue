<template>
  <div id="lv-pan-controls">

    <control-button
      v-for="(b, index) in buttons"
      :key="`btn-zoom-${index}`"
      :id="b.id"
      :tooltip="b.tooltip"
      :callback="b.callback"
      position="bottom"
      hint-position="top">
      <icon :name="b.icon"></icon>
    </control-button>

  </div>
</template>

<script>
import OpenSeadragon from 'openseadragon'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/arrow-circle-up'
import 'vue-awesome/icons/arrow-circle-down'
import 'vue-awesome/icons/arrow-circle-left'
import 'vue-awesome/icons/arrow-circle-right'
import ControlButton from '@/components/controls/ControlButton'

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
    Icon,
    ControlButton
  },

  computed: {
    buttons: function () {
      return [
        {
          id: 'pan-up',
          tooltip: 'Move up',
          icon: 'arrow-circle-up',
          callback: () => {
            this.viewer.viewport.panBy(new OpenSeadragon.Point(0, -this.panBy))
          }
        },
        {
          id: 'pan-down',
          tooltip: 'Move down',
          icon: 'arrow-circle-down',
          callback: () => {
            this.viewer.viewport.panBy(new OpenSeadragon.Point(0, this.panBy))
          }
        },
        {
          id: 'pan-left',
          tooltip: 'Move left',
          icon: 'arrow-circle-left',
          callback: () => {
            this.viewer.viewport.panBy(new OpenSeadragon.Point(-this.panBy, 0))
          }
        },
        {
          id: 'pan-right',
          tooltip: 'Move right',
          icon: 'arrow-circle-right',
          callback: () => {
            this.viewer.viewport.panBy(new OpenSeadragon.Point(this.panBy, 0))
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#lv-pan-controls {
  flex-direction: row;
  display: flex;
  margin: 0;
  position: absolute;
  z-index: 2;
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 0;
  margin: 1rem;
  border-radius: 25px;
  padding: 0.5rem 0;
  bottom: 0;

  .btn-control:not(:nth-child(2)) {
    padding: 0 0.5rem;
  }

  .btn-control:nth-child(2) {
    padding: 0.5rem;
  }
}
</style>