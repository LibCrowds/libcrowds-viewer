<template>
  <div class="lv-viewer-controls">

    <controls
      position="top"
      layout="row"
      :buttons="buttons">
    </controls>

  </div>
</template>

<script>
import Controls from '@/components/Controls.vue'
import { store } from '@/store'

export default {
  props: {
    showHelp: {
      type: Boolean,
      required: true
    },
    showInfo: {
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
      const viewer = store.state.viewer
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
      return buttons
    }
  }
}
</script>
