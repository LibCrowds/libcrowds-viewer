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
  ul {
    overflow-y: auto;
    min-height: 100px;
    max-height: 300px;
    list-style: none;
    padding: 0.8rem;
    margin: 0;
    border: 1px solid $gray;


    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;

      &:not(:last-child) {
        margin-bottom: 0.75rem;
      }
    }
  }

  h4 {
    margin: 0;
  }

  svg {
    margin-left: 5px;
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
