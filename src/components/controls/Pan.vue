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
@import '~style/settings';

#lv-pan-controls {
  position: absolute;
  z-index: 2;
  background-color: $hud;
  margin: 1rem;
  border-radius: 50%;
  bottom: 0;
  width: 80px;
  height: 80px;

  .btn-control {
    display: flex;
    justify-content: center;
    position: absolute;
    padding: 0.5rem;
  }

  #pan-up {
    flex-direction: row;
    width: 100%;
    top: 0;
  }

  #pan-down {
    flex-direction: row;
    width: 100%;
    bottom: 0;
  }

  #pan-left {
    flex-direction: column;
    height: 100%;
    left: 0;
  }

  #pan-right {
    flex-direction: column;
    height: 100%;
    right: 0;
  }
}
</style>