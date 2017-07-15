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

      <transition name="fade-height"
        v-show="showNote"
        v-if="!collapseNote">
        <textarea
          ref="note"
          rows="3"
          placeholder="Leave a note..."
          v-model="note"
          @input="updateNote">
        </textarea>
      </transition>

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

  computed: {
    note: function () {
      const comments = this.task.getAnnotationsByMotivation('commenting')
      return comments.length ? comments[0].body.value : ''
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
      this.$emit('noteupdated', this.task, evt.target.value)
    },

    /**
     * Emit the submit event with the task.
     */
    submit () {
      this.$emit('submit', this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/settings';
@import '../../assets/style/partials/buttons';
@import '../../assets/style/partials/transitions';

#lv-task-sidebar {
  h4 {
    margin: 0;
  }

  button {
    margin-top: 0.6rem;
  }

  textarea {
    margin-top: 0.6rem;
  }
}
</style>
