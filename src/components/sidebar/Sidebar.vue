<template>
  <div class="lv-sidebar">
    <div class="lv-sidebar-header">
      <h4>{{ title }}</h4>
      <span
        :class="toggleClassObj"
        @click="toggleContentCollapse">
        &#x25B2;
      </span>
    </div>

    <div
      class="lv-sidebar-content"
      v-show="!contentCollapsed"
      v-if="!(disableComplete && task.complete)">
      <h4>{{ task.objective }}</h4>
      <p>{{ task.guidance }}</p>
      <slot></slot>
    </div>

    <div class="lv-sidebar-footer">
      <button
        v-if="!(disableComplete && task.complete) && showNote"
        class="btn btn-block"
        @click="toggleeNoteCollapse">
        Add a note
      </button>

      <transition name="fade-height"
        v-show="showNote"
        v-if="!noteCollapsed">
        <textarea
          v-if="!(disableComplete && task.complete)"
          ref="note"
          rows="3"
          placeholder="Leave a note..."
          v-model="note"
          @input="updateNote">
        </textarea>
      </transition>

      <button
        v-if="!(disableComplete && task.complete)"
        class="btn btn-block btn-green"
        @click="submit">
        Submit
      </button>

      <p id="task-complete" v-if="task.complete && disableComplete">
        Task completed!
      </p>
    </div>

  </div>
</template>

<script>
import Task from '@/model/Task'
import filterAnnotations from '@/utils/filterAnnotations'

export default {
  data: function () {
    return {
      contentCollapsed: false,
      noteCollapsed: true
    }
  },

  props: {
    title: {
      type: String,
      default: 'Task'
    },
    task: {
      type: Task,
      required: true
    },
    showNote: {
      type: Boolean,
      required: true
    },
    disableComplete: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    toggleClassObj: function () {
      return {
        toggle: true,
        active: this.contentCollapsed
      }
    },
    note: function () {
      const annotations = filterAnnotations({
        annotations: this.task.annotations,
        motivation: 'commenting'
      })
      return annotations.length ? annotations[0].body.value : ''
    }
  },

  methods: {
    /**
     * Toggle the collapsing of the content.
     */

    toggleContentCollapse () {
      this.contentCollapsed = !this.contentCollapsed
    },

    /**
     * Toggle the collapsing of the note input.
     */
    toggleeNoteCollapse () {
      this.noteCollapsed = !this.noteCollapsed
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
@import '~style/settings';
@import '~style/partials/buttons';
@import '~style/partials/transitions';

.lv-sidebar {
  font-size: 14px;
  color: #FFFFFF;
  overflow-y: hidden;
  max-height: calc(100vh - 2rem);
  border: 2px solid rgb(85, 85, 85);
  background-color: rgba(0, 0, 0, 0.75);
  margin: 1rem;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 992px) {
    flex-direction: column;
  }

  .lv-sidebar-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.6rem;
    font-family: sans-serif;
    letter-spacing: 1px;

    h4 {
      text-transform: uppercase;
      margin: 0;
      flex-direction: row;
    }
  }

  .lv-sidebar-content {
    max-height: 80vh;
    position: relative;
    padding: 0.6em;
    overflow-y: auto;

    h4 {
      margin: 0;
    }
  }

  .lv-sidebar-footer {
    padding: 0.6rem;
    border-top: 1px solid $gray;

    button:not(:last-child) {
      margin-bottom: 0.6rem;
    }

    textarea {
      margin-top: 0.6rem;
      margin-bottom: 0.6rem;
    }
  }

  .toggle {
    cursor: default;
    background: none;
    border: none;
    color: #FFFFFF;
    float: right;
    transition: transform 500ms;

    &.active {
      transform: rotate(180deg);
    }
  }

  #task-complete {
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>
