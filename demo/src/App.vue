<template>
  <div id="viewer">
    <lc-viewer
      :options="options"
      :tileSource="tileSource"
      :manifest="manifest">
    </lc-viewer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: {},
      tileSource: 'http://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json',
      manifest: 'http://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
