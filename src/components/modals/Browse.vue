<template>
  <div id="lv-browse-modal">
    <modal :id="id" title="Browse Tasks">
      <div class="container">
        <ul>
          <li
            v-for="task in tasks"
            :key="task.id"
            @click="onTaskClicked(task)">
            <img :src="task.thumbnailUri">
          </li>
        </ul>
      </div>
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
  .container {
    height: 300px;
    position: relative;
  }

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
    width: 128px;
    margin-bottom: 15px;

    img {
      max-width: 100%;
    }
  }

  #lv-browse-viewer {
    height: 100%;
  }
}
</style>