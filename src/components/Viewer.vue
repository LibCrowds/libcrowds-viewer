<template>
  <div id="lc-viewer" @click="confirmSelection">

    <controls ref="controls" :buttons="controlButtons"></controls>

    <metadata-modal
      v-if="manifest"
      :id="metadataModalId"
      :manifest="manifest">
    </metadata-modal>

    <overlay 
      v-for="s in selections"
      :rect="s"
      :key="s.id"
      :viewer="viewer">
    </overlay>

    <!-- Render viewer after all other components -->
    <div ref="viewer"></div>

  </div>
</template>

<script>
import MetadataModal from './MetadataModal.vue'
import Overlay from './Overlay.vue'
import Controls from './Controls.vue'
import OpenSeadragon from 'openseadragon'
import 'openseadragonselection/dist/openseadragonselection'

export default {
  data: function () {
    return {
      viewer: null,
      selector: null,
      selections: [],
      metadataModalId: 'lc-metadata-modal',
      showMetadataModal: false
    }
  },

  props: {
    viewerOpts: Object,
    selectionOpts: Object,
    tileSource: {
      type: String,
      required: true
    },
    manifest: {
      type: String,
      default: null
    },
    confirmBeforeUnload : {
      type: Boolean,
      default: false
    }
  },

  components: {
    MetadataModal,
    Controls,
    Overlay
  },

  computed: {
    normalizedViewerOpts: function () {
      const defaultOpts = {
        prefixUrl: '../static/openseadragon/',
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
    normalizedSelectionOpts: function () {
      const defaultOpts = {
        prefixUrl: '../static/images/',
        restrictToImage: true,
        toggleButton: 'toggle-selection',
        keyboardShortcut: null,
        returnPixelCoordinates: false
      }
      return Object.assign(defaultOpts, this.selectionOpts)
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
      },
      {
        id: this.normalizedViewerOpts.helpButton,
        tooltip: 'Help',
        icon: 'question-circle'
      }]

      // If
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
      this.viewer.open({
        type: 'image',
        tileSource:  this.tileSource,
        buildPyramid: false
      })
    },
    attachControls () {
      // TODO: this works for fullscreen controls but should possibly use
      // https://openseadragon.github.io/docs/OpenSeadragon.Control.html
      this.viewer.container.prepend(this.$refs.controls.$el)
    },
    setupHandlers () {
      // Draw an overlay on selection confirmed
      this.viewer.addHandler('selection', (s) => {
        // Convert Viewport to Image rect
        const rect = new OpenSeadragon.Rect(s.x, s.y, s.width, s.height)
        this.selections.push({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        })
      })

      // Hide loading icon after tile drawn
      // this.viewer.addHandler('tile-drawn', () => {
      //   this.loading(false)
      // })

      // Don't focus on HUD after fullscreen toggled
      this.viewer.addHandler('full-screen', (evt) => {
        document.querySelector('.openseadragon-canvas').focus()
      })

      // Convert a overlay back to a selection box on click
      document.addEventListener('click taphold', (evt) => {
        if (evt.target && 'selection-overlay' in evt.target.classList) {
          this.convertOverlayToSelectionBox(evt.target.id)
        }
      })

      // Confirm before leaving if any overlays have been drawn or forms filled
      window.onbeforeunload = () => {
        const msg = 'Unsaved changes will be lost.'
        if (!this.confirmBeforeUnload) {
          return null;
        }

        // TODO: Check for selection overlays only
        if (this.viewer.currentOverlays.length) {
          return msg
        }

        [].forEach.call(document.querySelectorAll('input'), function(input) {
          if (input.value.length) {
            return msg
          }
        })
      };
    },
    confirmSelection () {
      this.selector.confirm()
      this.selector.enable()
      console.log(this.selections)
    }
  },

  watch: {
    tileSource: function () {
      this.loadTileSource()
    },
    selections: function () {

    }
  },

  mounted () {
    let opts = this.normalizedViewerOpts
    opts.element = this.$refs.viewer
    this.viewer = OpenSeadragon(opts)

    // Exposing these options would complicate things
    this.selector = this.viewer.selection({
      prefixUrl: '../static/openseadragon/',
      restrictToImage: true,
      keyboardShortcut: null,
      returnPixelCoordinates: false
    })

    this.selector.enable()

    this.loadTileSource()
    this.attachControls()
    this.setupHandlers()
  }
}
</script>

<style lang="scss">

#lc-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  background-color: #000000;
  overflow: hidden;
}

.openseadragon-container {
  height: 100vh;
  min-height: 600px;

  .navbar {
    background-color: rgba(0, 0, 0, 0.75);
  }

  .openseadragon-message {
    color: #FFFFFF;
  }

  .viewer-sidebar-container {
    position: fixed;
    z-index: 2;
    right: 0;
    top: 70px;
    width: 35%;
    height: calc(100% - 70px - 1.6rem);
    margin: 0.8rem;
    overflow: hidden;
    display: none;

    @media screen and (min-width: 992px) {
        display: block;
    }

    @media screen and (min-width: 992px) {
        width: 25%;
    }

    .viewer-sidebar {
      position: absolute;
      color: #FFFFFF;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0.8rem;
      width: 100%;
      max-height: 100%;
      border: 2px solid rgb(85, 85, 85);
      background-color: rgba(0, 0, 0, 0.75);

      @media screen and (min-width: 992px) {
        flex-direction: column;
      }

      .sidebar-content {
        padding-top: 0.8rem;
      }

      .viewer-sidebar-title {
        font-size: 1rem;
        margin-bottom: 0;
        flex-direction: row;
      }

      .viewer-sidebar-toggle {
        background: none;
        border: none;
        color: #FFFFFF;
        float: right;
        transition: transform 500ms;

        &.collapsed {
          transform: rotate(180deg);
        }
      }

      .progress {
        border: 1px solid #FFFFFF;
        background-color: transparent;

        .progress-bar {
          background-color: #FFFFFF;
        }
      }

      #preview-thumbnail {
        height: 200px;
      }
    }
  }

  .viewer-footer {
    color: #FFFFFF;
    padding: 0.8rem;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.75);
    border-top: 2px solid rgb(85, 85, 85);

    @media screen and (min-width: 992px) {
      display: none;
    }
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

  .viewer-modal {
    .modal-content {
      border: 1px solid #F8F8F8;
    }
  }

  .selection-box {
    transform: none !important;  /** Disable rotation */
    outline: 9999px solid rgba(#000000, .6);

    /** Hide buttons */
    img {
      display: none;
    }
  }
}

</style>
