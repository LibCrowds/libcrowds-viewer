<template>
  <div id="select-viewer">
    <libcrowds-viewer
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
      :formModal="formModel"
      :formSchema="formSchema"
      @submit="handleResponse">
    </libcrowds-viewer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 'transcribe',
      objective: 'Transcribe the details of the highlighted play.',
      guidance: 'If any details are not available just leave them blank.',
      scheme: "https",
      server: "api.bl.uk",
      imageApiPrefix: "image/iiif",
      presentationApiPrefix: "metadata/iiif",
      imageId: "ark:/81055/vdc_100022589157.0x000005",
      manifestId: "ark:/81055/vdc_100022589158.0x000002",
      formModel: {
        title: "",
        date: "",
        genre: []
      },
      formSchema: {
        fields: [{
          type: "input",
          inputType: "text",
          label: "Title",
          model: "title",
          placeholder: "Enter the title",
          required: true
        },
        {
          type: "input",
          inputType: "date",
          label: "Date",
          model: "date"
        },
        {
          type: "select",
          label: "Genre",
          model: "genre",
          values: ["Comedy", "Tragedy", "Drama"]
        }]
      }
    }
  },

  methods: {
    handleResponse (obj) {
      const jsonStr = JSON.stringify(obj, null, 2)
      const msg = `User input (full data logged to console):\n\n${jsonStr}`
      console.log(obj)
      alert(msg)
    }
  }
}
</script>

<style lang="scss">
#select-viewer {
  margin: 0;
  height: 100vh;
}
</style>
