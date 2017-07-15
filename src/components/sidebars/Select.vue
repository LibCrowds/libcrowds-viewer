<template>
  <div id="lv-select-sidebar">
    <sidebar title="Selections">
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
            <span
              @click="editTag(tag)"
              class="btn btn-control">
              <icon name="pencil"></icon>
            </span>
            <span
              @click="deleteTag(tag)"
              class="btn btn-control">
              <icon name="times-circle"></icon>
            </span>
          </div>
        </li>
      </ul>
    </sidebar>
  </div>
</template>

<script>
import Task from '@/task'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/pencil'
import Sidebar from '@/components/Sidebar'
import highlightOverlay from '@/utils/highlightOverlay'

export default {
  props: {
    task: {
      type: Task,
      required: true
    }
  },

  components: {
    Icon,
    Sidebar
  },

  computed: {
    tags: function () {
      return this.task.getAnnotationsByMotivation('tagging')
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
@import '../../assets/style/settings';
@import '../../assets/style/partials/buttons';

#lv-select-sidebar {
  ul {
    margin: 0;
    overflow-y: auto;
    min-height: 100px;
    max-height: 250px;
    list-style: none;
    padding: 0;
    border: 1px solid $gray;

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

  button {
    display: flex;
    margin-right: auto;
    margin-left: auto;
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
