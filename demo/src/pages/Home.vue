<template>
  <main-layout
    :title="title"
    :lead="lead"
    :buttons="buttons">
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main'

export default {
  data: function () {
    return {
      title: 'LibCrowds Viewer',
      lead: 'IIIF-compatible image viewer Vue component',
      buttons: [
        {
          text: 'Select Mode',
          endpoint: 'select'
        },
        {
          text: 'Transcribe Mode',
          endpoint: 'transcribe'
        }
      ]
    }
  },

  components: {
    MainLayout
  }
}
</script>
