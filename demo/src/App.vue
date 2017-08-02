<template>
  <div id="app">

    <!-- Demo home page -->
    <div
      id="home-container"
      v-if="!showSelectViewer && !showTranscribeViewer">
      <h1>LibCrowds Viewer</h1>
      <p class="lead">
        IIIF-compatible image viewer Vue component.
      </p>
      <div>
        <button @click="showSelectViewer = true">
          Select Mode
        </button>
        <button @click="showTranscribeViewer = true">
          Transcribe Mode
        </button>
      </div>
      <a :href="githubUrl" id="doc-link">
        <icon name="github" scale="1.2"></icon>
        <span class="text">Documentation on GitHub</span>
      </a>
    </div>

    <!-- Viewer used for the select tasks -->
    <div class="viewer-container" v-else-if="showSelectViewer">
      <libcrowds-viewer
        :show-like="showLike"
        :task-opts="selectTaskOpts"
        :creator="creator"
        :generator="generator"
        @taskchange="handleTaskChange"
        @create="handleCreate"
        @update="handleUpdate"
        @delete="handleDelete"
        @submit="handleSubmit">
      </libcrowds-viewer>
    </div>

    <!-- Viewer used for the transcribe tasks -->
    <div class="viewer-container" v-else-if="showTranscribeViewer">
      <libcrowds-viewer
        :disable-complete="true"
        :show-like="showLike"
        :task-opts="transcribeTaskOpts"
        :creator="creator"
        :generator="generator"
        @taskchange="handleTaskChange"
        @create="handleCreate"
        @update="handleUpdate"
        @delete="handleDelete"
        @submit="handleSubmit">
      </libcrowds-viewer>
    </div>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/github'
import selectTasks from './selectTasks'
import transcribeTasks from './transcribeTasks'

export default {
  data: function () {
    return {
      selectTaskOpts: selectTasks,
      transcribeTaskOpts: transcribeTasks,
      showSelectViewer: false,
      showTranscribeViewer: false,
      creator: {
        id: 'http://example.org/user1',
        type: 'Person',
        name: 'My Pseudonym',
        nickname: 'pseudo'
      },
      generator: {
        id: 'http://example.org/client1',
        type: 'Software',
        name: 'Code v2.1',
        homepage: 'http://example.org/client1/homepage1'
      },
      showLike: true
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
    handleTaskChange (task) {
      console.log('Task changed', task)
    },
    handleCreate (task, annotation) {
      console.log('Annotation created', task, annotation)
    },
    handleUpdate (task, annotation) {
      console.log('Annotation updated', task, annotation)
    },
    handleDelete (task, annotation) {
      console.log('Annotation deleted', task, annotation)
    },
    handleSubmit (task) {
      const jsonStr = JSON.stringify(task, null, 2)
      console.log(jsonStr)
      alert('User input logged to console')
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
    font-size: 1.25rem;
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

.viewer-container {
  margin: 0;
  height: 100vh;
}
</style>