<template>
  <div id="app">

    <!-- Demo home page -->
    <div id="homepage" v-if="!showViewer">
      <div class="container">
        <h1>LibCrowds Viewer</h1>
        <p class="lead">
          A Vue component for crowdsourcing Web Annotations.
        </p>
        <div id="mode-buttons">
          <button @click="loadSelectTasks">
            Select Mode
          </button>
          <button @click="loadTranscribeTasks">
            Transcribe Mode
          </button>
        </div>
        <p id="instructions">
          <small>(watch the console for events)</small>
        </p>
        <div id="links">
          <a :href="githubUrl">View on GitHub</a>
          <a :href="docsUrl">Read the docs</a>
        </div>
      </div>
    </div>

    <!-- Viewer -->
    <div class="viewer-container" v-else>

      <nav
        id="lv-demo-navbar">
        <button @click="showViewer = false">
          &lt; Go back
        </button>
      </nav>

      <libcrowds-viewer
        :task-opts="taskOpts"
        :before-submit="beforeSubmit"
        :toolbar-buttons="extraToolbarButtons"
        @create="logEvent('Annotation Created', arguments)"
        @update="logEvent('Annotation Updated', arguments)"
        @delete="logEvent('Annotation Deleted', arguments)"
        @taskchange="logEvent('Task Changed', arguments)"
        @submit="logEvent('Task Submitted', arguments)"
        @toolbarbtnclick="handleToolbarBtnClick">
      </libcrowds-viewer>

      <lv-modal
        :show="showExampleModal"
        title="Example Modal"
        @hide="showExampleModal = false">
        <p>
          This is an example of a custom button being used to show a custom
          modal.
        </p>
      </lv-modal>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import selectTasks from './selectTasks'
import transcribeTasks from './transcribeTasks'

export default {
  data () {
    return {
      githubUrl: 'https://github.com/LibCrowds/libcrowds-viewer',
      docsUrl: 'https://libcrowds.gitbooks.io/libcrowds-viewer-docs/content/',
      taskOpts: [],
      showViewer: false,
      showExampleModal: false,
      extraToolbarButtons: {
        tags: 'Tags'
      }
    }
  },

  components: {
    Icon
  },

  methods: {
    /**
     * Log an event for testing purposes.
     * @param {String} message
     *   A message.
     * @param {Array} args
     *   The arguments.
     */
    logEvent (message, args) {
      console.log(message, args)
    },

    /**
     * Load the demo select tasks.
     */
    loadSelectTasks () {
      this.taskOpts = selectTasks
      this.showViewer = true
    },

    /**
     * Load the demo transcribe tasks.
     */
    loadTranscribeTasks () {
      this.taskOpts = transcribeTasks
      this.showViewer = true
    },

    /**
     * Show an example beforeSubmit alert.
     * @param {Object} taskData
     *   The task data.
     */
    beforeSubmit (taskData) {
      return new Promise((resolve, reject) => {
        if (!taskData.annotations.length) {
          const confirm = window.confirm(
            'EXAMPLE BEFORE SUBMISSION ALERT\n\n' +
            'No annotations have been saved, do you want to continue?'
          )
          if (!confirm) {
            reject(new Error())
          }
        }
        resolve()
      })
    },

    /**
     * Handle a toolbar button click.
     * @param {String} key
     *   The button key
     */
    handleToolbarBtnClick (key) {
      if (key === 'tags') {
        this.showExampleModal = true
      }
    }
  }
}
</script>

<style lang="scss">
@import 'libcrowds-viewer/dist/scss/libcrowds-viewer.scss';

$lv-demo-navbar-height: 50px;

.viewer-container {
  margin: 0;
  height: calc(100vh - #{$lv-demo-navbar-height});
}

/* The styles below apply to the demo homepage only */
#homepage {
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: $lv-font-family-base;
  margin: 0;
  background-color: #F8F8F8;
  color: #1F1E38;
  height: 100vh;

  .container {
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
  }

  h1 {
    text-align: center;
    margin: 0;
    font-weight: 200;
  }

  p.lead {
    text-align: center;
    font-weight: bold;
    color: #5F5F5F;
  }

  #instructions {
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

  #links {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1em;
    text-decoration: none;

    a {
      color: #1F1E38;
      font-weight: 400;
      margin-bottom: 1rem;
      text-decoration: none;
      color: inherit;
    }

    svg {
      margin-right: 5px;
    }

    .text {
      font-size: 0.85rem;
      color: #5F5F5F;
      font-family: Arial, Helvetica, sans-serif;
    }
  }

  .fade-text-area-enter-active,
  .fade-text-area-leave-active {
    transition: all 0.2s;
    max-height: 500px;
  }
  .fade-text-area-enter,
  .fade-text-area-leave-to
  {
    opacity: 0;
    max-height: 0px;
  }

  #mode-buttons {
    display:flex;
    flex-direction: column;
  }
}

#lv-demo-navbar {
  display: flex;
  background: $lv-sidebar-bg;
  padding: 0 1.5em;
  height: $lv-demo-navbar-height;

  button {
    background: transparent;
    color: #fff;
    border: none;
    font-weight: 600;
    font-family: $lv-font-family-base;
  }
}
</style>