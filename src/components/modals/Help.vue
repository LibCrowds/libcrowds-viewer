<template>
  <div id="lv-help-modal">
    <modal-base :show="show" title="Help" @hide="$emit('hide')">
      <p>
        The objective of the current task, along with any additional guidance
        can be seen in the sidebar to the right of the viewer. Once the task
        has been completed click the Submit button to submit your answer.
      </p>
      <p v-if="disableComplete">
        Note that you can only submit one answer for each task. You are free to
        browse back and forth between tasks but once you click submit your
        answer will be saved and further submissions disabled.
      </p>
      <h4>Viewer controls</h4>
      <p>The following controls are provided to the top-left of the viewer:</p>
      <ul>
        <li>
          <icon name="plus-circle"></icon>Zoom in
        </li>
        <li>
          <icon name="minus-circle"></icon>Zoom out
        </li>
        <li>
          <icon name="refresh"></icon>Reset zoom
        </li>
        <li>
          <icon name="expand"></icon>Fullscreen
        </li>
        <li>
          <icon name="question-circle"></icon>View Help
        </li>
        <li v-if="buttons.info">
          <icon name="info-circle"></icon>View Info
        </li>
        <li v-if="buttons.browse">
          <icon name="list"></icon>Browse Tasks
        </li>
        <li v-if="buttons.like">
          <icon name="thumbs-up"></icon>Like Task/Image
        </li>
        <li v-if="buttons.share">
          <icon name="share-alt"></icon>Copy Image URL
        </li>
      </ul>
      <p>
        The following controls are provided to the bottom-left of the viewer:
      </p>
      <ul>
        <li><icon name="arrow-circle-up"></icon>Pan up</li>
        <li><icon name="arrow-circle-down"></icon>Pan down</li>
        <li><icon name="arrow-circle-left"></icon>Pan left</li>
        <li><icon name="arrow-circle-right"></icon>Pan right</li>
      </ul>
      <p>
        To the left and right of the viewer are buttons to browse available
        tasks:
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
import 'vue-awesome/icons/arrow-circle-up'
import 'vue-awesome/icons/arrow-circle-down'
import 'vue-awesome/icons/arrow-circle-left'
import 'vue-awesome/icons/arrow-circle-right'
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
    buttons: {
      type: Object,
      required: true
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
