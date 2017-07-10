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
          endpoint: process.env.BASE_URL + 'select'
        },
        {
          text: 'Transcribe Mode',
          endpoint: process.env.BASE_URL + 'transcribe'
        }
      ]
    }
  },

  components: {
    MainLayout
  }
}
</script>
