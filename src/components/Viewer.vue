<template>
  <div id="lv-viewer">

    <div ref="hud">

      <viewer-controls
        :showHelp="showHelp"
        :showInfo="showInfo"
        :zoomInButton="normalizedViewerOpts.zoomInButton"
        :zoomOutButton="normalizedViewerOpts.zoomOutButton"
        :homeButton="normalizedViewerOpts.homeButton"
        :fullPageButton="normalizedViewerOpts.fullPageButton"
        :helpButton="normalizedViewerOpts.helpButton"
        :infoButton="normalizedViewerOpts.infoButton"
        @helpclicked="handleHelpControlClick"
        @infoclicked="handleInfoControlClick">
      </viewer-controls>

      <pan-controls
        :viewer="viewer"
        :panBy="panBy">
      </pan-controls>

      <!--
      <metadata-modal
        v-if="manifestId"
        :id="metadataModalId"
        :scheme="scheme"
        :server="server"
        :presentation-api-prefix="presentationApiPrefix"
        :manifestId="manifestId">
      </metadata-modal>
      -->

      <help-modal
        v-if="showHelp"
        :id="helpModalId"
        :mode="mode">
      </help-modal>

      <div id="lv-sidebars">

        <!--
        <task-sidebar
          :objective="objective"
          :guidance="guidance"
          :showNote="showNote"
          @submit="submit">
        </task-sidebar>
        -->

        <select-sidebar
          v-if="mode === 'select'"
          :viewer="viewer">
        </select-sidebar>

        <transcribe-sidebar
          v-else-if="mode === 'transcribe'"
          :model="formModel"
          :schema="formSchema">
        </transcribe-sidebar>

      </div>

      <div
        class="btn-selection"
        id="confirm-selection"
        ref="confirmSelection">
        <icon name="check-circle"></icon>
      </div>
      <div
        class="btn-selection"
        id="cancel-selection"
        ref="cancelSelection">
        <icon name="times-circle"></icon>
      </div>

    </div>

    <!-- Render viewer after all other components -->
    <div id="lv-viewer-container" ref="viewer"></div>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/check-circle'
import OpenSeadragon from 'openseadragon'
import 'openseadragonselection/dist/openseadragonselection'
import MetadataModal from '@/components/modals/Metadata'
import HelpModal from '@/components/modals/Help'
import ViewerControls from '@/components/controls/Viewer'
import PanControls from '@/components/controls/Pan'
import SelectSidebar from '@/components/sidebars/Select'
import TranscribeSidebar from '@/components/sidebars/Transcribe'
import TaskSidebar from '@/components/sidebars/Task'
import { store } from '@/store'
import addSelection from '@/utils/addSelection'
import drawOverlay from '@/utils/drawOverlay'

export default {
  data: function () {
    return {
      viewer: {},
      metadataModalId: 'lc-metadata-modal',
      helpModalId: 'lc-help-modal'
    }
  },

  props: {
    viewerOpts: Object,
    mode: {
      type: String,
      default: 'selection'
    },
    tasks: {
      type: Array,
      default: []
    },
    confirmBeforeUnload : {
      type: Boolean,
      default: false
    },
    showHelp: {
      type: Boolean,
      default: true
    },
    showInfo: {
      type: Boolean,
      default: true
    },
    showNote: {
      type: Boolean,
      default: false
    },
    panBy: {
      type: Number,
      default: 0.1
    }
  },

  components: {
    MetadataModal,
    HelpModal,
    ViewerControls,
    PanControls,
    SelectSidebar,
    TranscribeSidebar,
    TaskSidebar,
    Icon
  },

  computed: {
    normalizedViewerOpts: function () {
      const defaultOpts = {
        zoomInButton: 'zoom-in',
        zoomOutButton: 'zoom-out',
        homeButton: 'reset-zoom',
        fullPageButton: 'toggle-fullscreen',
        helpButton: 'show-help',
        infoButton: 'show-info',
        panVertical: false,
        panHorizontal: false,
        gestureSettingsMouse: {
          clickToZoom: false
        },
        gestureSettingsTouch: {
          dblClickToZoom: false
        },
        gestureSettingsPen: {
          dblClickToZoom: false
        }
      }
      return Object.assign(defaultOpts, this.viewerOpts)
    },
    imgSource: function () {
      const imgSource = `${this.scheme}://` +
                        `${this.server}/` +
                        `${this.imageApiPrefix}/` +
                        `${this.imageId}`
      store.commit('SET_ITEM', { key: 'imgSource', value: imgSource })
      return imgSource
    }
  },

  methods: {
    loadImage () {
      this.viewer.open({
        type: 'image',
        tileSource: `${this.imgSource}/info.json`,
        buildPyramid: false
      })
    },
    attachControls () {
      // TODO: this works for fullscreen controls but should possibly use
      // https://openseadragon.github.io/docs/OpenSeadragon.Control.html
      this.viewer.container.appendChild(this.$refs.hud)
    },
    handleHelpControlClick () {
      this.$root.$emit('show::modal', this.helpModalId)
    },
    handleInfoControlClick () {
      this.$root.$emit('show::modal', this.metadataModalId)
    },
    setupHandlers () {
      // Store confirmed selections
      this.viewer.addHandler('selection', (selectionRect) => {
        addSelection(this.viewer, selectionRect)
      })

      // Hide loading icon after tile drawn
      // this.viewer.addHandler('tile-drawn', () => {
      //   this.loading(false)
      // })

      // Confirm before leaving if any overlays have been drawn or forms filled
      window.onbeforeunload = () => {
        const msg = 'Unsaved changes will be lost.'
        if (!this.confirmBeforeUnload) {
          return;
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
    configureSelector () {
      const selector = this.viewer.selection({
        showConfirmDenyButtons: false,
        restrictToImage: true,
        returnPixelCoordinates: false
      })
      store.commit('SET_ITEM', { key: 'selector', value: selector })
      selector.enable()
      const confirmBtn = new OpenSeadragon.Button({
        element: this.$refs.confirmSelection,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        tooltip: 'Confirm',
        onRelease: selector.confirm.bind(selector)
      })
      selector.element.appendChild(this.$refs.confirmSelection)
      const cancelBtn = new OpenSeadragon.Button({
        element: this.$refs.cancelSelection,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        tooltip: 'Delete',
        onRelease: selector.cancel.bind(selector)
      })
      selector.element.appendChild(this.$refs.cancelSelection)
    },
    highlightRegion () {
      if (this.region) {
        const rect = new OpenSeadragon.Rect(this.region.x,
                                            this.region.y,
                                            this.region.width,
                                            this.region.height)
        drawOverlay(this.viewer, 'highlight', rect, 'highlight')
      }
    },
    submit (obj) {
      this.$emit('submit', obj)
    }
  },

  watch: {
    imgSource: function () {
      this.loadImage()
    }
  },

  mounted () {
    let opts = this.normalizedViewerOpts
    opts.element = this.$refs.viewer

    this.viewer = OpenSeadragon(opts)

    this.configureSelector()
    this.loadImage()
    this.attachControls()
    this.setupHandlers()
    this.highlightRegion()
  }
}
</script>

<style lang="scss">
@import '../assets/style/settings';
@import '../assets/style/partials/buttons';

#lv-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #000;
  overflow: hidden;
}

#lv-viewer-container {
  height: 100%;
}

#lv-sidebars {
  position: fixed;
  z-index: 2;
  right: 0;
  width: 35%;
  margin: 0.8rem;
  overflow: hidden;
  max-width: 350px;
}

.openseadragon-container {
  height: 100vh;

  .openseadragon-message {
    color: #FFF;
  }

  .selection-box {
    transform: none !important;  /** Disable rotation */
    z-index: 10;
    outline: 9999px solid rgba(#000, .6);

    .btn-selection {
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
    z-index: 1;

    &.selection {
      border: 2px solid $blue;
      background-color: rgba($blue, 0.2);
      opacity: .6;

      &.focus {
        border-color: $green;
        background-color: rgba($green, 0.35);
      }
    }

    &.highlight {
      background-color: rgba($yellow, 0.35);
    }
  }
}
</style>
