<template>
  <div id="lv-browse-modal-content">
    <ul>
      <li
        :class="listItemClass"
        v-for="(task, index) in paginatedTasks"
        :key="`task-${index}`"
        @click="onTaskClicked(task)">
        <figure v-if="typeof task !== 'undefined'">
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
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/check-circle'

export default {
  data () {
    return {
      page: 1,
      perPage: 15
    }
  },

  components: {
    Icon
  },

  props: {
    tasks: {
      type: Array,
      required: true
    },
    disableComplete: {
      type: Boolean,
      requried: true
    }
  },

  computed: {
    listItemClass () {
      const complete = (
        typeof this.task !== 'undefined' &&
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
     * Emit the taskclick event with the task.
     * @param {Object} task
     *   The task.
     */
    onTaskClicked (task) {
      this.$emit('taskclick', task)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/settings.scss';

#lv-browse-modal-content {
  ul {
    text-align: center;
  }

  li {
    display: inline-block;
    width: 128px;
    margin: 0 10px 30px;
    border: 1px solid darken($lv-modal-border, 50%);
    position: relative;

    &:not(.task-complete):hover,
    &:not(.task-complete):focus {
      border-color: darken($lv-modal-border, 35%);
    }

    &.task-complete {
      img {
        opacity: 0.2;
      }
    }

    figure {
      margin: 5px;
    }

    img {
      max-width: 100%;
    }

    figcaption {
      text-align: center;
      font-size: $lv-font-size-sm;
      margin: 5px 5px 3px 5px;
    }

    .complete-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 24px;
        width: auto;
        color: $lv-green;
      }
    }
  }

  .pagination {
    display: block;
    text-align: center;
  }

  .pagination button {
    color: #fff;
    background: none;
    border: none;
    padding: 8px 16px;

    &.active {
      background-color: $lv-blue;
    }
  }
}
</style>