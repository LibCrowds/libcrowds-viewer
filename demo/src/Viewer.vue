<template>
  <div class="viewer-container" v-else-if="showSelectViewer">
    <libcrowds-viewer
      :task-opts="selectTaskOpts"
      :navigation="navigation"
      @taskchange="handleTaskChange"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @submit="handleSubmit">
    </libcrowds-viewer>
  </div>
</template>

<script>
import selectTasks from './selectTasks'
import transcribeTasks from './transcribeTasks'

export default {
  data: function () {
    return {
      selectTaskOpts: selectTasks,
      transcribeTaskOpts: transcribeTasks,
      showSelectViewer: false,
      showTranscribeViewer: false,
      showCustomiseTextArea: false,
      customTaskOpts: [],
      navigation: [
        { label: 'LibCrowds Viewer', url: window.location.href, brand: true },
        { label: 'Home', url: window.location.href }
      ]
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
    }
  }
}
</script>

<style lang="scss">
@import 'libcrowds-viewer/dist/scss/libcrowds-viewer.scss';

.viewer-container {
  margin: 0;
  height: 100vh;
}
</style>