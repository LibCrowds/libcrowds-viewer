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
import { getSelections } from '@/utils.js'

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
    deleteSelection (selection) {
      const viewer = store.state.viewer
      viewer.removeOverlay(selection.id)
    },
    editSelection (selection) {
      const viewer = store.state.viewer
      const selector = store.state.selector
      const overlay = viewer.getOverlayById(selection.id)
      const bounds = overlay.getBounds(viewer.viewport)
      this.deleteSelection(selection)
      selector.rect = new OpenSeadragon.SelectionRect(bounds.x,
                                                      bounds.y,
                                                      bounds.width,
                                                      bounds.height)
      selector.draw()
      selector.enable()
    },
    highlightSelection(selection, highlight) {
      const el = document.querySelector(`#${selection.id}`)
      if (highlight) {
        el.classList.add('highlight')
      } else {
        el.classList.remove('highlight')
      }
    }
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
