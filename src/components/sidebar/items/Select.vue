<template>
  <div id="lv-sidebar-select-item">
    <ul>
      <li
        v-for="tag in tags"
        :key="tag.id"
        @mouseover="highlightOverlay(tag.id, true)"
        @mouseleave="highlightOverlay(tag.id, false)">
        <div class="thumbnail-container">
          <img :src="tag.target.selector.value">
        </div>
        <div class="buttons">
          <button
            @click="editTag(tag)"
            class="btn btn-control">
            <icon name="pencil"></icon>
          </button>
          <button
            @click="deleteTag(tag)"
            class="btn btn-control">
            <icon name="times-circle"></icon>
          </button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import Task from '@/model/Task'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/pencil'
import highlightOverlay from '@/utils/highlightOverlay'
import filterAnnotations from '@/utils/filterAnnotations'

export default {
  props: {
    task: {
      type: Task,
      required: true
    }
  },

  components: {
    Icon
  },

  computed: {
    tags: function () {
      return filterAnnotations({
        annotations: this.task.annotations,
        motivation: 'tagging'
      })
    }
  },

  methods: {
    highlightOverlay,
    editTag (tag) {
      this.$emit('edit', this.task, tag.id)
    },
    deleteTag (tag) {
      this.$emit('delete', this.task, tag.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/settings';
@import '~style/partials/buttons';

#lv-sidebar-select-item {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  ul {
    margin: 0;
    overflow-y: auto;
    flex: 1 1 auto;
    list-style: none;
    padding: 0;
    border: 1px solid lighten($gray-dark, 20%);

    li {
      padding: 0.8rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid darken($gray, 25%);
    }
  }

  .buttons {
    justify-content: flex-end;
    display: flex;
    flex: 0 0 33.3333%;
  }

  .btn {
    display: flex;
    margin-right: auto;
    margin-left: auto;

    &:last-child {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .thumbnail-container {
    align-items: center;
    justify-content: center;
    display: flex;
    flex: 1 1 auto;
    height: 50px;

    img {
      flex: none;  /* IE fix */
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
