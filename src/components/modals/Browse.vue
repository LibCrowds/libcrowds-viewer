<template>
  <div id="lv-browse-modal">
    <modal :id="id" title="Browse Tasks">
      <ul>
        <li
          v-for="(task, index) in tasks"
          :key="task.id"
          @click="onTaskClicked(task)">
          <figure>
            <img :src="task.thumbnailUri" :alt='`Task ${index} thumbnail`'>
            <figcaption>{{ task.objective }}</figcaption>
          </figure>
        </li>
      </ul>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  components: {
    Modal
  },

  props: {
    id: {
      type: String,
      requried: true
    },
    tasks: {
      type: Array,
      required: true
    }
  },

  methods: {
    /**
     * Hide the modal and emit the taskclick event with the task.
     */
    onTaskClicked (task) {
      this.$root.$emit('hide::modal', this.id)
      this.$emit('taskclick', task)
    }
  }
}
</script>

<style lang="scss">
@import '~style/settings';
@import '~style/partials/buttons';

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
  }
}
</style>