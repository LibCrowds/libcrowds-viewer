<template>
  <transition-group
    appear
    name="fade-sidebar"
    class="lv-sidebar"
    ref="sidebar">

    <header key="header" class="lv-sidebar-header">
      <h3>{{ title }}</h3>
      <h4 key="objective">{{ task.objective }}</h4>
      <p key="guidance">{{ task.guidance }}</p>
    </header>

    <main key="content" class="lv-sidebar-content">
      <slot></slot>
    </main>

    <footer key="footer" class="lv-sidebar-footer">
      <span v-if="!showConfirmButtons">
        <button
          :disabled="disableComplete && task.complete"
          class="lv-btn lv-btn-block lv-btn-white-inverse lv-btn-note"
          @click="toggleNoteCollapse"
          v-html="buttons.note">
        </button>

        <transition
          name="fade-height"
          v-show="showNote"
          v-if="!noteCollapsed">
          <textarea
            v-if="!(disableComplete && task.complete)"
            ref="note"
            class="lv-note"
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
      </span>
    </footer>
  </transition-group>
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
    toggleNoteCollapse () {
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
  },

  watch: {
    task () {
      this.noteCollapsed = true
    }
  }
}
</script>
