<template>
  <div id="lv-browse-modal">
    <modal :id="id" title="Browse Tasks">
      <div class="container">
        <ul>
          <li
            v-for="task in tasks"
            :key="task.id"
            @click="onThumbnailClicked(task)">
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
     * Emit the click event with the task.
     */
    onThumbnailClicked (task) {
      this.$emit('click', task)
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
    -moz-column-count: 4;
    -moz-column-gap: 5px;
    -webkit-column-count: 4;
    -webkit-column-gap: 5px;
    column-count: 4;
    column-gap: 5px;
  }

  li {
    width: 128px;
    margin-bottom: 5px;

    img {
      max-width: 100%;
    }
  }

  #lv-browse-viewer {
    height: 100%;
  }
}
</style>