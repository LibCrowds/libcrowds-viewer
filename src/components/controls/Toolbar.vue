<template>
  <div id="lv-toolbar">

    <control-button
      v-for="(b, index) in buttons"
      :key="`btn-zoom-${index}`"
      :tooltip="b.tooltip"
      :callback="b.callback"
      position="bottom"
      hint-position="bottom">
      <icon :name="b.icon" :class="b.iconClass"></icon>
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
import 'vue-awesome/icons/comments'
import Task from '@/model/Task'
import getImageUri from '@/utils/getImageUri'
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
    showHelp: {
      type: Boolean,
      required: true
    },
    showInfo: {
      type: Boolean,
      required: true
    },
    showBrowse: {
      type: Boolean,
      required: true
    },
    showShare: {
      type: Boolean,
      required: true
    },
    showLike: {
      type: Boolean,
      required: true
    },
    discussLink: {
      type: String,
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
    buttons: function () {
      let buttons = [
        {
          tooltip: 'Fullscreen',
          icon: 'expand',
          callback: () => {
            this.$emit('fullscreenclicked')
          }
        }
      ]

      if (this.showHelp) {
        buttons.push({
          tooltip: 'Help',
          icon: 'question-circle',
          callback: () => {
            this.$emit('helpclicked')
          }
        })
      }

      if (this.showInfo) {
        buttons.push({
          tooltip: 'Details',
          icon: 'info-circle',
          callback: () => {
            this.$emit('infoclicked')
          }
        })
      }

      if (this.showBrowse) {
        buttons.push({
          tooltip: 'Browse Tasks',
          icon: 'eye',
          callback: () => {
            this.$emit('browseclicked')
          }
        })
      }

      if (this.showLike) {
        buttons.push({
          tooltip: !this.task.liked ? 'Like' : 'Unlike',
          icon: 'thumbs-up',
          iconClass: this.task.liked ? 'active' : null,
          callback: () => {
            this.$emit('likeclicked', this.task, !this.task.liked)
          }
        })
      }

      if (this.showShare) {
        let tooltip = 'Copy image URL'
        buttons.push({
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
                return getImageUri({
                  imgInfo: this.task.imgInfo
                })
              }
            })
          }
        })
      }

      if (this.discussLink) {
        buttons.push({
          tooltip: 'Discuss on forum',
          icon: 'comments',
          callback: () => {
            this.$emit('discussclicked', this.discussLink)
          }
        })
      }

      return buttons
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