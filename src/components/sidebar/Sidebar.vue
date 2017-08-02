<template>
  <div id="lv-sidebar" ref="sidebar">

    <div
      class="lv-sidebar-header">
      <h4>{{ title }}</h4>
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

      <span v-if="task.complete && disableComplete" id="task-complete">
        <p>
          Task complete!
        </p>
        <icon name="check-circle"></icon>
      </span>
    </div>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/check-circle'
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
  width: 100%;
  font-size: 14px;
  color: #FFFFFF;
  height: 100%;
  background-color: $gray-dark;
  display: flex;
  flex-direction: column;
  transition: width 350ms;
  overflow-y: auto;
  border-top: 1px solid $gray;
  flex-shrink: 2;

  @media screen and (min-width: 768px) {
    width: 320px;
    overflow-y: initial;
    border-top: none;
    flex-shrink: initial;
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
    font-size: $font-size-sm;
    font-family: $font-family-headings;
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
    flex-direction: row;
    justify-content: space-between;
    padding: 0.75rem 1.5rem 1.5rem 1.5rem;
    font-family: $font-family-headings;
    letter-spacing: 1px;
    display: none;

    @media screen and (min-width: 768px) {
      display: block;
      padding: 0.75rem 1.5rem 0.75rem 1.5rem;
    }

    h4 {
      text-transform: uppercase;
      margin-bottom: 0;
      font-size: 1rem;
      flex-direction: row;
    }
  }

  .lv-sidebar-content {
    flex: none;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.75rem 1.5rem 0.75rem 1.5rem;
    overflow-y: auto;

    @media screen and (min-width: 768px) {
      flex: 1 1 auto;
      padding: 0.75rem 1.5rem 1.5rem 1.5rem;
    }

    h4 {
      margin: 0;
      font-family: $font-family-headings;
      font-weight: 200;
      letter-spacing: 0.5px;
    }

    p {
      margin-bottom: 0;

      @media screen and (min-width: 768px) {
        margin-bottom: 1rem;
      }
    }
  }

  .lv-sidebar-footer {
    padding: 0.75rem 1.5rem 0.75rem 1.5rem;
    border-top: 1px solid lighten($gray-dark, 10%);

    @media screen and (min-width: 768px) {
      padding: 1.5rem;
    }

    button:not(:last-child) {
      margin-bottom: 0.6rem;
    }

    textarea {
      margin-bottom: 0.6rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
    }
  }

  #task-complete {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 1.2rem;
    text-align: center;

    svg {
      height: 32px;
      width: auto;
      color: $green;
    }
  }
}
</style>
