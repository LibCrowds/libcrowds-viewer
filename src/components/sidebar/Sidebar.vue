<template>
  <div id="lv-sidebar" ref="sidebar">

    <button
      ref="showsidebar"
      id="show-sidebar"
      class="btn-toggle delay"
      @click="toggleSidebarCollapse">
      <span>
        &#x25C0;
      </span>
      Show {{ title }}
    </button>

    <div
      class="lv-sidebar-header">
      <h4>{{ title }}</h4>
      <button
        class="btn-toggle"
        @click="toggleSidebarCollapse">
        &#x25B6;
      </button>
    </div>

    <div
      class="lv-sidebar-content"
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
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/tasks'
import Task from '@/model/Task'

export default {
  data: function () {
    return {
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
    commentAnnotation: {
      type: [Object, null],
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
    note: function () {
      if (!this.commentAnnotation) {
        return ''
      }
      return this.commentAnnotation.body.value
    }
  },

  components: {
    Icon
  },

  methods: {
    /**
     * Toggle the collapsing of the content.
     */

    toggleSidebarCollapse () {
      this.$refs.sidebar.classList.toggle('collapsed')
      this.$refs.showsidebar.blur()
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

#lv-sidebar {
  z-index: 2;
  top: 0;
  right: 0;
  width: 280px;
  font-size: 14px;
  color: #FFFFFF;
  height: 100%;
  background-color: $gray-dark;
  display: flex;
  flex-direction: column;
  transition: width 350ms;

  @media screen and (min-width: 992px) {
    flex-direction: column;
  }

  &.collapsed {
    width: 0px;

    #show-sidebar {
      background-color: $gray-dark;
      transform: translateX(0);
      padding: 0.5rem;
    }
  }

  #show-sidebar {
    cursor: default;
    position: fixed;
    right: 0;
    top: 1rem;
    font-size: 0.85rem;
    font-family: sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
    transform: translateX(100%);
    transition: transform 200ms;

    &.delay {
      -webkit-transition-delay: 450ms;
      transition-delay: 450ms;
    }
  }

  .lv-sidebar-header {
    display: flex;
    width: calc(280px - 3rem);
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 0.75rem 1.5rem;
    font-family: sans-serif;
    letter-spacing: 1px;

    h4 {
      text-transform: uppercase;
      margin: 0;
      flex-direction: row;
    }
  }

  .lv-sidebar-content {
    flex: 1 1 auto;
    display: flex;
    width: calc(280px - 3rem);
    flex-direction: column;
    position: relative;
    padding: 0.75rem 1.5rem 1.5rem 1.5rem;
    overflow-y: auto;

    h4 {
      margin: 0;
      font-family: Arial;
      font-weight: 200;
      letter-spacing: 0.5px;
    }
  }

  .lv-sidebar-footer {
    padding: 1.5rem;
    width: calc(280px - 3rem);
    border-top: 1px solid lighten($gray-dark, 10%);

    button:not(:last-child) {
      margin-bottom: 0.6rem;
    }

    textarea {
      margin-top: 0.6rem;
      margin-bottom: 0.6rem;
    }
  }

  .btn-toggle {
    cursor: default;
    background: none;
    border: none;
    color: #FFFFFF;
    transition: transform 500ms;
  }

  #task-complete {
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>
