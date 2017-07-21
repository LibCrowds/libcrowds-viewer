<template>
  <canvas id="overlay-canvas"></canvas>
</template>

<script>
import paper from 'paper'
import Task from '@/model/Task'

export default {
  data: function () {
    return {
      paperScope: null,
      rectangles: {}
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
     *
     */
    handleResize () {
      console.log('resize')
      // const newSize = new this.paperScope.Size(
      //   this.canvas.width,
      //   this.canvas.height
      // )
      // this.paperScope.view.viewSize = new this.paperScope.Size(this.canvas.width, this.canvas.height)
    },

    /**
     * Draw a rectangle.
     * @param {String} id
     *   An ID.
     * @param {Object} rect
     *   The rect to draw.
     */
    drawRect (id, rect) {
      const vp = this.viewer.viewport
      const elRect = vp.viewportToViewerElementRectangle(rect)
      this.snap.rect(elRect.x, elRect.y, elRect.width, elRect.height)
    }

  },

  watch: {
    task: {
      handler: function () {
        console.log(this.overlays)
      },
      deep: true
    }
  },

  ready: function () {
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },

  mounted () {
    this.setupPaperScope()
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