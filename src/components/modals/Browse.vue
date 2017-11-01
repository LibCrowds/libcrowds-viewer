<template>
  <div id="lv-browse-modal">
    <modal-base :show="show" title="Browse Tasks" @hide="$emit('hide')">
      <ul>
        <li
          :class="listItemClass"
          v-for="(task, index) in paginatedTasks"
          :key="`task-${index}`"
          @click="onTaskClicked(task)">
          <figure v-if="task !== undefined">
            <img
              v-if="task.thumbnailUrl"
              :src="task.thumbnailUrl"
              :alt='`Task ${index} thumbnail`'>
            <figcaption
              v-if="!task.complete || !disableComplete">
              {{ task.objective }}
            </figcaption>
            <div
              class="complete-icon"
              v-if="task.complete && disableComplete">
              <icon name="check-circle"></icon>
            </div>
          </figure>
        </li>
      </ul>
      <div class="pagination">
        <button
          :disabled="page <= 1"
          @click="page = page - 1">
          &laquo;
        </button>
        <button
          v-for="n in totalPages"
          :key="`page-${n}`"
          :class="{active: n === page}"
          @click="page = n">{{ n }}
        </button>
        <button
          :disabled="page >= totalPages"
          @click="page = page + 1">
          &raquo;
        </button>
      </div>
    </modal-base>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/check-circle'
import ModalBase from '@/components/modals/Base'

export default {
  data () {
    return {
      page: 1,
      perPage: 15
    }
  },

  components: {
    ModalBase,
    Icon
  },

  props: {
    tasks: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      requried: true
    },
    disableComplete: {
      type: Boolean,
      requried: true
    }
  },

  computed: {
    listItemClass () {
      const complete = (
        this.task !== undefined &&
        this.task.complete &&
        this.disableComplete
      )
      return {
        'task-complete': complete
      }
    },

    paginatedTasks () {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage >= this.tasks.length
        ? this.tasks.length
        : start + this.perPage
      const tasks = this.tasks.slice(start, end)
      return tasks
    },

    totalPages () {
      return Math.ceil(this.tasks.length / this.perPage)
    }
  },

  methods: {
    /**
     * Hide the modal and emit the taskclick event with the task.
     */
    onTaskClicked (task) {
      this.$emit('hide')
      this.$emit('taskclick', task)
    }
  }
}
</script>
