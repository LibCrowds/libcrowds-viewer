<template>
  <canvas id="overlay-canvas"></canvas>
</template>

<script>
import paper from 'paper'
import Task from '@/model/Task'

export default {
  data: function () {
    return {
      paperScope: null
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
    }
  },

  methods: {
    /**
     * Setup the paper scope.
     */
    setupPaperScope () {
      this.paperScope = new paper.PaperScope()
      this.paperScope.setup('overlay-canvas')
      this.paperScope.activate()
    },

    /**
     * Create a rectangle in the paper scope from a viewport rectangle.
     * @param {Object} rect
     *   An OpenSeadragon viewport rectangle.
     */
    viewportToPaperRectangle (rect) {
      const vp = this.viewer.viewport
      const elRect = vp.viewportToViewerElementRectangle(rect)
      console.log(vp.viewportToImageRectangle(vp.viewerElementToViewportRectangle(elRect)))
      const path = new this.paperScope.Path.Rectangle(elRect)
      path.fillColor = 'rgba(0, 255, 6, 0.2)'
    },

    /**
     *
     */
    resize () {
      const vp = this.viewer.viewport
      let center = vp.viewportToWindowCoordinates(vp.getCenter(true))
      this.paperScope.view.center = new paper.Point(center.x, center.y)
    },

    /**
     * Draw all overlays.
     * @param {String} id
     *   An ID.
     * @param {Object} rect
     *   The rect to draw.
     */
    draw () {
      for (let overlay of this.task.overlays) {
        this.viewportToPaperRectangle(overlay.rect)
      }
      this.paperScope.view.draw()
    }

  },

  watch: {
    task: {
      handler: function () {
        this.draw()
      },
      deep: true
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },

  mounted () {
    window.addEventListener('resize', this.resize)
    this.setupPaperScope()
    this.resize()
    this.draw()
  }
}
</script>

<style scoped>
#overlay-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>