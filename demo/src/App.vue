<template>
  <div id="app">

    <div class="container" v-show="page === 'home'">
      <h1>LibCrowds Viewer</h1>
      <p class="lead">
        IIIF-compatible image viewer Vue component.
      </p>
      <div>
        <button @click="changePage('select')">
          Select Mode
        </button>
        <button @click="changePage('transcribe')">
          Transcribe Mode
        </button>
      </div>
      <a :href="githubUrl" id="doc-link">
        <icon name="github" scale="1.2"></icon>
        <span class="text">Documentation on GitHub</span>
      </a>
    </div>

    <select-viewer v-show="page === 'select'"></select-viewer>

    <transcribe-viewer v-show="page === 'transcribe'"></transcribe-viewer>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/github'
import SelectViewer from './components/Select'
import TranscribeViewer from './components/Transcribe'

export default {
  data: function () {
    return {
      page: 'home'
    }
  },

  computed: {
    githubUrl: function () {
      return process.env.GITHUB_URL
    }
  },

  components: {
    Icon,
    SelectViewer,
    TranscribeViewer
  },

  methods: {
    changePage(page) {
      this.page = page
    }
  }
}
</script>

<style lang="scss">
.container {
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
