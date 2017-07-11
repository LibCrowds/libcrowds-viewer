<template>
  <div id="lv-browse-sidebar">
    <sidebar title="Browse">
      <div id="strip"></div>
    </sidebar>
  </div>
</template>

<script>
import OpenSeadragon from 'openseadragon'
import Sidebar from '@/components/Sidebar'

export default {
  components: {
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
    height: 250px;
  }

  #strip {
    height: 100%;
  }
}
</style>
