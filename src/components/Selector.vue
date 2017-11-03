<template>
  <div class="lv-selector" ref="box">
    <span class="lv-border lv-border-top" ref="border-top">
      <span class="lv-handle"></span>
    </span>
    <span class="lv-border lv-border-right" ref="border-right">
      <span class="lv-handle"></span>
    </span>
    <span class="lv-border lv-border-bottom" ref="border-bottom">
      <span class="lv-handle"></span>
    </span>
    <span class="lv-border lv-border-left" ref="border-left">
      <span class="lv-handle"></span>
    </span>

    <span
      class="lv-corner lv-corner-top-right"
      ref="corner-top-right">
    </span>
    <span
      class="lv-corner lv-corner-bottom-right"
      ref="corner-btm-right">
    </span>
    <span
      class="lv-corner lv-corner-bottom-left"
      ref="corner-bottom-left">
    </span>
    <span
      class="lv-corner lv-corner-top-left"
      ref="corner-top-left">
    </span>

    <div class="lv-selection-buttons">
      <button
        class="lv-btn lv-btn-red-inverse"
        ref="cancelSelection"
        @click="cancel">
        <icon label="Cancel" scale="1.2">
          <icon name="circle" scale="1.2"></icon>
          <icon name="times" class="lv-icon-white" scale="0.8"></icon>
        </icon>
      </button>
      <button
        class="lv-btn lv-btn-green-inverse"
        ref="confirmSelection"
        @click="confirm">
        <icon label="Confirm" scale="1.2">
          <icon name="circle" scale="1.2"></icon>
          <icon name="check" class="lv-icon-white" scale="0.8"></icon>
        </icon>
      </button>
    </div>
  </div>
</template>

<script>
import OpenSeadragon from 'openseadragon'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/check'
import Task from '@/model/Task'

export default {
  data () {
    return {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      selecting: false,
      rect: null,
      minWidth: 10,
      minHeight: 10,
      mouseTrackers: []
    }
  },

  props: {
    viewer: {
      type: Object,
      required: true
    },
    task: {
      type: Task,
      required: true
    },
    selectionRect: {
      type: Object,
      required: true
    }
  },

  watch: {
    selectionRect: {
      handler: function (oldVal, newVal) {
        if (Object.keys(this.selectionRect).length > 0) {
          this.rect = new OpenSeadragon.Rect(
            this.selectionRect.x,
            this.selectionRect.y,
            this.selectionRect.width,
            this.selectionRect.height
          )
          this.selecting = true
          this.draw()
        } else {
          this.rect = null
        }
      },
      deep: true
    },

    task () {
      this.undraw()
    }
  },

  components: {
    Icon
  },

  methods: {
    /**
     * Return true if a viewport point is within the image, false otherwise.
     * @param {Point} point
     *   The point.
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
     * Return true if a rect is within the image, false otherwise.
     * @param {Rect} rect
     *   The viewport rectangle.
     */
    isRectInImage (rect) {
      this.normalize()
      const bounds = this.viewer.world.getHomeBounds()
      const bRect = new OpenSeadragon.Rect(0, 0, bounds.width, bounds.height)
      const corners = [
        this.rect.getTopLeft(),
        this.rect.getTopRight(),
        this.rect.getBottomRight(),
        this.rect.getBottomLeft()
      ]
      const areaEnd = bRect.getBottomRight()
      for (let i = 0; i < 4; i++) {
        if (corners[i].x < bRect.x || corners[i].x > areaEnd.x ||
          corners[i].y < bRect.y || corners[i].y > areaEnd.y) {
          return false
        }
      }
      return true
    },

    /**
     * Return true if a rect is the minimum width, false otherwise.
     * @param {Rect} rect
     *   The viewport rectangle.
     */
    isMinWidth (rect) {
      const vp = this.viewer.viewport
      const wRect = vp.viewportToViewerElementRectangle(rect)
      return wRect.width >= this.minWidth
    },

    /**
     * Return true if a rect is the minimum height, false otherwise.
     * @param {Rect} rect
     *   The viewport rectangle.
     */
    isMinHeight (rect) {
      const vp = this.viewer.viewport
      const wRect = vp.viewportToViewerElementRectangle(rect)
      return wRect.height >= this.minHeight
    },

    /**
     * Fixes negative width/height.
     */
    normalize () {
      if (this.rect) {
        var fixed = this.rect.clone()
        if (fixed.width < 0) {
          fixed.x += fixed.width
          fixed.width *= -1
        }
        if (fixed.height < 0) {
          fixed.y += fixed.height
          fixed.height *= -1
        }
        this.rect = fixed
      }
    },

    /**
     * Draw the current rectangle.
     */
    draw () {
      this.normalize()
      if (this.rect) {
        const vp = this.viewer.viewport
        const wRect = vp.viewportToViewerElementRectangle(this.rect)
        this.$refs.box.style.left = `${wRect.x}px`
        this.$refs.box.style.top = `${wRect.y}px`
        this.$refs.box.style.width = `${wRect.width}px`
        this.$refs.box.style.height = `${wRect.height}px`
        this.$refs.box.style.display = 'block'
      }
    },

    /**
     * Undraw the rectangle.
     */
    undraw () {
      this.$refs.box.style.display = 'none'
      this.$refs.box.style.left = `0px`
      this.$refs.box.style.top = `0px`
      this.$refs.box.style.width = `0px`
      this.$refs.box.style.height = `0px`
      this.rect = null
    },

    /**
     * Calculate the rectangle.
     */
    calculate () {
      const x3 = Math.min(this.x1, this.x2)
      const x4 = Math.max(this.x1, this.x2)
      const y3 = Math.min(this.y1, this.y2)
      const y4 = Math.max(this.y1, this.y2)
      const wRect = new OpenSeadragon.Rect(x3, y3, x4 - x3, y4 - y3)
      this.rect = this.viewer.viewport.viewerElementToViewportRectangle(wRect)
    },

    /**
     * Start a new selection when the canvas is dragged.
     * @param {Object} evt
     *   The mouse tracker event.
     */
    onCanvasDrag (evt) {
      const vp = this.viewer.viewport
      const wPoint = new OpenSeadragon.Point(evt.position.x, evt.position.y)
      const vpPoint = vp.viewerElementToViewportCoordinates(wPoint)
      const pointIsInImage = this.isPointInImage(vpPoint)
      if (pointIsInImage) {
        if (!this.selecting) {
          this.selecting = true
          this.x1 = evt.position.x
          this.y1 = evt.position.y
          return
        }
        this.x2 = evt.position.x
        this.y2 = evt.position.y
        this.calculate()
        this.draw()
      }
    },

    /**
     * Move selection box when dragged.
     * @param {Object} evt
     *   The mouse tracker event.
     */
    onSelectorBoxDrag (evt) {
      const vp = this.viewer.viewport
      const delta = vp.deltaPointsFromPixelsNoRotate(evt.delta)
      const oldRect = this.rect.clone()
      this.rect.x += delta.x
      this.rect.y += delta.y
      if (!(this.isRectInImage(this.rect))) {
        this.rect = oldRect
      }
      this.draw()
    },

    /**
     * Confirm the selection.
     */
    confirm () {
      if (this.rect) {
        this.$emit('selection', this.task, this.rect)
        this.undraw()
      }
    },

    /**
     * Cancel the selection.
     */
    cancel () {
      this.undraw()
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
     * @param {String} position
     *   The border position.
     * @param {Object} evt
     *   The mouse tracker event.
     */
    onBorderDrag (position, evt) {
      const vp = this.viewer.viewport
      const wPoint = new OpenSeadragon.Point(evt.position.x, evt.position.y)
      const delta = vp.deltaPointsFromPixels(wPoint, true)
      const oldRect = this.rect.clone()
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
      if (!(this.isRectInImage(this.rect))) {
        this.rect = oldRect
      }
      if (!(this.isMinWidth(this.rect))) {
        this.rect.width = oldRect.width
        this.rect.x = oldRect.x
      }
      if (!(this.isMinHeight(this.rect))) {
        this.rect.height = oldRect.height
      }
      this.draw()
    },

    /**
     * Resize a rectangle from the corners.
     * @param {String} position
     *   The corner position.
     * @param {Object} evt
     *   The mouse tracker event.
     */
    onCornerDrag (position, evt) {
      const vp = this.viewer.viewport
      const wPoint = new OpenSeadragon.Point(evt.position.x, evt.position.y)
      const delta = vp.deltaPointsFromPixels(wPoint)
      const oldRect = this.rect.clone()
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
      if (!(this.isRectInImage(this.rect))) {
        this.rect = oldRect
      }
      if (!(this.isMinWidth(this.rect))) {
        this.rect.width = oldRect.width
      }
      if (!(this.isMinHeight(this.rect))) {
        this.rect.height = oldRect.height
      }
      this.draw()
    },

    /**
     * Handle key presses.
     * @param {Object} evt
     *   The mouse tracker event.
     */
    onKeyUp (evt) {
      const key = evt.keyCode ? evt.keyCode : evt.charCode
      if (key === 13) {
        this.confirm()
      } else if (key === 27) {
        this.cancel()
      }
    }
  },

  mounted () {
    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs.box,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        dragHandler: OpenSeadragon.delegate(this, this.onSelectorBoxDrag)
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.viewer.canvas,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        dragHandler: OpenSeadragon.delegate(this, this.onCanvasDrag),
        dragEndHandler: OpenSeadragon.delegate(this, this.onCanvasDragEnd)
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs['border-top'],
        dragHandler: this.onBorderDrag.bind(this, 'top')
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs['border-right'],
        dragHandler: this.onBorderDrag.bind(this, 'right')
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs['border-bottom'],
        dragHandler: this.onBorderDrag.bind(this, 'bottom')
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs['border-left'],
        dragHandler: this.onBorderDrag.bind(this, 'left')
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs['corner-top-right'],
        dragHandler: this.onCornerDrag.bind(this, 'top-right')
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs['corner-bottom-right'],
        dragHandler: this.onCornerDrag.bind(this, 'bottom-right')
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs['corner-bottom-left'],
        dragHandler: this.onCornerDrag.bind(this, 'bottom-left')
      })
    )

    /* eslint-disable no-new */
    this.mouseTrackers.push(
      new OpenSeadragon.MouseTracker({
        element: this.$refs['corner-top-left'],
        dragHandler: this.onCornerDrag.bind(this, 'top-left')
      })
    )

    if (typeof document !== 'undefined') {
      document.addEventListener('keyup', this.onKeyUp)
    }

    this.viewer.addHandler('open', this.draw)
    this.viewer.addHandler('animation', this.draw)
    this.viewer.addHandler('resize', this.draw)
    this.viewer.addHandler('rotate', this.draw)
  },

  beforeDestroy () {
    for (let tracker of this.mouseTrackers) {
      tracker.destroy()
    }

    if (typeof document !== 'undefined') {
      document.removeEventListener('keyup', this.onKeyUp)
    }

    this.viewer.removeHandler('open', this.draw)
    this.viewer.removeHandler('animation', this.draw)
    this.viewer.removeHandler('resize', this.draw)
    this.viewer.removeHandler('rotate', this.draw)
  }
}
</script>
