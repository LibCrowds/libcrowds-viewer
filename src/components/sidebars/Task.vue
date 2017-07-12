<template>
  <div id="lv-task-sidebar">
    <sidebar title="Task">
      <h4>{{ task.objective }}</h4>
      <p>{{ task.guidance }}</p>
      <button
        v-if="showNote"
        class="btn btn-block"
        @click="toggleCollapseNote">
        Add a note
      </button>
      <div
        v-show="showNote"
        v-if="!collapseNote">
        <textarea
          ref="note"
          rows="3"
          placeholder="Leave a note..."
          @input="updateNote">
        </textarea>
      </div>
      <button
        class="btn btn-block btn-green"
        @click="submit">
        Submit
      </button>
    </sidebar>
  </div>
</template>

<script>
import Task from '@/task'
import Sidebar from '@/components/Sidebar'

export default {
  data: function () {
    return {
      collapseNote: true
    }
  },

  components: {
    Sidebar
  },

  props: {
    task: {
      type: Task,
      required: true
    },
    showNote: {
      type: Boolean,
      required: true
    }
  },

  methods: {

    /**
     * Toggle the collapsing of the note input.
     */
    toggleCollapseNote () {
      this.collapseNote = !this.collapseNote
    },

    /**
     * Emit the noteupdated event with the note value.
     */
    updateNote (evt) {
      this.$emit('noteupdated', evt.target.value)
    },

    /**
     * Emit the submit event with the task.
     */
    submit () {
      this.$emit('submit', this.task)
    }
  },

  watch: {

    /**
     * Clear the note field when the task changes.
     */
    task: function () {
      this.$refs.note.value = ""
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/settings';
@import '../../assets/style/partials/buttons';
@import '../../assets/style/partials/forms';

#lv-task-sidebar {
  h4 {
    margin: 0;
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: 1s;
  }
  .slide-enter {
    transform: translate3d(0, 100%, 0);
    visibility: hidden;
  }
  .slide-leave-to {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }
}
</style>
