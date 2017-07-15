<template>
  <div id="lv-sidebar-browse-item">
    <h4>Browse</h4>

    <div id="strip"></div>

    <button
      class="btn btn-hud"
      id="lv-browse-previous">
      <icon name="chevron-left"></icon>
    </button>
    <button
      class="btn btn-hud"
      id="lv-browse-next">
      <icon name="chevron-right"></icon>
    </button>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import OpenSeadragon from 'openseadragon'

export default {
  components: {
    Icon
  },

  props: {
    tasks: {
      type: Array,
      required: true
    }
  },

  methods: {
    update() {
      const viewer = OpenSeadragon({
        id: 'strip',
        panVertical: false,
        panHorizontal: false,
        showNavigationControl: false,
        sequenceMode: true,
        previousButton: 'lv-browse-previous',
        nextButton: 'lv-browse-next',
        gestureSettingsMouse: {
          scrollToZoom: false,
          clickToZoom: false,
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
        tileSources: this.tasks.map(function (t) {
          return t.imgInfoUri
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
      update()
    }
  },

  mounted () {
    this.update()
  }
}
</script>

<style lang="scss">
@import '../../../assets/style/partials/buttons';

#lv-sidebar-browse-item {
  margin-top: 1rem;
  position: relative;
  height: 250px;

  #strip {
    height: 100%;
  }

  #lv-browse-next,
  #lv-browse-previous {
    margin: 0;
    position: absolute !important;
    top: 45%;
  }

  #lv-browse-previous {
    left: 0;

    svg {
      margin-right: 2px;
    }
  }

  #lv-browse-next {
    right: 0;

    svg {
      margin-left: 2px;
    }
  }
}
</style>
