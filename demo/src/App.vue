<template>
  <div id="app">
    <lc-viewer
      :options="options"
      :baseUrl="baseUrl"
      :tileId="tileId"
      :manifest="manifest"
      @confirm="handleConfirm">
    </lc-viewer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: {},
      baseUrl: 'http://api.bl.uk/image/iiif',
      tileId: 'ark:/81055/vdc_100022589157.0x000005',
      manifest: 'http://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json'
    }
  },

  methods: {
    handleConfirm (obj) {
      const jsonStr = JSON.stringify(obj, null, 2)
      const msg = `Selections confirmed:\n\n${jsonStr}`
      alert(msg)
    }
  }
}
</script>

<style lang="scss">
#app {
  margin: 0;
  height: 100vh;
}
</style>
