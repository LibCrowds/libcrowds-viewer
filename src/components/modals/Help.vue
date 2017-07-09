<template>
  <div id="lv-help-modal">
    <modal :id="id" title="Help">
      <h4>Viewer controls</h4>
      <p>The following controls are provided to the left of the viewer:</p>
      <ul>
        <li><icon name="plus-circle"></icon>Zoom in</li>
        <li><icon name="minus-circle"></icon>Zoom out</li>
        <li><icon name="refresh"></icon>Reset zoom</li>
        <li><icon name="expand"></icon>Fullscreen</li>
        <li><icon name="question-circle"></icon>Help</li>
      </ul>
      <div v-if="mode === 'select'">
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
    </modal>
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
import Modal from '@/components/Modal'

export default {
  data: function () {
    return {
      manifestData: {}
    }
  },

  props: {
    id: {
      type: String,
      requried: true
    },
    mode: {
      type: String,
      requried: true
    }
  },

  components: {
    Icon,
    Modal
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
    margin: 0;
  }

  svg {
    margin-right: 8px;
  }
}
</style>
