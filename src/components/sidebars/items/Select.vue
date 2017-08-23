<template>
  <div id="lv-sidebar-select-item">
    <ul>
      <li
        v-for="tag in tags"
        :key="tag.id"
        @mouseover="highlightOverlay(tag.id, true)"
        @mouseleave="highlightOverlay(tag.id, false)">

        <div
          class="thumbnail-viewer">
          {{ getThumbnailViewer(tag) }}
        </div>

        <div
          v-if="!(disableComplete && task.complete)"
          class="buttons">
          <button
            @click="editTag(tag)"
            class="btn btn-control">
            <icon name="pencil"></icon>
          </button>
          <button
            @click="deleteTag(tag)"
            class="btn btn-control">
            <icon name="times-circle"></icon>
          </button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import OpenSeadragon from 'openseadragon'
import Task from '@/model/Task'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/pencil'
import highlightOverlay from '@/utils/highlightOverlay'
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
    disableComplete: {
      type: Boolean,
      required: true
    },
    imageUrl: {
      type: String,
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
     * Return an OpenSeadragon Viewer containing the clipped image.
     * @param {Object} tag
     *   The annotation.
     */
    getThumbnailViewer (tag) {
      const rect = getRectFromFragment(tag.target.selector.value)
      console.log(rect)
      let viewerDiv = document.createElement('div')
      viewerDiv.id = `viewer-${tag.id}`
      /* eslint-disable no-new */
      new OpenSeadragon.Viewer({
        element: viewerDiv
      })
      console.log(viewerDiv)
      return viewerDiv
    },

    /**
     * Highlight an overlay.
     */
    highlightOverlay
  }
}
</script>

<style lang="scss" scoped>
@import '~style/settings';
@import '~style/partials/buttons';

#lv-sidebar-select-item {
  flex: 1 1 auto;
  display: none;
  flex-direction: column;

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

  .btn {
    display: flex;
    margin-right: auto;
    margin-left: auto;

    &:last-child {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .thumbnail-viewer {
    align-items: center;
    justify-content: center;
    display: flex;
    flex: 1 1 auto;
    height: 50px;
    overflow: hidden;
  }
}
</style>
