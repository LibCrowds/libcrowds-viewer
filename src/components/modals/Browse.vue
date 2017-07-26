<template>
  <div id="lv-browse-modal">
    <modal :id="id" title="Browse Tasks">
      <div class="container">
        <div id="lv-browse-viewer"></div>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import OpenSeadragon from 'openseadragon'

export default {
  components: {
    Modal
  },

  props: {
    id: {
      type: String,
      requried: true
    },
    tasks: {
      type: Array,
      required: true
    }
  },

  methods: {
    update () {
      document.querySelector('#lv-browse-viewer').innerHTML = null
      const viewer = OpenSeadragon({
        id: 'lv-browse-viewer',
        panVertical: false,
        panHorizontal: false,
        showNavigationControl: false,
        sequenceMode: true,
        previousButton: 'lv-browse-previous',
        nextButton: 'lv-browse-next',
        gestureSettingsMouse: {
          scrollToZoom: false,
          clickToZoom: false
        },
        gestureSettingsTouch: {
          dblClickToZoom: false,
          pinchToZoom: false,
          flickEnabled: false
        },
        gestureSettingsPen: {
          clickToZoom: false
        },
        gestureSettingsUnknown: {
          scrollToZoom: false,
          dblClickToZoom: false,
          pinchToZoom: false,
          flickEnabled: false
        },
        tileSources: this.tasks.map((task) => {
          return task.imgInfoUri
        })
      })

      viewer.addHandler('canvas-click', () => {
        let task = this.tasks[viewer.currentPage()]
        this.$emit('taskselected', task)
      })
    }
  },

  watch: {
    tasks: function () {
      this.update()
    }
  },

  mounted () {
    this.update()
  }
}
</script>

<style lang="scss">
@import '~style/partials/buttons';
#lv-browse-modal {
  .container {
    height: 300px;
    position: relative;
  }

  #lv-browse-viewer {
    height: 100%;
  }
}
</style>