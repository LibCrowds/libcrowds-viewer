<template>
  <div id="app">

    <div id="home-container" v-if="!showViewer">
      <h1>LibCrowds Viewer</h1>
      <p class="lead">
        IIIF-compatible image viewer Vue component.
      </p>
      <div>
        <button @click="showViewer = true">
          Try it
        </button>
      </div>
      <a :href="githubUrl" id="doc-link">
        <icon name="github" scale="1.2"></icon>
        <span class="text">Documentation on GitHub</span>
      </a>
    </div>

    <div id="viewer-container" v-else>
      <libcrowds-viewer
        :task-opts="taskOpts"
        :creator="creator"
        :generator="generator"
        :annotations="annotations"
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
import tasks from './tasks'
import annotations from './annotations'

export default {
  data: function () {
    return {
      taskOpts: tasks,
      showViewer: false,
      creator: {
        id: "http://example.org/user1",
        type: "Person",
        name: "My Pseudonym",
        nickname: "pseudo"
      },
      generator: {
        id: "http://example.org/client1",
        type: "Software",
        name: "Code v2.1",
        homepage: "http://example.org/client1/homepage1"
      },
      annotations: annotations
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
    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    handleTaskChange (task) {
      console.log('TASK CHANGED', task)
    },
    handleCreate (task, annotation) {
      annotation.id = this.guid()
      this.annotations.push(annotation)
    },
    handleUpdate (task, annotation) {
      const filtered = this.annotations.filter(function(anno) {
        return anno.id === annotation.id
      })
      const idx = this.annotations.indexOf(filtered[0])
      let originalAnno = this.annotations[idx]
      originalAnno = annotation
    },
    handleDelete (task, annotation) {
      this.annotations = this.annotations.filter(function(anno) {
        return anno.id !== id
      })
    },
    handleSubmit (obj) {
      const jsonStr = JSON.stringify(obj, null, 2)
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