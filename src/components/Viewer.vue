<template>
  <div id="lv-viewer">

    <div ref="hud">

      <viewer-controls
        :showHelp="showHelp"
        :showInfo="showInfo"
        :zoomInButton="viewerOpts.zoomInButton"
        :zoomOutButton="viewerOpts.zoomOutButton"
        :homeButton="viewerOpts.homeButton"
        :fullPageButton="viewerOpts.fullPageButton"
        :helpButton="viewerOpts.helpButton"
        :infoButton="viewerOpts.infoButton"
        @helpclicked="handleHelpControlClick"
        @infoclicked="handleInfoControlClick">
      </viewer-controls>

      <pan-controls
        :viewer="viewer"
        :panBy="panBy">
      </pan-controls>

      <metadata-modal
        v-if="currentTask"
        :task="currentTask"
        :lang="lang"
        :id="metadataModalId">
      </metadata-modal>

      <help-modal
        v-if="showHelp"
        :id="helpModalId"
        :mode="mode">
      </help-modal>

      <div id="lv-sidebars">

        <task-sidebar
          v-if="currentTask"
          :task="currentTask"
          :showNote="showNote"
          @noteupdated="updateNote"
          @submit="submitTask">
        </task-sidebar>

        <select-sidebar
          v-if="currentTask && mode === 'select'"
          :task="currentTask"
          @edit="editTag"
          @delete="deleteTag">
        </select-sidebar>

        <transcribe-sidebar
          v-if="currentTask && mode === 'transcribe'"
          :task="currentTask">
        </transcribe-sidebar>

        <browse-sidebar
          v-if="showBrowse"
          :tasks="tasks"
          @taskselected="setCurrentTask">
        </browse-sidebar>

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
    <div :id="viewerOpts.id"></div>

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
import BrowseSidebar from '@/components/sidebars/Browse'
import TaskSidebar from '@/components/sidebars/Task'
import Task from '@/task'
import drawOverlay from '@/utils/drawOverlay'
import getImageUri from '@/utils/getImageUri'
import extractRectFromImageUri from '@/utils/extractRectFromImageUri'

export default {
  data: function () {
    return {
      viewer: {},
      selector: {},
      viewerOpts: {
        id: 'lv-viewer-container',
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
      },
      metadataModalId: 'lv-metadata-modal',
      helpModalId: 'lv-help-modal',
      currentTask: null
    }
  },

  props: {
    mode: {
      type: String,
      required: true,
      validator: value => {
        const validModes = ['select', 'transcribe']
        return validModes.indexOf(value) > -1
      }
    },
    taskOpts: {
      type: Array,
      required: true,
      validator: value => {
        return value.length
      }
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
    showBrowse: {
      type: Boolean,
      default: true
    },
    showFormErrors: {
      type: Boolean,
      default: true
    },
    panBy: {
      type: Number,
      default: 0.1
    },
    lang: {
      type: String,
      default: 'en'
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
    BrowseSidebar,
    Icon
  },

  computed: {
    tasks: function () {
      return this.taskOpts.map(function (opts) {
        return new Task(opts)
      })
    }
  },

  methods: {
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

      /**
       * Add a tag and draw the overlay when a selection is made.
       */
      this.viewer.addHandler('selection', (selectionRect) => {
        const vp = this.viewer.viewport
        const imgRect = vp.viewportToImageRectangle(selectionRect)
        const vpRect = vp.imageToViewportRectangle(imgRect)
        const imageUri = getImageUri({
          imgSource: this.currentTask.tileSource,
          region: imgRect
        })
        const tag = this.currentTask.addTag(imageUri)
        drawOverlay(this.viewer, tag.id, vpRect, 'selection')
      })

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
      }
    },

    /**
     * Configure the area selector for the main viewer.
     */
    configureSelector () {

      // Initialise the selector
      this.selector = this.viewer.selection({
        showConfirmDenyButtons: false,
        restrictToImage: true,
        returnPixelCoordinates: false
      })
      this.selector.enable()

      // Add the confirm button
      new OpenSeadragon.Button({
        element: this.$refs.confirmSelection,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        tooltip: 'Confirm',
        onRelease: this.selector.confirm.bind(this.selector)
      })
      this.selector.element.appendChild(this.$refs.confirmSelection)

      // Add the cancel button
      const cancelBtn = new OpenSeadragon.Button({
        element: this.$refs.cancelSelection,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        tooltip: 'Delete',
        onRelease: this.selector.cancel.bind(this.selector)
      })
      this.selector.element.appendChild(this.$refs.cancelSelection)
    },

    /**
     * Highlight a region of the current image.
     */
    highlightRegion () {
      if (this.region) {
        const rect = new OpenSeadragon.Rect(this.region.x,
                                            this.region.y,
                                            this.region.width,
                                            this.region.height)
        drawOverlay(this.viewer, 'highlight', rect, 'highlight')
      }
    },

    /**
     * Set the current task.
     */
    setCurrentTask (task) {
      this.currentTask = task
    },

    /**
     * Update the note and emit the update event with the task.
     */
    updateNote (task, text) {
      task.updateComment(text)
      this.$emit('update', task)
    },

    /**
     * Emit submit event with a task object.
     */
    submitTask (task) {
      // Show form errors if enabled and in transcribe mode
      if (this.showFormErrors && this.mode === 'transcribe') {
        const formGroups = document.querySelector('.form-group')
        if (formGroups.length) {
          formGroups.classList.add('show-errors')
        }
      }
      this.$emit('submit', task)
    },

    /**
     * Delete an overlay.
     * @param {String} id
     *   The ID of the overlay.
     */
    deleteOverlay (id) {
      const query = `.overlay[data-id="${id}"]`
      const el = document.querySelector(query)
      this.viewer.removeOverlay(el)
    },

    /**
     * Remove a tag and enable the selector in the same location.
     * @param {Task} task
     *   The task that the tag belongs to.
     * @param {Annotation} tag
     *   The tag to edit.
     */
    editTag (task, tag) {
      const vp = this.viewer.viewport
      const imgRect = extractRectFromImageUri(tag.target.selector.value)
      const vpRect = vp.imageToViewportRectangle(imgRect)
      const selectionRect = new OpenSeadragon.SelectionRect(vpRect.x,
                                                            vpRect.y,
                                                            vpRect.width,
                                                            vpRect.height)
      this.selector.rect = selectionRect
      this.selector.draw()
      this.selector.enable()
      this.deleteTag(task, tag)
      this.$emit('update', task)
    },

    /**
     * Delete a tag.
     * @param {Task} task
     *   The task that the tag belongs to.
     * @param {Annotation} tag
     *   The tag to delete
     */
    deleteTag (task, tag) {
      task.deleteAnnotation(tag.id)
      this.deleteOverlay(tag.id)
    }
  },

  watch : {

    /**
     * Display the current task in the main viewer.
     */
    currentTask: function () {
      this.viewer.open(this.currentTask.tileSource)
      // Initialise selector
      if (this.mode === 'select') {
        this.configureSelector()
      }
    }
  },

  mounted () {
    // Initialise the main viewer after the DOM is loaded
    this.viewer = OpenSeadragon(this.viewerOpts)
    this.attachControls()
    this.setupHandlers()
    this.highlightRegion()
    this.setCurrentTask(this.tasks[0])
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
