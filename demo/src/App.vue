<template>
  <div id="app">
    <h1 v-show="!viewerVisible">LibCrowds Viewer</h1>
    <p class="lead" v-show="!viewerVisible">
      IIIF-compatible image viewer Vue component.
    </p>
    <div v-show="!viewerVisible">
      <button @click="showViewer('selection')">Selection Mode</button>
      <button @click="showViewer('transcription')">Transription Mode</button>
    </div>
    <libcrowds-viewer
      v-show="viewerVisible"
      show-note
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
      viewerVisible: false,
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
      const msg = `User input (full data logged to console):\n\n${jsonStr}`
      console.log(obj)
      alert(msg)
    },
    showViewer(mode) {
      this.mode = mode
      this.viewerVisible = true
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  background-color: #F8F8F8;
  color: #1F1E38;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  margin: 0;
  font-weight: 200;
}

p.lead {
  font-weight: bold;
  color: #5F5F5F;
}

button {
  color: white;
  background: #59ABE3;
  padding: 12px 26px;
  margin: 0.5rem;
  letter-spacing: 0.8px;
  font-size: 1.2rem;
  border: none;
}
</style>
