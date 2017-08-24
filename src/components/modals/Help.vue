<template>
  <div id="lv-help-modal">
    <modal-base :show="show" title="Help" @hide="$emit('hide')">
      <p>
        Guidance specific to the current task is listed in the sidebar to the
        right of the viewer.
        <span v-if="showNote">
          You can use the notes field to draw our attention to anything we might
          need to know while processing the data.
        </span>
        When you've completed a task click the Submit button to save your
        contribution.
      </p>
      <p v-if="disableComplete">
        Note that you can only submit one response for each task. When you click
        submit your answer will be saved and further submissions disabled. You
        are free to browse back and forth between submitted and unsubmitted
        tasks.
      </p>
      <h4>Viewer controls</h4>
      <p>In the top-left corner of the viewer:</p>
      <ul>
        <li>
          <icon name="expand"></icon>Fullscreen
        </li>
        <li>
          <icon name="question-circle"></icon>View this Help page
        </li>
        <li v-if="showInfo">
          <icon name="info-circle"></icon>View Metadata about the item
        </li>
        <li v-if="showBrowse">
          <icon name="list"></icon>Browse Tasks
        </li>
        <li v-if="showLike">
          <icon name="thumbs-up"></icon>Like Task/Image
        </li>
        <li v-if="showShare">
          <icon name="share-alt"></icon>Copy Image URL for bookmarking or sharing
        </li>
      </ul>
      <p>
        In the bottom-left corner of the viewer, controls to:
      </p>
      <ul>
        <li><icon name="chevron-up"></icon>Pan up</li>
        <li><icon name="chevron-down"></icon>Pan down</li>
        <li><icon name="chevron-left"></icon>Pan left</li>
        <li><icon name="chevron-right"></icon>Pan right</li>
        <li><icon name="plus-circle"></icon>Zoom in</li>
        <li><icon name="minus-circle"></icon>Zoom out</li>
        <li><icon name="refresh"></icon>Reset zoom</li>
      </ul>
      <p>
        Use arrows left and right of the viewer to move between tasks:
      </p>
      <ul>
        <li><icon name="chevron-left"></icon>Previous task</li>
        <li><icon name="chevron-right"></icon>Next task</li>
      </ul>
      <div v-if="task.mode === 'select'">
        <h4>Select mode</h4>
        <p>
          When using the viewer in select mode an area of the image can
          be selected by clicking (or tapping) on the image. The following
          controls are provided to the right of the selection box:
        </p>
        <ul>
          <li><icon name="check-circle"></icon>Confirm selection</li>
          <li><icon name="times-circle"></icon>Cancel selection</li>
        </ul>
        <p>
          Once a selection has been confirmed it will appear in the
          selections sidebar to the right of the screen, where the following
          controls are provided:
        </p>
        <ul>
          <li><icon name="pencil"></icon>Edit selection</li>
          <li><icon name="times-circle"></icon>Delete selection</li>
        </ul>
      </div>
    </modal-base>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/minus-circle'
import 'vue-awesome/icons/pencil'
import 'vue-awesome/icons/refresh'
import 'vue-awesome/icons/expand'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/thumbs-up'
import 'vue-awesome/icons/chevron-up'
import 'vue-awesome/icons/chevron-down'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import 'vue-awesome/icons/list'
import ModalBase from '@/components/modals/Base'
import Task from '@/model/Task'

export default {
  data: function () {
    return {
      manifestData: {}
    }
  },

  props: {
    show: {
      type: Boolean,
      requried: true
    },
    task: {
      type: Task,
      requried: true
    },
    showInfo: {
      type: Boolean,
      requried: true
    },
    showBrowse: {
      type: Boolean,
      requried: true
    },
    showLike: {
      type: Boolean,
      requried: true
    },
    showShare: {
      type: Boolean,
      requried: true
    },
    showNote: {
      type: Boolean,
      requried: true
    },
    disableComplete: {
      type: Boolean,
      requried: true
    }
  },

  components: {
    Icon,
    ModalBase
  }
}
</script>

<style lang="scss" scoped>
#lv-help-modal {
  ul {
    padding-left: 0;
    list-style: none;
  }

  li {
    margin-bottom: 5px;
  }

  svg {
    margin-right: 8px;
  }
}
</style>
