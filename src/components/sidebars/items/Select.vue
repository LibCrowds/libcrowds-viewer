<template>
  <div id="lv-sidebar-select-item">
    <transition appear name="fade-sidebar">
      <ul>
        <li
          v-for="tag in sortedTags"
          :key="tag.id"
          @mouseover="highlightOverlay(tag.id, true)"
          @mouseleave="highlightOverlay(tag.id, false)">

          <div
            class="thumbnail-wrapper">
            <canvas :ref="`canvas-${tag.id}`"></canvas>
          </div>

          <div
            v-if="!(disableComplete && task.complete)"
            class="buttons">
            <button
              v-if="selectionsEditable"
              aria-label="Edit"
              @click="editTag(tag)"
              class="lv-btn lv-btn-control hint--left hint--no-animate">
              <icon name="pencil"></icon>
            </button>
            <button
              @click="deleteTag(tag)"
              aria-label="Delete"
              class="lv-btn lv-btn-control hint--left hint--no-animate">
              <icon name="times-circle"></icon>
            </button>
          </div>
        </li>
      </ul>
    </transition>
  </div>
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
        if (destCanvas.hasAttribute('drawn')) {
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

<style lang="scss" scoped>
@import '~style/settings';
@import '~style/partials/buttons';
@import '~hint.css';

#lv-sidebar-select-item {
  flex: 1 1 auto;
  display: none;
  flex-direction: column;
  min-height: 200px;

  @media screen and (min-width: 768px) {
    display: flex;
  }

  ul {
    margin: 0;
    overflow-y: auto;
    flex: 1 1 auto;
    list-style: none;
    padding: 0;
    border: 1px solid lighten($gray-dark, 20%);
    transition: opacity 250ms;

    &:empty {
      opacity: 0;
    }

    li {
      padding: 0.8rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid darken($gray, 25%);
    }
  }

  .buttons {
    display: flex;
    flex: 0 0 33.3333%;
  }

  .lv-btn {
    display: flex;
    margin-right: auto;
    margin-left: auto;

    &:last-child {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .thumbnail-wrapper {
    align-items: center;
    justify-content: center;
    display: flex;
    flex: 1 1 auto;
    height: 50px;
    overflow: hidden;
  }
}

.fade-sidebar-enter-active,
.fade-sidebar-leave-active {
  transition: all 500ms ease;
}
.fade-sidebar-enter, .fade-sidebar-leave-to {
  opacity: 0;
}
</style>
