<template>
  <main-layout
    :title="title"
    :lead="lead"
    :buttons="buttons">
    <a :href="githubUrl" id="doc-link">
      <icon name="github" scale="1.2"></icon>
      <span class="text">Documentation on GitHub</span>
    </a>
  </main-layout>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/github'
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

  computed: {
    githubUrl: function () {
      return process.env.GITHUB_URL
    }
  },

  components: {
    Icon,
    MainLayout
  }
}
</script>

<style lang="scss">
#doc-link {
  display: flex;
  align-items: center;
  margin-top: 2em;
  text-decoration: none;

  svg {
    margin-right: 5px;
  }

  .text {
    font-size: 0.85rem;
    color: #5F5F5F;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
