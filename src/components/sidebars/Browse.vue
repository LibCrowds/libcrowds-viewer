<template>
  <div id="lv-browse-sidebar">
    <sidebar title="Browse">

      <div id="strip"></div>

      <div
        class="btn-nav"
        id="lv-browse-previous"
        ref="confirmSelection">
        <icon name="chevron-left"></icon>
      </div>
      <div
        class="btn-nav"
        id="lv-browse-next"
        ref="cancelSelection">
        <icon name="chevron-right"></icon>
      </div>

    </sidebar>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import OpenSeadragon from 'openseadragon'
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    Icon,
    Sidebar
  },

  props: {
    tasks: {
      type: Array,
      required: true
    }
  },

  methods: {
    update() {
      this.viewer = OpenSeadragon({
        id: 'strip',
        panVertical: false,
        panHorizontal: false,
        maxZoomLevel: 1,
        maxZoomLevel: 1,
        showNavigationControl: false,
        sequenceMode: true,
        previousButton: 'lv-browse-previous',
        nextButton: 'lv-browse-next',
        tileSources: this.tasks.map(function (t) {
          return t.tileSource
        })
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
@import '../../assets/style/partials/buttons';

#lv-browse-sidebar {
  .lv-sidebar-content {
    position: relative;
    height: 250px;
  }

  #strip {
    height: 100%;
  }

  .btn-nav {
    position: absolute !important;
    top: 45%;

    &#lv-browse-previous {
      left: 1em;
    }

    &#lv-browse-next {
      right: 1em;
    }
  }
}
</style>
