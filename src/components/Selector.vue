<template>
  <div id="lv-selector">
    <div class="selection-box" ref="box"></div>
    <button
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
    </button>
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
      rect: null
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
    /**
     * Check if a point is within the image.
     */
    isPointInImage (point) {
      var bounds = this.viewer.world.getHomeBounds()
      return (
        point.x >= 0 &&
        point.x <= bounds.width &&
        point.y >= 0 &&
        point.y <= bounds.height
      )
    },

    /**
     * Calculate and draw the rectangle.
     */
    calculate () {
      // Calculte remaining pixel coordinates
      const x3 = Math.min(this.x1, this.x2)
      const x4 = Math.max(this.x1, this.x2)
      const y3 = Math.min(this.y1, this.y2)
      const y4 = Math.max(this.y1, this.y2)

      // Create a window rect
      const wRect = new OpenSeadragon.Rect(x3, y3, x4 - x3, y4 - y3)

      // Style the selection box
      this.$refs.box.style.left = `${wRect.x}px`
      this.$refs.box.style.top = `${wRect.y}px`
      this.$refs.box.style.width = `${wRect.width}px`
      this.$refs.box.style.height = `${wRect.height}px`

      // Create a viewport rect
      this.rect = this.viewer.viewport.viewerElementToViewportRectangle(wRect)
    },

    /**
     * Start a new selection when the canvas is dragged.
     */
    onCanvasDrag (e) {
      const delta = this.viewer.viewport.deltaPointsFromPixels(e.delta, true)
      const end = this.viewer.viewport.pointFromPixel(e.position, true)
      const start = new OpenSeadragon.Point(end.x - delta.x, end.y - delta.y)
      const pointIsInImage = this.isPointInImage(start)
      if (pointIsInImage) {
        if (!this.selecting) {
          this.selecting = true
          this.x1 = e.position.x
          this.y1 = e.position.y
          this.$refs.box.style.display = 'block'
          return
        }
        this.x2 = e.position.x
        this.y2 = e.position.y
        this.calculate()
      }
    },

    /**
     * End the selection.
     */
    onCanvasDragEnd () {
      if (this.rect) {
        this.selecting = false
        this.$refs.box.style.display = 'none'
        this.$emit('selection', this.rect)
        this.rect = null
      }
    }
  },

  mounted () {
    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.viewer.canvas,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: OpenSeadragon.delegate(this, this.onCanvasDrag),
      dragEndHandler: OpenSeadragon.delegate(this, this.onCanvasDragEnd)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~style/settings';

#lv-selector {
  .selection-box {
    border: 2px solid $blue;
    background-color: rgba($blue, 0.2);
    opacity: .6;
    display: block;
    position: absolute;
    z-index: 1;
  }
  &.hidden {
    display: none;
  }
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