<template>
  <ul>
    <li
      v-for="tag in sortedTags"
      :key="tag.id"
      @mouseover="highlightOverlay(tag.id, true, 'active')"
      @mouseleave="highlightOverlay(tag.id, false, 'active')">

      <canvas :ref="`canvas-${tag.id}`" style="height: 50px;"></canvas>

      <div v-if="!(disableComplete && task.complete)">
        <button
          v-if="selectionsEditable"
          aria-label="Edit"
          @click="editTag(tag)"
          class="lv-btn lv-btn-control hint--left hint--no-animate">
          <icon name="pencil"></icon>
        </button>
        <button
          @click="deleteTag(tag)"
          @mouseover="highlightOverlay(tag.id, true, 'danger')"
          @mouseleave="highlightOverlay(tag.id, false, 'danger')"
          aria-label="Delete"
          class="lv-btn lv-btn-control hint--left hint--no-animate">
          <icon name="times-circle"></icon>
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import Task from '@/model/Task'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/pencil'
import highlightOverlay from '@/utils/highlightOverlay'
import drawFragmentToCanvas from '@/utils/drawFragmentToCanvas'
import getRectFromFragment from '@/utils/getRectFromFragment'

export default {
  props: {
    task: {
      type: Task,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    selectionsEditable: {
      type: Boolean,
      required: true
    },
    disableComplete: {
      type: Boolean,
      required: true
    },
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
     * Edit a selection.
     * @param {Object} tag
     *   The annotation.
     */
    editTag (tag) {
      this.$emit('edit', this.task, tag.id)
    },

    /**
     * Delete a selection.
     * @param {Object} tag
     *   The annotation.
     */
    deleteTag (tag) {
      this.$emit('delete', this.task, tag.id)
    },

    /**
     * Draw the selection canvases.
     */
    drawSelections () {
      for (let tag of this.tags) {
        let destCanvas = this.$refs[`canvas-${tag.id}`][0]
        if (
          typeof destCanvas !== 'undefined' &&
          destCanvas.hasAttribute('drawn')
        ) {
          continue
        }
        destCanvas.width = destCanvas.parentNode.clientWidth
        destCanvas.height = destCanvas.parentNode.clientHeight
        const vp = this.viewer.viewport
        const imgRect = getRectFromFragment(tag.target.selector.value)
        const vpRect = vp.imageToViewportRectangle(imgRect)
        const webRect = vp.viewportToViewerElementRectangle(vpRect)
        const srcCanvas = this.viewer.drawer.canvas
        drawFragmentToCanvas(
          srcCanvas,
          webRect,
          destCanvas
        )
        destCanvas.setAttribute('drawn', true)
      }
    },

    /**
     * Highlight an overlay.
     */
    highlightOverlay
  },

  computed: {
    sortedTags () {
      // Sort tags by position on the original canvas
      let sortedTags = JSON.parse(JSON.stringify(this.tags))
      sortedTags.sort((a, b) => {
        let rectA = getRectFromFragment(a.target.selector.value)
        let rectB = getRectFromFragment(b.target.selector.value)
        return rectA.y - rectB.y
      })
      return sortedTags
    }
  },

  updated () {
    // Draw the selections after the DOM is updated (for new selections).
    this.drawSelections()
  },

  mounted () {
    this.drawSelections()
  }
}
</script>
