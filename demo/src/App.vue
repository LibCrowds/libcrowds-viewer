<template>
  <div id="app">

    <div id="home-container" v-if="!showViewer">
      <h1>LibCrowds Viewer</h1>
      <p class="lead">
        IIIF-compatible image viewer Vue component.
      </p>
      <div>
        <button @click="setViewerMode('select')">
          Select Mode
        </button>
        <button @click="setViewerMode('transcribe')">
          Transcribe Mode
        </button>
      </div>
      <a :href="githubUrl" id="doc-link">
        <icon name="github" scale="1.2"></icon>
        <span class="text">Documentation on GitHub</span>
      </a>
    </div>

    <div id="viewer-container" v-else>
      <libcrowds-viewer
        show-note
        :mode="mode"
        :taskOpts="taskOpts"
        @submit="handleResponse">
      </libcrowds-viewer>
    </div>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/github'
import selectTasks from './data/select-tasks'
import transcribeTasks from './data/transcribe-tasks'

export default {
  data: function () {
    return {
      page: 'home',
      mode: '',
      taskOpts: [],
      showViewer: false
    }
  },

  computed: {
    githubUrl: function () {
      return process.env.GITHUB_URL
    }
  },

  components: {
    Icon
  },

  methods: {
    setViewerMode(mode) {
      if (mode === 'select') {
        this.tasks = selectTasks
      } else if (mode === 'transcribe') {
        this.tasks = transcribeTasks
      }
      this.mode = mode
      this.showViewer = true
    },
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
#home-container {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  background-color: #F8F8F8;
  color: #1F1E38;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
}

#viewer-container {
  margin: 0;
  height: 100vh;
}
</style>
