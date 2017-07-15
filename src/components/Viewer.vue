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
        v-if="currentTask && showHelp"
        :id="helpModalId"
        :mode="currentTask.mode">
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
          v-if="currentTask && currentTask.mode === 'select'"
          :task="currentTask"
          @edit="editTag"
          @delete="deleteTag">
        </select-sidebar>

        <transcribe-sidebar
          v-if="currentTask && currentTask.mode === 'transcribe'"
          :task="currentTask"
          @update="updateForm">
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

    /**
     * Attach controls to the viewer container for fullscreen mode.
     */
    attachControls () {
      // TODO: this works but should possibly use
      // https://openseadragon.github.io/docs/OpenSeadragon.Control.html
      this.viewer.container.appendChild(this.$refs.hud)
    },

    /**
     * Emit the show model event when help control clicked.
     */
    handleHelpControlClick () {
      this.$root.$emit('show::modal', this.helpModalId)
    },

    /**
     * Emit the show model event when info control clicked.
     */
    handleInfoControlClick () {
      this.$root.$emit('show::modal', this.metadataModalId)
    },

    /**
     * Setup event handlers.
     */
    setupHandlers () {

      // Add a tag and draw the overlay when a selection is made.
      this.viewer.addHandler('selection', (selectionRect) => {
        const vp = this.viewer.viewport
        const imgRect = vp.viewportToImageRectangle(selectionRect)
        const vpRect = vp.imageToViewportRectangle(imgRect)
        const imageUri = getImageUri({
          imgSource: this.currentTask.imgInfoUri,
          region: imgRect
        })
        const tag = this.currentTask.addTag(this.currentTask.tag, imageUri)
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
     *
     * TODO: Lose this dependency!
     */
    configureSelector () {
      // Initialise the selector
      this.selector = this.viewer.selection({
        showConfirmDenyButtons: false,
        restrictToImage: true,
        returnPixelCoordinates: false
      })

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
     * @param {Task} task.
     *   The task.
     */
    setCurrentTask (task) {
      this.currentTask = task
    },

    /**
     * Update the note and emit the update event with the task.
     * @param {Task} task.
     *   The task.
     * @param {String} text.
     *   The text.
     */
    updateNote (task, text) {
      task.updateComment(text)
      this.$emit('update', task)
    },

    /**
     * Update the form for a task and associated annotations.
     * @param {Task} task.
     *   The task.
     * @param {Object} form
     *   The updated form.
     * @param {Array} errors
     *   Form errors.
     */
    updateForm (task, form, errors) {
      form.errors = errors
      task.form = form
    },

    /**
     * Emit submit event with a task object.
     * @param {Task} task.
     *   The task.
     */
    submitTask (task) {
      // Show form errors if enabled and in transcribe mode
      if (this.showFormErrors && this.currentTask.mode === 'transcribe') {
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
     *   The overlay ID.
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
     * @param {String} id
     *   The tag ID.
     */
    editTag (task, id) {
      const vp = this.viewer.viewport
      const tag = task.getAnnotation(id)
      const imgRect = extractRectFromImageUri(tag.target.selector.value)
      const vpRect = vp.imageToViewportRectangle(imgRect)
      const selectionRect = new OpenSeadragon.SelectionRect(vpRect.x,
                                                            vpRect.y,
                                                            vpRect.width,
                                                            vpRect.height)
      this.selector.rect = selectionRect
      this.selector.draw()
      this.deleteTag(task, id)
      this.$emit('update', task)
    },

    /**
     * Delete a tag.
     * @param {Task} task
     *   The task that the tag belongs to.
     * @param {String} id
     *   The tag ID.
     */
    deleteTag (task, id) {
      task.deleteAnnotation(id)
      this.deleteOverlay(id)
    }
  },

  watch : {
    currentTask: function () {
      // Open the current task image.
      this.viewer.open(this.currentTask.imgInfoUri)
      // Enable selector when in select mode.
      if (this.currentTask.mode === 'select') {
        this.selector.enable()
      } else {
        this.selector.disable()
      }
    }
  },

  mounted () {
    // Initialise the main viewer after the DOM is loaded
    this.viewer = OpenSeadragon(this.viewerOpts)

    this.attachControls()
    this.setupHandlers()
    this.highlightRegion()
    this.configureSelector()
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
