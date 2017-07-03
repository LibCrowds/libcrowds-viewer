<template>
  <div id="app">
    <libcrowds-viewer
      :mode="mode"
      :objective="objective"
      :guidance="guidance"
      :scheme="scheme"
      :server="server"
      :image-api-prefix="imageApiPrefix"
      :presentation-api-prefix="presentationApiPrefix"
      :image-id="imageId"
      :manifest-id="manifestId"
      @submit="handleResponse">
    </libcrowds-viewer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 'selection',
      objective: 'Mark the play titles',
      guidance: 'Draw a box around each play title, including any subtitles.',
      mode: 'selection',
      scheme: "https",
      server: "api.bl.uk",
      imageApiPrefix: "image/iiif",
      presentationApiPrefix: "metadata/iiif",
      imageId: "ark:/81055/vdc_100022589157.0x000005",
      manifestId: "ark:/81055/vdc_100022589158.0x000002"
    }
  },

  methods: {
    handleResponse (obj) {
      const jsonStr = JSON.stringify(obj, null, 2)
      const msg = `Selections submitted:\n\n${jsonStr}`
      console.log(obj)
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
