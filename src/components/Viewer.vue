<template>
  <div id="lv-viewer" ref="container">

    <div id="lv-viewer-wrapper">

      <div id="hud" ref="hud">
        <viewer-controls
          v-if="currentTask"
          :task="currentTask"
          :viewer="viewer"
          :zoomBy="zoomBy"
          :showHelp="showHelp"
          :showInfo="showInfo"
          :showLike="showLike"
          :showShare="showShare"
          :helpButton="viewerOpts.helpButton"
          :infoButton="viewerOpts.infoButton"
          @helpclicked="emitShowHelp"
          @infoclicked="emitShowInfo"
          @likeclicked="emitTaskLiked"
          @fullscreenclicked="toggleFullScreen">
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

        <button
          class="btn-selection"
          id="confirm-selection"
          ref="confirmSelection">
          <icon name="check-circle"></icon>
        </button>
        <button
          class="btn-selection"
          id="cancel-selection"
          ref="cancelSelection">
          <icon name="times-circle"></icon>
        </button>
        <button
          :disabled="previousBtnDisabled"
          class="btn btn-hud"
          id="lv-browse-previous"
          @click="previousTask">
          <icon name="chevron-left" scale="1.5"></icon>
        </button>
        <button
          :disabled="nextBtnDisabled"
          class="btn btn-hud"
          id="lv-browse-next"
          @click="nextTask">
          <icon name="chevron-right" scale="1.5"></icon>
        </button>
      </div>

      <div :id="viewerOpts.id"></div>

    </div>

    <sidebar
      v-if="currentTask"
      :task="currentTask"
      :showNote="showNote"
      :disableComplete="disableComplete"
      @noteupdated="updateNote"
      @submit="submitTask">

      <select-sidebar-item
        v-if="currentTask.mode === 'select'"
        :task="currentTask"
        @edit="editTag"
        @delete="deleteTag">
      </select-sidebar-item>

      <transcribe-sidebar-item
        v-if="currentTask.mode === 'transcribe'"
        :task="currentTask"
        @update="updateForm">
      </transcribe-sidebar-item>
    </sidebar>

    <selection-box
      v-if="currentTask && currentTask.mode === 'select'"
      :viewer="viewer"
      @selection="handleSelection">
    </selection-box>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import OpenSeadragon from 'openseadragon'
import MetadataModal from '@/components/modals/Metadata'
import HelpModal from '@/components/modals/Help'
import ViewerControls from '@/components/controls/Viewer'
import PanControls from '@/components/controls/Pan'
import Sidebar from '@/components/sidebar/Sidebar'
import SelectSidebarItem from '@/components/sidebar/items/Select'
import TranscribeSidebarItem from '@/components/sidebar/items/Transcribe'
import SelectionBox from '@/components/SelectionBox'
import Task from '@/model/Task'
import TagAnnotation from '@/model/TagAnnotation'
import DescriptionAnnotation from '@/model/DescriptionAnnotation'
import CommentAnnotation from '@/model/CommentAnnotation'
import drawOverlay from '@/utils/drawOverlay'
import getImageUri from '@/utils/getImageUri'
import extractRectFromImageUri from '@/utils/extractRectFromImageUri'
import filterAnnotations from '@/utils/filterAnnotations'
import toggleFullScreen from '@/utils/toggleFullScreen'

export default {
  data: function () {
    return {
      viewer: {},
      selector: {},
      viewerOpts: {
        id: 'lv-viewer-container',
        showNavigationControl: false,
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
      tasks: [],
      currentTask: null
    }
  },

  props: {
    taskOpts: {
      type: Array,
      required: true
    },
    confirmBeforeUnload: {
      type: Boolean,
      default: false
    },
    disableComplete: {
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
    zoomBy: {
      type: Number,
      default: 0.2
    },
    lang: {
      type: String,
      default: 'en'
    },
    creator: {
      type: Object,
      default: null
    },
    generator: {
      type: Object,
      default: null
    },
    showLike: {
      type: Boolean,
      default: false
    },
    showShare: {
      type: Boolean,
      default: true
    }
  },

  components: {
    MetadataModal,
    HelpModal,
    ViewerControls,
    PanControls,
    Sidebar,
    SelectSidebarItem,
    TranscribeSidebarItem,
    SelectionBox,
    Icon
  },

  computed: {
    previousBtnDisabled: function () {
      if (!this.currentTask) {
        return true
      }
      return !(this.tasks.indexOf(this.currentTask) > 0)
    },
    nextBtnDisabled: function () {
      if (!this.currentTask) {
        return true
      }
      return this.tasks.indexOf(this.currentTask) >= this.tasks.length - 1
    }
  },

  methods: {
    /**
     * Emit the show model event for the help modal.
     */
    emitShowHelp () {
      this.$root.$emit('show::modal', this.helpModalId)
    },

    /**
     * Emit the show model event for the info modal.
     */
    emitShowInfo () {
      this.$root.$emit('show::modal', this.metadataModalId)
    },

    /**
     * Emit the taskliked event.
     */
    emitTaskLiked (task, status) {
      task.liked = status
      this.$emit('taskliked', status)
    },

    /**
     * Toggle fullscreen mode.
     */
    toggleFullScreen () {
      const el = this.$refs.container
      toggleFullScreen(el)
    },

    /**
     * Draw overlay and add tag when a selection is made.
     */
    handleSelection (selectionRect) {
      const vp = this.viewer.viewport
      const imgRect = vp.viewportToImageRectangle(selectionRect)
      const imageUri = getImageUri({
        imgSource: this.currentTask.imgInfoUri,
        region: imgRect
      })
      this.currentTask.fetchImageInfo().then((info) => {
        let anno = new TagAnnotation({
          imgInfo: info,
          value: this.currentTask.tag,
          fragmentURI: imageUri,
          creator: this.creator,
          generator: this.generator,
          classification: this.currentTask.classification
        })
        this.currentTask.annotations.push(anno)
        this.$emit('create', this.currentTask, anno)
      })
    },

    /**
     * Setup event handlers.
     */
    setupHandlers () {
      // Confirm before leaving if any overlays have been drawn or forms filled
      window.onbeforeunload = () => {
        const msg = 'Unsaved changes will be lost.'
        if (!this.confirmBeforeUnload) {
          return
        }

        // TODO: Check for selection overlays only
        if (this.viewer.currentOverlays.length) {
          return msg
        }

        [].forEach.call(document.querySelectorAll('input'), function (input) {
          if (input.value.length) {
            return msg
          }
        })
      }
    },

    /**
     * Redraw all selection overlays for a task.
     * @param {Task} task.
     *   The task.
     */
    drawSelectionOverlays (task) {
      const vp = this.viewer.viewport
      let annos = filterAnnotations({
        annotations: task.annotations,
        motivation: 'tagging'
      })
      this.viewer.clearOverlays()
      if (!annos.length) {
        return
      }
      for (let anno of annos) {
        const imgRect = extractRectFromImageUri(anno.target.selector.value)
        const vpRect = vp.imageToViewportRectangle(imgRect)
        drawOverlay(this.viewer, anno.id, vpRect, 'selection')
      }
    },

    /**
     * Configure the area selector for the main viewer.
     *
     * TODO: Lose this dependency!
     */
    configureSelector () {
      this.selector = this.viewer.selection({
        showConfirmDenyButtons: false,
        restrictToImage: true,
        returnPixelCoordinates: false
      })

      /* eslint-disable no-new */
      new OpenSeadragon.Button({
        element: this.$refs.confirmSelection,
        clickTimeThreshold: this.viewer.clickTimeThreshold,
        clickDistThreshold: this.viewer.clickDistThreshold,
        tooltip: 'Confirm',
        onRelease: this.selector.confirm.bind(this.selector)
      })
      this.selector.element.appendChild(this.$refs.confirmSelection)

      /* eslint-disable no-new */
      new OpenSeadragon.Button({
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
        const rect = new OpenSeadragon.Rect(
          this.region.x,
          this.region.y,
          this.region.width,
          this.region.height
        )
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
     * Go to the next task.
     */
    previousTask () {
      const index = this.tasks.indexOf(this.currentTask)
      this.currentTask = this.tasks[index - 1]
    },

    /**
     * Go to the next task.
     */
    nextTask () {
      const index = this.tasks.indexOf(this.currentTask)
      this.currentTask = this.tasks[index + 1]
    },

    /**
     * Update the note and emit the relevant event.
     * @param {Task} task.
     *   The task.
     * @param {String} text.
     *   The text.
     */
    updateNote (task, text) {
      let annos = filterAnnotations({
        annotations: task.annotations,
        motivation: 'commenting'
      })
      if (annos.length && text.length === 0) {
        task.deleteAnnotation(annos[0].id)
        this.$emit('delete', task, annos[0])
      } else if (annos.length) {
        annos[0].body.value = text
        annos[0].modify({
          creator: this.creator,
          generator: this.generator
        })
        this.$emit('update', task, annos[0])
      } else {
        task.fetchImageInfo().then((info) => {
          let anno = new CommentAnnotation({
            imgInfo: info,
            value: text,
            creator: this.creator,
            generator: this.generator
          })
          task.annotations.push(anno)
          this.$emit('create', task, anno)
        })
      }
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
      for (let prop in form.model) {
        if (Object.keys(form.annotations).indexOf(prop) > -1) {
          const anno = form.annotations[prop]
          const bodies = anno.searchBodies({ purpose: 'describing' })
          bodies[0].value = form.model[prop]
          anno.modify({
            creator: this.creator,
            generator: this.generator
          })
          this.$emit('update', task, anno)
        } else {
          this.currentTask.fetchImageInfo().then((info) => {
            let anno = new DescriptionAnnotation({
              imgInfo: info,
              value: form.model[prop],
              tag: prop,
              creator: this.creator,
              generator: this.generator,
              classification: form.classification[prop]
            })
            form.annotations[prop] = anno
            task.annotations.push(anno)
            this.$emit('create', task, anno)
          })
        }
      }
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
      task.complete = true
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
      const selectionRect = new OpenSeadragon.SelectionRect(
        vpRect.x,
        vpRect.y,
        vpRect.width,
        vpRect.height
      )
      this.selector.rect = selectionRect
      this.selector.draw()
      this.deleteTag(task, id)
    },

    /**
     * Delete a tag.
     * @param {Task} task
     *   The task that the tag belongs to.
     * @param {String} id
     *   The tag ID.
     */
    deleteTag (task, id) {
      const anno = task.getAnnotation(id)
      task.deleteAnnotation(id)
      this.deleteOverlay(id)
      this.$emit('delete', task, anno)
    },

    /**
     * Configure selection mode.
     * @param {Task} task
     *   The task.
     */
    configureSelectionMode (task) {
      if (task.mode === 'select' && !(task.complete && this.disableComplete)) {
        this.selector.enable()
      } else {
        this.selector.disable()
      }
    },

    /**
     * Generate tasks from task options.
     */
    loadTasks () {
      const previousTask = this.currentTask
      this.tasks = this.taskOpts.map(function (opts) {
        return new Task(opts)
      })
      if (!previousTask && this.tasks.length > 0) {
        this.setCurrentTask(this.tasks[0])
      }
    }
  },

  watch: {
    currentTask: {
      handler: function (oldVal, newVal) {
        // Update the task image if it has changed
        if (!oldVal || !newVal || oldVal.imgInfoUri !== newVal.imgInfoUri) {
          this.viewer.open({
            tileSource: this.currentTask.imgInfoUri,
            success: () => {
              this.drawSelectionOverlays(this.currentTask)
            }
          })
        } else {
          this.drawSelectionOverlays(this.currentTask)
        }
      },
      deep: true
    },
    taskOpts: {
      handler: function () {
        this.loadTasks()
      },
      deep: true
    }
  },

  mounted () {
    // Initialise the main viewer after the DOM is loaded
    this.viewer = new OpenSeadragon.Viewer(this.viewerOpts)

    this.loadTasks()
    this.setupHandlers()
    this.highlightRegion()
  }
}
</script>

<style lang="scss">
@import '~style/settings';
@import '~style/partials/buttons';

#lv-viewer {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  left: 0;
  margin: 0;
  top: 0;
}

#lv-viewer-wrapper {
  display: flex;
  flex-direction: row;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #000;
}

#lv-viewer-container {
  flex: 1 1 auto;
}

#lv-browse-next,
#lv-browse-previous {
  margin: 1rem;
  height: 3rem;
  width: 3rem;
  position: absolute !important;
  top: calc(50% - 2rem);
}

#lv-browse-previous {
  left: 0;

  svg {
    margin-right: 2px;
  }
}

#lv-browse-next {
  right: 0;

  svg {
    margin-left: 2px;
  }
}

.openseadragon-container {
  height: 100vh;

  .openseadragon-message {
    color: #FFF;
  }

  .selection-box {
    transform: none !important;  /** Disable rotation */
    z-index: 1;
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
