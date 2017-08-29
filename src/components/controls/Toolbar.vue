<template>
  <div id="lv-toolbar">

    <control-button
      v-for="button in toolbarButtons"
      :key="button.id"
      :id="button.id"
      :tooltip="button.tooltip"
      :callback="button.callback"
      position="bottom"
      hint-position="bottom">
      <icon
        :name="button.icon"
        :class="button.iconClass">
      </icon>
    </control-button>

  </div>
</template>

<script>
import Clipboard from 'clipboard'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/expand'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/thumbs-up'
import 'vue-awesome/icons/share-alt'
import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/comments'
import 'vue-awesome/icons/download'
import Task from '@/model/Task'
import ControlButton from '@/components/controls/ControlButton'

export default {
  data: function () {
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
    },
    discussLink: {
      type: String,
      required: true
    },
    showNavigation: {
      type: Boolean,
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
    toolbarButtons: function () {
      let tbButtons = []

      if (this.buttons.fullscreen) {
        tbButtons.push({
          tooltip: 'Fullscreen',
          icon: 'expand',
          callback: () => {
            this.$emit('fullscreenclicked')
          }
        })
      }

      if (this.buttons.help) {
        tbButtons.push({
          tooltip: 'Help',
          icon: 'question-circle',
          callback: () => {
            this.$emit('helpclicked')
          }
        })
      }

      if (this.buttons.info) {
        tbButtons.push({
          tooltip: 'Details',
          icon: 'info-circle',
          callback: () => {
            this.$emit('infoclicked')
          }
        })
      }

      if (this.buttons.browse) {
        tbButtons.push({
          tooltip: 'Browse Tasks',
          icon: 'eye',
          callback: () => {
            this.$emit('browseclicked')
          }
        })
      }

      if (this.buttons.like) {
        tbButtons.push({
          tooltip: !this.task.liked ? 'Like' : 'Unlike',
          icon: 'thumbs-up',
          iconClass: this.task.liked ? 'active' : null,
          callback: () => {
            this.$emit('likeclicked', this.task, !this.task.liked)
          }
        })
      }

      if (this.buttons.share) {
        let tooltip = 'Copy Image URL'
        tbButtons.push({
          id: 'lv-share-btn',
          tooltip: tooltip,
          icon: 'share-alt',
          callback: () => {
            let clipboard = new Clipboard('#lv-share-btn', {
              text: (trigger) => {
                trigger.setAttribute('aria-label', 'URL Copied!')
                trigger.addEventListener('mouseleave', () => {
                  trigger.setAttribute('aria-label', tooltip)
                  clipboard.destroy()
                })
                return this.task.shareUrl
              }
            })
          }
        })
      }

      if (this.buttons.download) {
        tbButtons.push({
          tooltip: 'Download',
          id: 'lv-download-btn',
          icon: 'download',
          callback: () => {
            const canvas = this.viewer.drawer.canvas
            const data = canvas.toDataURL()
            const link = document.createElement('a')
            link.download = 'task.png'
            link.href = data
            link.click()
          }
        })
      }

      if (this.discussLink) {
        tbButtons.push({
          tooltip: 'Discuss on Forum',
          icon: 'comments',
          callback: () => {
            this.$emit('discussclicked', this.discussLink)
          }
        })
      }

      if (this.showNavigation) {
        tbButtons.unshift({
          tooltip: 'Navigation',
          icon: 'bars',
          callback: () => {
            this.$emit('navigationclicked')
          }
        })
      }

      return tbButtons
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/settings';

#lv-toolbar {
  display: flex;
  justify-content: space-around;
  position: absolute;
  background-color: $hud;
  margin: 0;
  z-index: 2;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: auto;
    margin: 1rem;
    border-radius: 25px;
    padding: 0 0.5rem;
  }
}
</style>