<template>
  <div id="lv-browse-modal">
    <modal-base :show="show" title="Browse Tasks" @hide="$emit('hide')">
      <ul>
        <li
          :class="listItemClass"
          v-for="(task, index) in tasks"
          :key="`task-${index}`"
          @click="onTaskClicked(task)">
          <figure v-if="task !== undefined">
            <img
              :src="task.thumbnailUri"
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
    </modal-base>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/check-circle'
import ModalBase from '@/components/modals/Base'

export default {
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
    listItemClass: function () {
      const complete = (
        this.task !== undefined &&
        this.task.complete &&
        this.disableComplete
      )
      return {
        'task-complete': complete
      }
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

<style lang="scss">
@import '~style/settings';

#lv-browse-modal {
  ul {
    list-style: none;
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
    -moz-column-gap: 5px;
    -webkit-column-gap: 5px;
    column-gap: 5px;

    @media (min-width: 992px) {
      -moz-column-count: 4;
      -webkit-column-count: 4;
      column-count: 4;
    }
  }

  li {
    display: inline-block;
    width: 128px;
    margin-bottom: 30px;
    border: 1px solid lighten($gray-dark, 20%);
    position: relative;

    &:not(.task-complete):hover,
    &:not(.task-complete):focus {
      border-color: lighten($gray-dark, 35%);
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
      font-family: $font-family-headings;
      font-size: $font-size-sm;
      margin: 5px 5px 3px 5px;
    }

    .complete-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 24px;
        width: auto;
        color: $green;
      }
    }
  }
}
</style>