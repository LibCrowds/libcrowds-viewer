<template>
  <div id="lv-selection-sidebar">
    <sidebar title="Selections">
      <ul>
        <li
          v-for="s in selections"
          :key="s.id">
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
      <button @click="confirm">
        Confirm
      </button>
    </sidebar>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/pencil'
import Sidebar from '@/components/Sidebar.vue'
import { store } from '@/store.js'

export default {
  computed: {
    selections () {
      const viewer = store.state.viewer
      const overlays = typeof viewer.currentOverlays !== 'undefined'
                         ? viewer.currentOverlays
                         : []
      const selections  = overlays.filter(function (overlay) {
        return overlay.element.classList.contains('selection')
      })
      return selections.map(function (s) {
        const bounds = s.getBounds(viewer.viewport)
        const vpRect = new OpenSeadragon.SelectionRect(bounds.x,
                                                       bounds.y,
                                                       bounds.width,
                                                       bounds.height)
        return {
          id: s.element.id,
          rect: viewer.viewport.viewportToImageRectangle(vpRect)
        }
      })
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
    confirm () {
      const viewer = store.state.viewer
      this.$emit('confirm', this.selections)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/settings';

#lv-selection-sidebar {
  ul {
    overflow-y: scroll;
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
