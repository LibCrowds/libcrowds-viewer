<template>
  <div id="lv-viewer">

    <controls
      ref="controls"
      :buttons="controlButtons">
    </controls>

    <metadata-modal
      v-if="manifest"
      :id="metadataModalId"
      :manifest="manifest">
    </metadata-modal>

    <help-modal
      v-if="showHelp"
      :id="helpModalId"
      :mode="mode">
    </help-modal>

    <selection-sidebar
      v-if="mode === 'selection'"
      @confirm="confirm">
    </selection-sidebar>

    <div
      class="selection-btn"
      id="confirm-selection"
      ref="confirmSelection">
      <icon name="check-circle"></icon>
    </div>
    <div
      class="selection-btn"
      id="cancel-selection"
      ref="cancelSelection">
      <icon name="times-circle"></icon>
    </div>

    <!-- Render viewer after all other components -->
    <div id="lv-viewer-container" ref="viewer"></div>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/check-circle'
import OpenSeadragon from 'openseadragon'
import 'openseadragonselection/dist/openseadragonselection'
import MetadataModal from '@/components/modals/Metadata.vue'
import HelpModal from '@/components/modals/Help.vue'
import Controls from '@/components/Controls.vue'
import SelectionSidebar from '@/components/sidebars/Selection.vue'
import { store } from '@/store.js'

export default {
  data: function () {
    return {
      metadataModalId: 'lc-metadata-modal',
      helpModalId: 'lc-help-modal',
      showMetadataModal: false
    }
  },

  props: {
    viewerOpts: Object,
    mode: {
      type: String,
      default: 'selection'
    },
    selectionOpts: Object,
    baseUrl: {
      type: String,
      required: true
    },
    tileId: {
      type: String,
      required: true
    },
    manifest: {
      type: String,
      default: null
    },
    showHelp: {
      type: String,
      default: true
    },
    confirmBeforeUnload : {
      type: Boolean,
      default: false
    }
  },

  components: {
    MetadataModal,
    HelpModal,
    Controls,
    SelectionSidebar,
    Icon
  },

  computed: {
    normalizedViewerOpts: function () {
      const defaultOpts = {
        zoomInButton: 'zoom-in',
        zoomOutButton: 'zoom-out',
        homeButton: 'reset-zoom',
        fullPageButton: 'fullscreen',
        helpButton: 'show-help-modal',
        infoButton: 'show-info-modal',
        gestureSettingsMouse: {
          clickToZoom: false
        },
        gestureSettingsTouch: {
          dblClickToZoom: false
        },
        gestureSettingsPen: {
          dblClickToZoom: false
        },
        selectionEnabled: false
      }
      return Object.assign(defaultOpts, this.viewerOpts)
    },
    controlButtons: function () {
      let buttons = [{
        id: this.normalizedViewerOpts.zoomInButton,
        tooltip: 'Zoom in',
        icon: 'plus-circle'
      },
      {
        id: this.normalizedViewerOpts.zoomOutButton,
        tooltip: 'Zoom out',
        icon: 'minus-circle'
      },
      {
        id: this.normalizedViewerOpts.homeButton,
        tooltip: 'Reset Zoom',
        icon: 'refresh'
      },
      {
        id: this.normalizedViewerOpts.fullPageButton,
        tooltip: 'Fullscreen',
        icon: 'expand'
      }]

      if (this.showHelp) {
        buttons.push({
          id: this.normalizedViewerOpts.helpButton,
          tooltip: 'Help',
          icon: 'question-circle',
          click: () => {
            this.$root.$emit('show::modal', this.helpModalId)
          }
        })
      }

      if (this.manifest) {
        buttons.push({
          id: this.normalizedViewerOpts.infoButton,
          tooltip: 'Details',
          icon: 'info-circle',
          click: () => {
            this.$root.$emit('show::modal', this.metadataModalId)
          }
        })
      }
      return buttons
    }
  },

  methods: {
    loadTileSource () {
      const viewer = store.state.viewer
      const tileSource = `${this.baseUrl}/${this.tileId}/info.json`
      viewer.open({
        type: 'image',
        tileSource: tileSource,
        buildPyramid: false
      })
    },
    attachControls () {
      // TODO: this works for fullscreen controls but should possibly use
      // https://openseadragon.github.io/docs/OpenSeadragon.Control.html
      const viewer = store.state.viewer
      viewer.container.prepend(this.$refs.controls.$el)
    },
    setupHandlers () {
      // Draw an overlay on selection confirmed
      const viewer = store.state.viewer
      viewer.addHandler('selection', (s) => {
        // Convert Viewport to Image rect
        const rect = new OpenSeadragon.Rect(s.x, s.y, s.width, s.height)
        this.addOverlay(rect, 'selection')
      })

      // Hide loading icon after tile drawn
      // this.viewer.addHandler('tile-drawn', () => {
      //   this.loading(false)
      // })

      window.addEventListener('click', function () {

      })

      // Don't focus on HUD after fullscreen toggled
      viewer.addHandler('full-screen', (evt) => {
        document.querySelector('.openseadragon-canvas').focus()
      })

      // Confirm before leaving if any overlays have been drawn or forms filled
      window.onbeforeunload = () => {
        const msg = 'Unsaved changes will be lost.'
        if (!this.confirmBeforeUnload) {
          return null;
        }

        // TODO: Check for selection overlays only
        if (viewer.currentOverlays.length) {
          return msg
        }

        [].forEach.call(document.querySelectorAll('input'), function(input) {
          if (input.value.length) {
            return msg
          }
        })
      };
    },
    configureSelector () {
      const viewer = store.state.viewer
      const selector = viewer.selection({
        showConfirmDenyButtons: false,
        restrictToImage: true,
        returnPixelCoordinates: false,
        navImages: {
          selection: {
            REST: null,
            GROUP: null,
            HOVER: null,
            DOWN: null
          }
        }
      })
      store.commit('SET_ITEM', { key: 'selector', value: selector })
      selector.enable()
      const confirmBtn = new OpenSeadragon.Button({
        element: this.$refs.confirmSelection,
        clickTimeThreshold: viewer.clickTimeThreshold,
        clickDistThreshold: viewer.clickDistThreshold,
        tooltip: 'Confirm',
        onRelease: selector.confirm.bind(selector)
      })
      selector.element.appendChild(this.$refs.confirmSelection)
      const cancelBtn = new OpenSeadragon.Button({
        element: this.$refs.cancelSelection,
        clickTimeThreshold: viewer.clickTimeThreshold,
        clickDistThreshold: viewer.clickDistThreshold,
        tooltip: 'Delete',
        onRelease: selector.cancel.bind(selector)
      })
      selector.element.appendChild(this.$refs.cancelSelection)
    },
    addOverlay(rect, cls) {
      const viewer = store.state.viewer
      const el = document.createElement('div')
      el.id = `overlay-${Date.now()}`
      el.classList.add('overlay')
      el.classList.add(cls)
      viewer.addOverlay({ element: el, location: rect })
    },
    editSelection() {

    },
    handleOverlayClick (evt) {
      const viewer = store.state.viewer
      if (this.selection) {
        viewer.removeOverlay(this.id)
      }
      evt.preventDefault()
    },
    confirm (obj) {
      console.log(obj)
      this.$emit('confirm', obj)
    }
  },

  watch: {
    tileId: function () {
      this.loadTileSource()
    }
  },

  mounted () {
    let opts = this.normalizedViewerOpts
    opts.element = this.$refs.viewer

    const viewer = OpenSeadragon(opts)
    store.commit('SET_ITEM', { key: 'viewer', value: viewer })

    this.configureSelector()
    this.loadTileSource()
    this.attachControls()
    this.setupHandlers()
  }
}
</script>

<style lang="scss">

#lv-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  background-color: #000000;
  overflow: hidden;
}

#lv-viewer-container {
  height: 100%;
}

.openseadragon-container {
  height: 100vh;
  min-height: 600px;

  .openseadragon-message {
    color: #FFFFFF;
  }

  .viewer-hint {
    white-space: nowrap;
    position: absolute;
    pointer-events: none;
    top: 80px;
    width: 100%;
    text-align: center;
    opacity: 0;
    transition: opacity 300ms;

    &.show {
      opacity: 1;
    }

    .viewer-hint-text {
      padding: .5rem;
      color: #FFFFFF;
      width: 400px;
      margin:0px auto;
      background-color: rgba(0, 0, 0, 0.75);
      border-radius: 6px;
    }
  }

  .selection-box {
    transform: none !important;  /** Disable rotation */
    outline: 9999px solid rgba(#000000, .6);

    .selection-btn {
      color: #fff;
      display: flex !important;
      position: absolute !important;
      right: 0;

      &#confirm-selection {
        bottom: 0;
        transform: translateX(20px) translateY(15px);
      }

      &#cancel-selection {
        top: 0;
        transform: translateX(20px) translateY(-15px);
      }
    }
  }

  .overlay {
    z-index: 50;

    &.selection {
      border: 2px solid #3498DB;
      background-color: rgba(#3498DB, 0.2);
      opacity: .6;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    &.highlight {
      border-color: #2ECC71;
      background-color: rgba(#2ECC71, 0.2);
    }
  }
}

</style>
