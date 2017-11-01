<template>
  <div id="lv-task-sidebar" ref="sidebar">

    <header>
      <h3>{{ title }}</h3>
    </header>

    <main>
      <h4>{{ task.objective }}</h4>
      <p>{{ task.guidance }}</p>
      <slot></slot>
    </main>

    <footer>
      <transition>
        <span v-if="!showConfirmButtons">
          <button
            :disabled="disableComplete && task.complete"
            class="lv-btn lv-btn-block"
            @click="toggleeNoteCollapse"
            v-html="buttons.note">
          </button>

          <transition name="fade-height"
            v-show="showNote"
            v-if="!noteCollapsed">
            <textarea
              v-if="!(disableComplete && task.complete)"
              ref="note"
              rows="3"
              v-model="note"
              @input="updateNote">
            </textarea>
          </transition>

          <button
            :disabled="disableComplete && task.complete"
            class="lv-btn lv-btn-block lv-btn-green"
            @click="submit(false)"
            v-html="buttons.submit">
          </button>
        </span>

        <span v-else-if="showConfirmButtons">
          <p class="lead">Are you sure you want to submit this task?</p>
          <p v-if="disableComplete">There is no going back!</p>
          <div id="confirm-buttons">
            <button
              :disabled="disableComplete && task.complete"
              class="lv-btn lv-btn-red"
              @click="hideConfirm()">
              Cancel
            </button>
            <button
              :disabled="disableComplete && task.complete"
              class="lv-btn lv-btn-green"
              @click="submit(true)">
              Confirm
            </button>
          </div>
        </span>
      </transition>
    </footer>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/check-circle'
import Task from '@/model/Task'

export default {
  data () {
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
    buttons: {
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
    note () {
      if (!this.commentAnnotation) {
        return ''
      }
      return this.commentAnnotation.body.value
    },

    title () {
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
