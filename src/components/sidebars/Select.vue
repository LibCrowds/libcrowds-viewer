<template>
  <div id="lv-select-sidebar">
    <sidebar title="Selections">
      <ul>
        <li
          v-for="s in selections"
          :key="s.id"
          @mouseover="highlightSelection(s, true)"
          @mouseleave="highlightSelection(s, false)">
          <div class="thumbnail-container">
            <img :src="getImageUri(s.imageRect)">
          </div>
          <div class="buttons">
            <span
              @click="editSelection(viewer, s)"
              class="btn btn-control">
              <icon name="pencil"></icon>
            </span>
            <span
              @click="deleteSelection(viewer, s)"
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
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/pencil'
import Sidebar from '@/components/Sidebar'
import { store } from '@/store'
import editSelection from '@/utils/editSelection'
import highlightSelection from '@/utils/highlightSelection'
import deleteSelection from '@/utils/deleteSelection'
import getImageUri from '@/utils/getImageUri'

export default {
  data: function () {
    return {
      selections: []
    }
  },

  props: {
    viewer: {
      type: Object,
      required: true
    }
  },

  components: {
    Icon,
    Sidebar
  },

  methods: {
    deleteSelection,
    editSelection,
    highlightSelection,
    getImageUri
  },

  mounted () {
    store.watch(store.getters.getSelections, selections => {
      this.selections = selections
    })
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
