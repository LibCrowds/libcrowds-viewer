<template>
  <svg
    ref="surface"
    width="100%"
    height="100%"
    preserveAspectRatio="none"
    fill="none">
  </svg>
</template>

<script>
import Snap from 'snapsvg'
import Task from '@/model/Task'

export default {
  data: function () {
    return {
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
     * Create an SVG drawing surface over the viewer container.
     */
    createDrawingSurface () {
      this.snap = Snap(this.$refs.surface)
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

  mounted () {
    this.createDrawingSurface()
  }
}
</script>

<style scoped>
svg {
  position: absolute;
}
</style>