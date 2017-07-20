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
import Clipboard from 'clipboard'
import Task from '@/model/Task'
import Controls from '@/components/Controls'

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
    zoomBy: {
      type: Number,
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
    showShare: {
      type: Boolean,
      required: true
    },
    showLike: {
      type: Boolean,
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
    // We're handling the zoom and fullscreen functionality ourselves here
    // as other controls rely on the current task being passed in and therefore
    // this component could be rendered after the viewer and the default method
    // of passing the button IDs won't work.
    buttons: function () {
      let buttons = [
        {
          tooltip: 'Zoom in',
          icon: 'plus-circle',
          click: () => {
            const currentZoom = this.viewer.viewport.getZoom(true)
            const zoomTo = currentZoom + (currentZoom * this.zoomBy)
            this.viewer.viewport.zoomTo(zoomTo)
          }
        },
        {
          tooltip: 'Zoom out',
          icon: 'minus-circle',
          click: () => {
            const currentZoom = this.viewer.viewport.getZoom(true)
            const zoomTo = currentZoom - (currentZoom * this.zoomBy)
            this.viewer.viewport.zoomTo(zoomTo)
          }
        },
        {
          tooltip: 'Reset zoom',
          icon: 'refresh',
          click: () => {
            const homeZoom = this.viewer.viewport.getHomeZoom()
            this.viewer.viewport.zoomTo(homeZoom)
          }
        },
        {
          tooltip: 'Fullscreen',
          icon: 'expand',
          click: () => {
            this.$emit('fullscreenclicked')
          }
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

      if (this.showShare) {
        let tooltip = 'Share image'
        buttons.push({
          id: 'lv-share-btn',
          tooltip: tooltip,
          icon: 'share-alt',
          click: (evt) => {
            let clipboard = new Clipboard('#lv-share-btn', {
              text: (trigger) => {
                trigger.setAttribute('aria-label', 'URL Copied!')
                trigger.addEventListener('mouseleave', () => {
                  trigger.setAttribute('aria-label', tooltip)
                  clipboard.destroy()
                })
                return this.imgLink
              }
            })
          }
        })
      }

      return buttons
    }
  },

  created () {
    this.task.fetchImageInfo().then((info) => {
      const id = info['@id']
      this.imgLink = `${id}/full/full/0/default.jpg`
    })
  }
}
</script>
