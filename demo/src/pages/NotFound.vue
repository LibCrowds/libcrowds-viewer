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
      title: '404',
      lead: 'That page does not exist.',
      buttons: [
        {
          text: 'Home',
          endpoint: ''
        }
      ]
    }
  },

  components: {
    MainLayout
  }
}
</script>
