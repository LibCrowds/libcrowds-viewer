<template>
  <div id="app">

    <!-- Basic navigation to go back to the demo homepage -->
    <nav
      id="lv-demo-navbar"
      v-if="showSelectViewer || showTranscribeViewer">
      <button @click="hideViewer">
        &lt; Go back
      </button>
    </nav>

    <!-- Demo home page -->
    <div
      id="homepage"
      v-if="(
        !showSelectViewer &&
        !showTranscribeViewer &&
        !customTaskOpts.length)">
      <div class="container">
        <h1>LibCrowds Viewer</h1>
        <p class="lead">
          A Vue component for crowdsourcing Web Annotations.
        </p>
        <div id="mode-buttons">
          <button @click="showSelectViewer = true">
            Select Mode
          </button>
          <button @click="showTranscribeViewer = true">
            Transcribe Mode
          </button>
          <button @click="showCustomiseTextArea = !showCustomiseTextArea">
            Customise
          </button>
        </div>
        <transition name="fade-text-area">
          <div id="customise" v-show="showCustomiseTextArea">
            <textarea
              ref="custom"
              rows="10">
            </textarea>
            <button @click="loadCustomTaskOpts">
              Try it out
            </button>
          </div>
        </transition>
        <p id="instructions">
          <small>(watch the console for events)</small>
        </p>
        <div id="links">
          <a :href="githubUrl">View on GitHub</a>
          <a :href="docsUrl">Read the docs</a>
        </div>
      </div>
    </div>

    <!-- Viewer used for the select tasks -->
    <div class="viewer-container" v-else-if="showSelectViewer">
      <libcrowds-viewer
        :task-opts="selectTaskOpts"
        :before-submit="beforeSubmit"
        @taskchange="handleTaskChange"
        @create="handleCreate"
        @update="handleUpdate"
        @delete="handleDelete"
        @submit="handleSubmit">
        <div slot="share">
          Custom share content can go here.
        </div>
      </libcrowds-viewer>
    </div>

    <!-- Viewer used for the transcribe tasks -->
    <div class="viewer-container" v-else-if="showTranscribeViewer">
      <libcrowds-viewer
        :show-related-tasks="true"
        :task-opts="transcribeTaskOpts"
        :before-submit="beforeSubmit"
        @taskchange="handleTaskChange"
        @create="handleCreate"
        @update="handleUpdate"
        @delete="handleDelete"
        @submit="handleSubmit">
        <div slot="share">
          Custom share content can go here.
        </div>
      </libcrowds-viewer>
    </div>

    <!-- Viewer used for the custom tasks -->
    <div class="viewer-container" v-else-if="customTaskOpts.length">
      <libcrowds-viewer
        :show-related-tasks="true"
        :task-opts="customTaskOpts"
        :before-submit="beforeSubmit"
        @taskchange="handleTaskChange"
        @create="handleCreate"
        @update="handleUpdate"
        @delete="handleDelete"
        @submit="handleSubmit">
        <div slot="share">
          Custom share content can go here.
        </div>
      </libcrowds-viewer>
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
      selectTaskOpts: selectTasks,
      transcribeTaskOpts: transcribeTasks,
      showSelectViewer: false,
      showTranscribeViewer: false,
      showCustomiseTextArea: false,
      customTaskOpts: [],
      beforeSubmit: (taskData) => new Promise((resolve, reject) => {
        if (!taskData.annotations.length) {
          const confirm = window.confirm(
            'EXAMPLE ALERT\n\n' +
            'No annotations have been saved, do you want to continue?'
          )
          if (!confirm) {
            reject(new Error())
          }
        }
        resolve()
      })
    }
  },

  components: {
    Icon
  },

  methods: {
    loadCustomTaskOpts () {
      try {
        this.customTaskOpts = JSON.parse(this.$refs.custom.value)
      } catch (err) {
        this.customTaskOpts = []
        alert(err)
      }
    },

    handleTaskChange (oldTask, newTask) {
      console.log('Task changed', oldTask, newTask)
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
      console.log('Task submitted', task)
      console.log(JSON.stringify(task.annotations, null, 2))
    },

    hideViewer () {
      this.showSelectViewer = false
      this.showTranscribeViewer = false
    },

    demoButtonSlotAlert () {
      const msg = 'This is an example of an additional button being added ' +
        'using the button slot'
      alert(msg)
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

  #customise {
    width: 75%;
    display: block;
    text-align: center;

    textarea {
      width: 100%;
      margin: 1rem;
    }

    button {
      background: #26A65B !important;
    }
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