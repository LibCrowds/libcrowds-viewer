<template>
  <div id="transcribe-viewer">
    <libcrowds-viewer
      show-note
      :mode="mode"
      :tasks="tasks"
      @submit="handleResponse">
    </libcrowds-viewer>
  </div>
</template>

<script>
import tasks from '../data/transcribe-tasks'

export default {
  data () {
    return {
      mode: 'transcribe',
      tasks: tasks
    }
  },

  methods: {
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
#transcribe-viewer {
  margin: 0;
  height: 100vh;
}
</style>
