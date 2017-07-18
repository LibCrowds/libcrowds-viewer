<template>
  <div class="lv-viewer-controls">

    <controls
      position="top"
      hint-position="bottom"
      :buttons="buttons">
    </controls>

  </div>
</template>

<script>
import Task from '@/model/Task'
import Controls from '@/components/Controls'

export default {
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
    showLike: {
      type: Boolean,
      required: true
    },
    zoomInButton: {
      type: String,
      required: true
    },
    zoomOutButton: {
      type: String,
      required: true
    },
    homeButton: {
      type: String,
      required: true
    },
    fullPageButton: {
      type: String,
      required: true
    },
    helpButton: {
      type: String,
      required: true
    },
    infoButton: {
      type: String,
      required: true
    }
  },

  components: {
    Controls
  },

  computed: {
    buttons: function () {
      let buttons = [
        {
          id: this.zoomInButton,
          tooltip: 'Zoom in',
          icon: 'plus-circle'
        },
        {
          id: this.zoomOutButton,
          tooltip: 'Zoom out',
          icon: 'minus-circle'
        },
        {
          id: this.homeButton,
          tooltip: 'Reset zoom',
          icon: 'refresh'
        },
        {
          id: this.fullPageButton,
          tooltip: 'Fullscreen',
          icon: 'expand'
        }
      ]

      if (this.showHelp) {
        buttons.push({
          id: this.helpButton,
          tooltip: 'Help',
          icon: 'question-circle',
          click: () => {
            this.$emit('helpclicked')
          }
        })
      }

      if (this.showInfo) {
        buttons.push({
          id: this.infoButton,
          tooltip: 'Details',
          icon: 'info-circle',
          click: () => {
            this.$emit('infoclicked')
          }
        })
      }

      if (this.showLike) {
        buttons.push({
          tooltip: !this.task.liked ? 'Like' : 'Unlike',
          icon: !this.task.liked ? 'thumbs-up' : 'thumbs-down',
          click: () => {
            this.$emit('likeclicked', this.task, !this.task.liked)
          }
        })
      }
      return buttons
    }
  }
}
</script>
