<template>
  <div id="lv-task-sidebar" ref="sidebar">

    <div class="lv-sidebar-header">
      <h3>{{ title }}</h3>
    </div>

    <div class="lv-sidebar-content">
      <h4>{{ task.objective }}</h4>
      <p>{{ task.guidance }}</p>
      <slot></slot>
    </div>

    <div
      class="lv-sidebar-footer hint--top hint--no-animate"
      :aria-label="footerTooltip">

      <transition>
        <span v-if="!showConfirmButtons">
          <button
            :disabled="disableComplete && task.complete"
            class="btn btn-block"
            @click="toggleeNoteCollapse">
            {{ noteButton.text }}
          </button>

          <transition name="fade-height"
            v-show="showNote"
            v-if="!noteCollapsed">
            <textarea
              v-if="!(disableComplete && task.complete)"
              ref="note"
              rows="3"
              :placeholder="noteButton.placeholder"
              v-model="note"
              @input="updateNote">
            </textarea>
          </transition>

          <button
            :disabled="disableComplete && task.complete"
            class="btn btn-block btn-green"
            @click="submit(false)">
            Submit
          </button>
        </span>

        <span v-else-if="showConfirmButtons">
          <p class="lead">Are you sure you want to submit this task?</p>
          <p v-if="disableComplete">There is no going back!</p>
          <div id="confirm-buttons">
            <button
              :disabled="disableComplete && task.complete"
              class="btn btn-red"
              @click="hideConfirm()">
              Cancel
            </button>
            <button
              :disabled="disableComplete && task.complete"
              class="btn btn-green"
              @click="submit(true)">
              Confirm
            </button>
          </div>
        </span>
      </transition>

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
      noteCollapsed: true,
      showConfirmButtons: false
    }
  },

  props: {
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
    noteButton: {
      type: Object,
      required: true
    },
    disableComplete: {
      type: Boolean,
      required: true
    },
    confirmOnSubmit: {
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
    },
    footerTooltip: function () {
      if (this.disableComplete && this.task.complete) {
        return 'Only one submission allowed per task'
      }
    },
    title: function () {
      return this.disableComplete && this.task.complete
        ? 'Task complete'
        : 'Task'
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
     * @param {Boolean} confirmed
     *   True if the submission has been confirmed.
     */
    submit (confirmed) {
      if (this.confirmOnSubmit && confirmed !== true) {
        this.showConfirm()
      } else {
        this.hideConfirm()
        this.$emit('submit', this.task)
      }
    },

    /**
     * Show confirm buttons and emit disableviewer.
     */
    showConfirm () {
      this.$emit('disableviewer')
      this.showConfirmButtons = true
    },

    /**
     * Hide confirm buttons and emit enableviewer.
     */
    hideConfirm () {
      this.$emit('enableviewer')
      this.showConfirmButtons = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~hint.css';
@import '~style/settings';
@import '~style/partials/buttons';
@import '~style/partials/transitions';

#lv-task-sidebar {
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
    border-top: none;
    flex-shrink: 0;
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

    h3 {
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
      padding: 0.5rem;
      margin-bottom: 0.6rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
    }

    .lead {
      font-size: 1.2rem;
    }
  }

  #confirm-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;

    button {
      width: 50%;

      &:first-child {
        margin: 0 0.3rem 0 0;
      }

      &:last-child {
        margin: 0 0 0 0.3rem;
      }
    }
  }
}
</style>
