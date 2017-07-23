<template>
  <div id="lv-selector">

    <div class="lv-selector-box" ref="box">

      <span class="border border-top" ref="border-top">
        <span class="handle"></span>
      </span>
      <span class="border border-right" ref="border-right">
        <span class="handle"></span>
      </span>
      <span class="border border-bottom" ref="border-bottom">
        <span class="handle"></span>
      </span>
      <span class="border border-left" ref="border-left">
        <span class="handle"></span>
      </span>

      <span class="corner corner-top-right" ref="corner-top-right"></span>
      <span class="corner corner-bottom-right" ref="corner-bottom-right"></span>
      <span class="corner corner-bottom-left" ref="corner-bottom-left"></span>
      <span class="corner corner-top-left" ref="corner-top-left"></span>

      <div class="selection-buttons">
        <button
          class="btn-selection"
          id="cancel-selection"
          ref="cancelSelection"
          @click="cancel">
          <icon label="Cancel">
            <icon name="circle"></icon>
            <icon name="times" class="icon-white" scale="0.8"></icon>
          </icon>
        </button>
        <button
          class="btn-selection"
          id="confirm-selection"
          ref="confirmSelection"
          @click="confirm">
          <icon label="Confirm">
            <icon name="circle"></icon>
            <icon name="check" class="icon-white" scale="0.8"></icon>
          </icon>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import OpenSeadragon from 'openseadragon'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/check'

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
     * Return true if a viewport point is within the image, false otherwise.
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
     * Draw the current rectangle.
     */
    draw () {
      if (this.rect) {
        const vp = this.viewer.viewport
        const wRect = vp.viewportToViewerElementRectangle(this.rect)
        this.$refs.box.style.left = `${wRect.x}px`
        this.$refs.box.style.top = `${wRect.y}px`
        this.$refs.box.style.width = `${wRect.width}px`
        this.$refs.box.style.height = `${wRect.height}px`
      }
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

      // Create a viewport rect
      this.rect = this.viewer.viewport.viewerElementToViewportRectangle(wRect)
    },

    /**
     * Start a new selection when the canvas is dragged.
     */
    onCanvasDrag (e) {
      const vp = this.viewer.viewport
      const wPoint = new OpenSeadragon.Point(e.position.x, e.position.y)
      const vpPoint = vp.viewerElementToViewportCoordinates(wPoint)
      const pointIsInImage = this.isPointInImage(vpPoint)
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
        this.draw()
      }
    },

    /**
     * Move selection box when dragged.
     */
    onSelectorBoxDrag (evt) {
      var delta = this.viewer.viewport.deltaPointsFromPixels(evt.delta, true)
      this.rect.x += delta.x
      this.rect.y += delta.y
      this.draw()
    },

    /**
     * Confirm the selection.
     */
    confirm () {
      if (this.rect) {
        this.$refs.box.style.display = 'none'
        this.$emit('selection', this.rect)
        this.rect = null
      }
    },

    /**
     * Cancel the selection.
     */
    cancel () {
      this.$refs.box.style.display = 'none'
      this.rect = null
    },

    /**
     * End the selection.
     */
    onCanvasDragEnd () {
      if (this.rect) {
        this.selecting = false
      }
    },

    /**
     * Resize a rectangle from the borders.
     */
    onBorderDrag (position, evt) {
      const vp = this.viewer.viewport
      const wPoint = new OpenSeadragon.Point(evt.position.x, evt.position.y)
      const delta = vp.deltaPointsFromPixels(wPoint)
      switch (position) {
        case 'top':
          this.rect.y += delta.y
          this.rect.height -= delta.y
          break
        case 'right':
          this.rect.width += delta.x
          break
        case 'bottom':
          this.rect.height += delta.y
          break
        case 'left':
          this.rect.x += delta.x
          this.rect.width -= delta.x
          break
      }
      this.draw()
    },

    /**
     * Resize a rectangle from the corners.
     */
    onCornerDrag (position, evt) {
      const vp = this.viewer.viewport
      const wPoint = new OpenSeadragon.Point(evt.position.x, evt.position.y)
      const delta = vp.deltaPointsFromPixels(wPoint)
      switch (position) {
        case 'top-right':
          this.rect.y += delta.y
          this.rect.height -= delta.y
          this.rect.width += delta.x
          break
        case 'bottom-right':
          this.rect.width += delta.x
          this.rect.height += delta.y
          break
        case 'bottom-left':
          this.rect.height += delta.y
          this.rect.x += delta.x
          this.rect.width -= delta.x
          break
        case 'top-left':
          this.rect.y += delta.y
          this.rect.height -= delta.y
          this.rect.x += delta.x
          this.rect.width -= delta.x
          break
      }
      this.draw()
    }
  },

  mounted () {
    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs.box,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: OpenSeadragon.delegate(this, this.onSelectorBoxDrag)
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.viewer.canvas,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: OpenSeadragon.delegate(this, this.onCanvasDrag),
      dragEndHandler: OpenSeadragon.delegate(this, this.onCanvasDragEnd)
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs['border-top'],
      dragHandler: this.onBorderDrag.bind(this, 'top')
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs['border-right'],
      dragHandler: this.onBorderDrag.bind(this, 'right')
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs['border-bottom'],
      dragHandler: this.onBorderDrag.bind(this, 'bottom')
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs['border-left'],
      dragHandler: this.onBorderDrag.bind(this, 'left')
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs['corner-top-right'],
      dragHandler: this.onCornerDrag.bind(this, 'top-right')
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs['corner-bottom-right'],
      dragHandler: this.onCornerDrag.bind(this, 'bottom-right')
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs['corner-bottom-left'],
      dragHandler: this.onCornerDrag.bind(this, 'bottom-left')
    })

    /* eslint-disable no-new */
    new OpenSeadragon.MouseTracker({
      element: this.$refs['corner-top-left'],
      dragHandler: this.onCornerDrag.bind(this, 'top-left')
    })

    this.viewer.addHandler('open', this.draw())
    this.viewer.addHandler('animation', this.draw())
    this.viewer.addHandler('resize', this.draw())
    this.viewer.addHandler('rotate', this.draw())
  },

  beforeDestroy () {
    this.viewer.removeHandler('open', this.draw())
    this.viewer.removeHandler('animation', this.draw())
    this.viewer.removeHandler('resize', this.draw())
    this.viewer.removeHandler('rotate', this.draw())
  }
}
</script>

<style lang="scss" scoped>
@import '~style/settings';

#lv-selector {
  .lv-selector-box {
    background-color: rgba($blue, 0.2);
    display: block;
    position: absolute;
    z-index: 1;

    .border {
      background: $blue;
      position: absolute;
      height: 2px;
      width: 2px;

      &.border-top {
        width: 100%;
        top: 0;

        .handle {
          cursor: ns-resize;
        }
      }

      &.border-right {
        height: 100%;
        right: 0;

        .handle {
          cursor: ew-resize;
        }
      }

      &.border-bottom {
        width: 100%;
        bottom: 0;

        .handle {
          cursor: ns-resize;
        }
      }

      &.border-left {
        height: 100%;
        left: 0;

        .handle {
          cursor: ew-resize;
        }
      }

      .handle {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        margin: -3px 0 0 -3px;
        background: #FFF;
        border: 1px solid $blue;
      }
    }

    .corner {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #FFF;
      border: 1px solid $blue;

      &.corner-top-right {
        top: -2px;
        right: -2px;
        cursor: nesw-resize;
      }

      &.corner-bottom-right {
        bottom: -2px;
        right: -2px;
        cursor: nwse-resize;
      }

      &.corner-bottom-left {
        bottom: -2px;
        left: -2px;
        cursor: nesw-resize;
      }

      &.corner-top-left {
        top: -2px;
        left: -2px;
        cursor: nwse-resize;
      }
    }
  }

  .selection-buttons {
    bottom: 0;
    right: 0;
    transform: translateY(105%);
    position: absolute;
    display: flex;
    flex-direction: row;

    .btn-selection {
      border: none;
      background: none;
      display: flex;
      align-items: center;
      font-size: 0.85rem;
      padding: 2px;
      height: 16px;
      width: 16px;

      &#cancel-selection {
        color: $red;
      }

      &#confirm-selection {
        color: $green;
      }

      .icon-white {
        color: #FFF;
      }

      &:hover,
      &:focus {
        opacity: 1;
      }
    }
  }
}
</style>