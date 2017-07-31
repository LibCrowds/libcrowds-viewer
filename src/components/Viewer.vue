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
          :showBrowse="showBrowse"
          :showLike="showLike"
          :showShare="showShare"
          :helpButton="viewerOpts.helpButton"
          :infoButton="viewerOpts.infoButton"
          @helpclicked="showHelpModal = true"
          @infoclicked="showInfoModal = true"
          @browseclicked="showBrowseModal = true"
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
          :show="showInfoModal"
          @hide="showInfoModal = false"
          :lang="lang">
        </metadata-modal>

        <help-modal
          v-if="currentTask && showHelp"
          :showInfo="showInfo"
          :showLike="showLike"
          :showShare="showShare"
          :show="showHelpModal"
          :disableComplete="disableComplete"
          @hide="showHelpModal = false"
          :task="currentTask">
        </help-modal>

        <browse-modal
          v-if="showBrowse"
          :tasks="tasks"
          :show="showBrowseModal"
          @hide="showBrowseModal = false"
          @taskclick="setCurrentTask">
        </browse-modal>

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
      :commentAnnotation="commentAnnotation"
      :disableComplete="disableComplete"
      @noteupdated="updateNote"
      @submit="submitTask">

      <select-sidebar-item
        v-if="currentTask.mode === 'select'"
        :task="currentTask"
        :tags="tags"
        @edit="editTag"
        @delete="deleteTag">
      </select-sidebar-item>

      <transcribe-sidebar-item
        v-if="currentTask.mode === 'transcribe'"
        :task="currentTask"
        @update="updateForm"
        @inputfocus="onTranscribeInputFocus"
        @inputblur="onTranscribeInputBlur">
      </transcribe-sidebar-item>
    </sidebar>

    <selector
      v-if="currentTask && currentTask.mode === 'select'"
      :viewer="viewer"
      :task="currentTask"
      :selectionRect="selectionRect"
      @selection="handleSelection">
    </selector>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import OpenSeadragon from 'openseadragon'
import MetadataModal from '@/components/modals/Metadata'
import HelpModal from '@/components/modals/Help'
import BrowseModal from '@/components/modals/Browse'
import ViewerControls from '@/components/controls/Viewer'
import PanControls from '@/components/controls/Pan'
import Sidebar from '@/components/sidebar/Sidebar'
import SelectSidebarItem from '@/components/sidebar/items/Select'
import TranscribeSidebarItem from '@/components/sidebar/items/Transcribe'
import Selector from '@/components/Selector'
import Task from '@/model/Task'
import Annotator from '@/model/Annotator'
import extractRectFromImageUri from '@/utils/extractRectFromImageUri'
import toggleFullScreen from '@/utils/toggleFullScreen'
import drawOverlay from '@/utils/drawOverlay'
import deleteOverlay from '@/utils/deleteOverlay'

export default {
  data: function () {
    return {
      viewer: {},
      selectionRect: {},
      annotator: new Annotator({
        creator: this.creator,
        generator: this.generator
      }),
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
      showInfoModal: false,
      showHelpModal: false,
      showBrowseModal: false,
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
    showBrowse: {
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
    },
    nextOnSubmit: {
      type: Boolean,
      default: true
    }
  },

  components: {
    MetadataModal,
    HelpModal,
    BrowseModal,
    ViewerControls,
    PanControls,
    Sidebar,
    Selector,
    SelectSidebarItem,
    TranscribeSidebarItem,
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
    },
    tags: function () {
      return this.annotator.getSelectAnnotations(this.currentTask)
    },
    commentAnnotation: function () {
      return this.annotator.getCommentAnnotation(this.currentTask)
    }
  },

  methods: {
    /**
     * Emit the taskliked event.
     */
    emitTaskLiked (task, status) {
      task.liked = status
      this.$emit('taskliked', task)
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
     * @param {Task} task
     *   The task.
     * @param {Object} rect
     *   The viewport rectangle.
     */
    handleSelection (task, rect) {
      const vp = this.viewer.viewport
      const imgRect = vp.viewportToImageRectangle(rect)
      const anno = this.annotator.createSelectAnnotation(task, imgRect)
      this.drawSelectionOverlay(task, anno)
      this.$emit('create', task, anno)
    },

    /**
     * Draw a selection overlays from an annotation.
     * @param {Task} task
     *   The Task.
     * @param {Annotation} annotation
     *   The Annotation.
     */
    drawSelectionOverlay (task, anno) {
      const vp = this.viewer.viewport
      const imgRect = extractRectFromImageUri(anno.target.selector.value)
      const vpRect = vp.imageToViewportRectangle(imgRect)
      const overlay = drawOverlay(this.viewer, anno.id, vpRect, 'selection')
      overlay.addEventListener('click', (evt) => {
        this.editTag(task, anno.id)
      })
    },

    /**
     * Draw a highlight.
     * @param {Object} rect
     *   The image rectangle.
     * @param {String} id
     *   Ah ID for the highlight element.
     */
    drawHighlight (rect, id) {
      const vp = this.viewer.viewport
      const imgRect = new OpenSeadragon.Rect(
        rect.x,
        rect.y,
        rect.width,
        rect.height
      )
      const vpRect = vp.imageToViewportRectangle(imgRect)
      drawOverlay(this.viewer, id, vpRect, 'highlight')
    },

    /**
     * Draw all highlights for the task.
     * @param {Task} task.
     *   The task.
     */
    drawHighlights (task) {
      for (let [index, rect] of task.highlights.entries()) {
        this.drawHighlight(rect, `highlight-${index}`)
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
     * Go to the previous task.
     */
    previousTask () {
      const index = this.tasks.indexOf(this.currentTask)
      if (index > 0) {
        this.currentTask = this.tasks[index - 1]
      }
    },

    /**
     * Go to the next task.
     */
    nextTask () {
      const index = this.tasks.indexOf(this.currentTask)
      if (index + 1 < this.tasks.length) {
        this.currentTask = this.tasks[index + 1]
      }
    },

    /**
     * Update the note and emit the relevant event.
     * @param {Task} task.
     *   The task.
     * @param {String} text.
     *   The text.
     */
    updateNote (task, text) {
      const now = new Date().toISOString()
      const anno = this.annotator.storeCommentAnnotation(
        task,
        text
      )
      if (anno.created > now) {
        this.$emit('create', task, anno)
      } else {
        this.$emit('update', task, anno)
      }
    },

    /**
     * Update a form and associated annotations.
     * @param {Task} task.
     *   The task.
     * @param {Object} form
     *   The updated form.
     */
    updateForm (task, form) {
      task.updateForm(form)
      for (let key in form.model) {
        const now = new Date().toISOString()
        const anno = this.annotator.storeTranscriptionAnnotation(
          task,
          key,
          form.model[key]
        )
        if (anno.created > now) {
          this.$emit('create', task, anno)
        } else {
          this.$emit('update', task, anno)
        }
      }
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

      if (this.nextOnSubmit) {
        this.nextTask()
      }
      this.$emit('submit', task)
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
      const anno = this.annotator.getAnnotation(task, id)
      const imgRect = extractRectFromImageUri(anno.target.selector.value)
      const vpRect = vp.imageToViewportRectangle(imgRect)
      const rect = new OpenSeadragon.Rect(
        vpRect.x,
        vpRect.y,
        vpRect.width,
        vpRect.height
      )
      this.selectionRect = rect
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
      const anno = this.annotator.getAnnotation(task, id)
      this.annotator.deleteAnnotation(task, id)
      deleteOverlay(this.viewer, id)
      this.$emit('delete', task, anno)
    },

    /**
     * Highlight any regions when transcribe form input focused.
     * @param {Task} task
     *   The task that the tag belongs to.
     * @param {String} modelKey
     *   The form model key.
     */
    onTranscribeInputFocus (task, modelKey) {
      if (modelKey in task.form.highlights) {
        const rect = task.form.highlights[modelKey]
        this.drawHighlight(rect, `highlight-${modelKey}`)
      }
    },

    /**
     * Remove all form region highlights when transcribe form input blured.
     */
    onTranscribeInputBlur (task, modelKey) {
      for (modelKey in task.form.highlights) {
        deleteOverlay(this.viewer, `highlight-${modelKey}`)
      }
    },

    /**
     * Mode specific configuration for a task.
     * @param {Task} task
     *   The task.
     */
    configureMode (task) {
      if (task.mode === 'select' && !(task.complete && this.disableComplete)) {
        // Draw all selection overlays
        const annos = this.annotator.getSelectAnnotations(task)
        for (let anno of annos) {
          this.drawSelectionOverlay(task, anno)
        }
      }
      this.drawHighlights(task)
    },

    /**
     * Generate tasks from task options.
     */
    loadTasks () {
      const taskOptsCopy = JSON.parse(JSON.stringify(this.taskOpts))
      let firstTask = true
      this.tasks = []
      for (let opts of taskOptsCopy) {
        fetch(opts.imgInfoUri, {
          method: 'get'
        }).then((response) => {
          return response.json()
        }).then((json) => {
          opts.imgInfo = json
          this.tasks.push(new Task(opts))
          if (firstTask) {
            this.setCurrentTask(this.tasks[0])
            firstTask = false
          }
        }).catch(function (err) {
          throw Error(`Could not retrieve image info: ${err}`)
        })
      }
    },

    /**
     * Check for any unsaved annotations.
     */
    onBeforeUnload () {
      const nAnnos = this.currentTask.annotations.length
      const complete = this.currentTask.complete
      if (this.confirmBeforeUnload && !complete && nAnnos > 0) {
        return 'Unsaved changes will be lost.'
      }
    }
  },

  watch: {
    currentTask: {
      handler: function (oldVal, newVal) {
        // Update the task image if it has changed
        if (!oldVal || !newVal || oldVal.imgInfoUri !== newVal.imgInfoUri) {
          this.viewer.close()
          this.viewer.open({
            tileSource: this.currentTask.imgInfoUri,
            success: () => this.configureMode(this.currentTask)
          })
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
    this.viewer = new OpenSeadragon.Viewer(this.viewerOpts)
    this.loadTasks()
    window.addEventListener('beforeunload', this.onBeforeUnload)
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.onBeforeUnload)
  }
}
</script>

<style lang="scss">
@import '~style/settings';
@import '~style/partials/buttons';

#lv-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  left: 0;
  margin: 0;
  top: 0;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
}

#lv-viewer-wrapper {
  display: flex;
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
  height: 100%;

  .openseadragon-message {
    color: #FFF;
  }
}
</style>
