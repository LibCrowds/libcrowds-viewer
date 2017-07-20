<template>
  <div id="lv-selector">
    <!--<button
      class="btn-selection"
      id="confirm-selection"
      ref="confirmSelection">
      <icon name="check-circle"></icon>
    </button>
    <button
      class="btn-selection"
      id="cancel-selection"
      ref="cancelSelection">
      <icon name="times-circle"></icon>
    </button>-->
  </div>
</template>

<script>
import OpenSeadragon from 'openseadragon'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/check-circle'

export default {
  data: function () {
    return {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      selecting: false,
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    }
  },

  props: {
    viewer: {
      type: Object,
      required: true
    }
  },

  components: {
    Icon
  },

  methods: {

    calc () {
      const vp = this.viewer.viewport

      // Calculte remaining pixel coordinates
      const x3 = Math.min(this.x1, this.x2)
      const x4 = Math.max(this.x1, this.x2)
      const y3 = Math.min(this.y1, this.y2)
      const y4 = Math.max(this.y1, this.y2)

      // Get the window coordinates
      const windowTopLeft = new OpenSeadragon.Point(x3, y3)
      const windowBottomRight = new OpenSeadragon.Point(x4 - x3, y4 - y3)

      // Get viewport coordinates
      const vpTopLeft = vp.windowToViewportCoordinates(windowTopLeft)
      const vpBottomRight = vp.windowToViewportCoordinates(windowBottomRight)

      // Create a new viewport rect
      this.rect = new OpenSeadragon.Rect(
        vpTopLeft.x,
        vpTopLeft.y,
        vpTopLeft.x - vpBottomRight.x,
        vpTopLeft.y - vpBottomRight.y
      )
    }
  },

  mounted () {
    this.viewer.addHandler('canvas-drag-end', (obj) => {
      this.selecting = false
      this.$emit('selection', this.rect, this.selecting)
    })

    this.viewer.addHandler('canvas-drag', (obj) => {
      if (!this.selecting) {
        // Set starting coordinates
        this.x1 = obj.position.x
        this.y1 = obj.position.y
        this.selecting = true
        return
      }
      // Calcuate coordinates while dragging
      this.x2 = obj.position.x
      this.y2 = obj.position.y
      this.calc()
      console.log('selecting')
      this.$emit('selection', this.rect, this.selecting)
    })
  }
}
</script>

<style lang="scss" scoped>
#lv-selector {
  .btn-selection {
    color: #fff;
    display: flex !important;
    position: absolute !important;
    right: 0;

    &#confirm-selection {
      bottom: 0;
      transform: translateX(20px) translateY(15px);
    }

    &#cancel-selection {
      top: 0;
      transform: translateX(20px) translateY(-15px);
    }
  }
}

</style>
