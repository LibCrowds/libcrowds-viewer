<template>
  <div class="lv-toolbar" id="lv-main-controls">
    <control-button
      v-for="button in toolbarButtons"
      :key="button.id"
      :id="button.id"
      :tooltip="button.tooltip"
      :callback="button.callback"
      position="bottom"
      hint-position="bottom">
      <icon :name="button.icon" :class="button.iconClass" scale="1.35"></icon>
    </control-button>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/expand'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/thumbs-up'
import 'vue-awesome/icons/share-alt'
import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/comments'
import 'vue-awesome/icons/download'
import Task from '@/model/Task'
import ControlButton from '@/components/controls/ControlButton'

export default {
  data () {
    return {
      imgLink: null
    }
  },

  props: {
    task: {
      type: Task,
      required: true
    },
    viewer: {
      type: Object,
      required: true
    },
    buttons: {
      type: Object,
      required: true
    }
  },

  components: {
    Icon,
    ControlButton
  },

  computed: {
    // We're handling the zoom and fullscreen functionality ourselves here
    // as other controls rely on the current task being passed in and therefore
    // this component could be rendered after the viewer and the default method
    // of passing the button IDs won't work.
    toolbarButtons () {
      let tbButtons = []

      if (this.buttons.fullscreen) {
        tbButtons.push({
          tooltip: this.buttons.fullscreen,
          icon: 'expand',
          callback: () => {
            this.$emit('fullscreenclicked')
          }
        })
      }

      if (this.buttons.help) {
        tbButtons.push({
          tooltip: this.buttons.help,
          icon: 'question-circle',
          callback: () => {
            this.$emit('helpclicked')
          }
        })
      }

      if (this.buttons.info) {
        tbButtons.push({
          tooltip: this.buttons.info,
          icon: 'info-circle',
          callback: () => {
            this.$emit('infoclicked')
          }
        })
      }

      if (this.buttons.browse) {
        tbButtons.push({
          tooltip: this.buttons.browse,
          icon: 'eye',
          callback: () => {
            this.$emit('browseclicked')
          }
        })
      }

      if (this.buttons.like) {
        tbButtons.push({
          tooltip: !this.task.liked
            ? this.buttons.like[0]
            : this.buttons.like[1],
          icon: 'thumbs-up',
          iconClass: this.task.liked ? 'active' : null,
          callback: () => {
            this.$emit('likeclicked', this.task, !this.task.liked)
          }
        })
      }

      if (this.buttons.share) {
        let tooltip = this.buttons.share
        tbButtons.push({
          id: 'lv-share-btn',
          tooltip: tooltip,
          icon: 'share-alt',
          callback: () => {
            this.$emit('shareclicked')
          }
        })
      }

      if (this.buttons.download) {
        tbButtons.push({
          tooltip: this.buttons.download,
          id: 'lv-download-btn',
          icon: 'download',
          callback: this.download
        })
      }

      return tbButtons
    }
  },

  methods: {
    /**
     * Download the current canvas.
     */
    download () {
      const filename = 'task.png'
      const canvas = this.viewer.drawer.canvas
      const data = canvas.toDataURL()
      const link = document.createElement('a')
      link.setAttribute('type', 'hidden')
      link.download = filename
      link.href = data
      document.body.appendChild(link)

      if (navigator.msSaveBlob) {
        // IE 10+ partial fix
        navigator.msSaveBlob(new Blob([data], {
          type: 'image/png'
        }), filename)
      } else {
        link.click()
      }
    }
  }
}
</script>
