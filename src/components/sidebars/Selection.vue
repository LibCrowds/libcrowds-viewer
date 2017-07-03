<template>
  <div id="lv-selection-sidebar">
    <sidebar title="Selections">
      <ul>
        <li
          v-for="s in selections"
          :key="s.id"
          @mouseover="highlightSelection(s, true)"
          @mouseleave="highlightSelection(s, false)">
          {{ s.id }}
          <div>
            <span @click="editSelection(s)">
              <icon name="pencil"></icon>
            </span>
            <span @click="deleteSelection(s)">
              <icon name="times-circle"></icon>
            </span>
          </div>
        </li>
      </ul>
    </sidebar>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/pencil'
import Sidebar from '@/components/Sidebar.vue'
import { store } from '@/store.js'
import getSelections from '@/utils/getSelections.js'
import deleteSelection from '@/utils/deleteSelection.js'
import editSelection from '@/utils/editSelection.js'
import highlightSelection from '@/utils/highlightSelection.js'

export default {
  computed: {
    selections () {
      return getSelections()
    }
  },

  components: {
    Icon,
    Sidebar
  },

  methods: {
    deleteSelection,
    editSelection,
    highlightSelection
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/settings';
@import '../../assets/style/partials/buttons';

#lv-selection-sidebar {
  ul {
    overflow-y: auto;
    height: 300px;
    list-style: none;
    padding: 0.8rem;
    border: 1px solid $gray;

    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;

      &:not(:last-child) {
        margin-bottom: 0.75rem;
      }
    }
  }

  svg {
    margin-left: 5px;
  }

  button {
    display: flex;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
