<template>
  <div id="lv-viewer" ref="container">

    <div id="lv-viewer-wrapper">

      <div id="hud" ref="hud">
        <toolbar-controls
          v-if="currentTask"
          :task="currentTask"
          :viewer="viewer"
          :buttons="mergedToolbarButtons"
          :showNavigation="navigation.length > 0"
          :helpButton="viewerOpts.helpButton"
          :infoButton="viewerOpts.infoButton"
          @helpclicked="showHelpModal = true"
          @infoclicked="showInfoModal = true"
          @browseclicked="showBrowseModal = true"
          @likeclicked="emitTaskLiked"
          @fullscreenclicked="toggleFullScreen"
          @navigationclicked="showNavigationSidebar = !showNavigationSidebar">
        </toolbar-controls>

        <pan-controls
          :viewer="viewer"
          :panBy="panBy">
        </pan-controls>

        <zoom-controls
          :viewer="viewer"
          :zoomBy="zoomBy">
        </zoom-controls>

        <metadata-modal
          v-if="currentTask"
          :task="currentTask"
          :show="showInfoModal"
          @hide="showInfoModal = false"
          :lang="lang">
        </metadata-modal>

        <help-modal
          v-if="currentTask && mergedToolbarButtons.help"
          :buttons="mergedToolbarButtons"
          :show="showHelpModal"
          :disableComplete="disableComplete"
          @hide="showHelpModal = false"
          :task="currentTask">
        </help-modal>

        <browse-modal
          v-if="mergedToolbarButtons.browse"
          :tasks="tasks"
          :show="showBrowseModal"
          :disableComplete="disableComplete"
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

      <transition name="fade">
        <div id="viewer-disabled-overlay" v-if="viewerDisabled"></div>
      </transition>

    </div>

    <task-sidebar
      v-if="currentTask"
      :task="currentTask"
      :showNote="showNote"
      :commentAnnotation="commentAnnotation"
      :disableComplete="disableComplete"
      :confirmOnSubmit="confirmOnSubmit"
      @noteupdated="updateNote"
      @submit="submitTask"
      @disableviewer="viewerDisabled = true"
      @enableviewer="viewerDisabled = false">

      <select-sidebar-item
        v-if="taskLoaded && currentTask.mode === 'select'"
        :task="currentTask"
        :tags="tags"
        :disableComplete="disableComplete"
        :viewer="viewer"
        @edit="editTag"
        @delete="deleteTag">
      </select-sidebar-item>

      <transcribe-sidebar-item
        v-if="currentTask.mode === 'transcribe'"
        :task="currentTask"
        :disableComplete="disableComplete"
        @update="updateForm"
        @submit="submitTask"
        @inputfocus="onTranscribeInputFocus"
        @inputblur="onTranscribeInputBlur">
      </transcribe-sidebar-item>
    </task-sidebar>

    <selector
      v-if="selectorEnabled"
      :viewer="viewer"
      :task="currentTask"
      :selectionRect="selectionRect"
      @selection="handleSelection">
    </selector>

    <navigation-sidebar
      v-if="navigation.length"
      :show="showNavigationSidebar"
      :navigation="navigation"
      @hide="showNavigationSidebar = false">
    </navigation-sidebar>

  </div>
</template>

<script>
import Notyf from 'notyf'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import OpenSeadragon from 'openseadragon'
import MetadataModal from '@/components/modals/Metadata'
import HelpModal from '@/components/modals/Help'
import BrowseModal from '@/components/modals/Browse'
import ToolbarControls from '@/components/controls/Toolbar'
import PanControls from '@/components/controls/Pan'
import ZoomControls from '@/components/controls/Zoom'
import TaskSidebar from '@/components/sidebars/Task'
import NavigationSidebar from '@/components/sidebars/Navigation'
import SelectSidebarItem from '@/components/sidebars/items/Select'
import TranscribeSidebarItem from '@/components/sidebars/items/Transcribe'
import Selector from '@/components/Selector'
import Task from '@/model/Task'
import Annotator from '@/model/Annotator'
import getRectFromFragment from '@/utils/getRectFromFragment'
import toggleFullScreen from '@/utils/toggleFullScreen'
import drawOverlay from '@/utils/drawOverlay'
import deleteOverlay from '@/utils/deleteOverlay'

export default {
  data: function () {
    return {
      viewer: {},
      selectionRect: {},
      notyf: new Notyf(),
      annotator: new Annotator({
        creator: this.creator,
        generator: this.generator
      }),
      viewerOpts: {
        id: 'lv-viewer-container',
        crossOriginPolicy: 'Anonymous',
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
      defaultToolbarButtons: {
        fullscreen: true,
        help: true,
        info: true,
        browse: true,
        like: true,
        share: true,
        download: true
      },
      showInfoModal: false,
      showHelpModal: false,
      showBrowseModal: false,
      showNavigationSidebar: false,
      viewerDisabled: false,
      tasks: [],
      currentTask: null,
      taskLoaded: false
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
    showRelatedTasks: {
      type: Boolean,
      default: false
    },
    nextOnSubmit: {
      type: Boolean,
      default: true
    },
    messageBus: {
      type: Object,
      default: null
    },
    navigation: {
      type: Array,
      default: []
    },
    confirmOnSubmit: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Object,
      default: () => ({}) // Defaults set in defaultToolbarButtons
    }
  },

  components: {
    MetadataModal,
    HelpModal,
    BrowseModal,
    ToolbarControls,
    PanControls,
    ZoomControls,
    TaskSidebar,
    NavigationSidebar,
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
    },
    selectorEnabled: function () {
      return (
        this.currentTask &&
        this.currentTask.mode === 'select' &&
        (!this.currentTask.complete || !this.disableComplete)
      )
    },
    mergedToolbarButtons: function () {
      let mergedButtons = JSON.parse(JSON.stringify(this.defaultToolbarButtons))
      for (let key in mergedButtons) {
        if (this.buttons.hasOwnProperty(key)) {
          mergedButtons[key] = this.buttons[key]
        }
      }
      return mergedButtons
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
      const imgRect = getRectFromFragment(anno.target.selector.value)
      const vpRect = vp.imageToViewportRectangle(imgRect)
      const overlay = drawOverlay(this.viewer, anno.id, vpRect, 'selection')
      overlay.addEventListener('click', (evt) => {
        if (!task.complete || !this.disableComplete) {
          this.editTag(task, anno.id)
        }
      })
    },

    /**
     * Draw a highlight.
     * @param {Object} rect
     *   The image rectangle.
     * @param {String} id
     *   A ID for the highlight element.
     * @param {String} overlayCls
     *   Additional overlay class.
     * @param {Function} onClick
     *   A callback to trigger on click (or tap).
     */
    drawHighlight (rect, id, overlayCls = 'highlight', onClick = null) {
      const vp = this.viewer.viewport
      const imgRect = new OpenSeadragon.Rect(
        rect.x,
        rect.y,
        rect.width,
        rect.height
      )
      const vpRect = vp.imageToViewportRectangle(imgRect)
      drawOverlay(this.viewer, id, vpRect, overlayCls, onClick)
    },

    /**
     * Draw all highlights for the task.
     * @param {Task} task
     *   The task.
     */
    drawHighlights (task) {
      for (let i = 0; i < task.highlights.length; i++) {
        this.drawHighlight(task.highlights[i], `highlight-${i}`)
      }
    },

    /**
     * Draw all highlights for a task, where clicking moves to that task.
     * @param {Task} task
     *   The task.
     */
    drawRelatedTaskHighlights (task) {
      for (let i = 0; i < task.highlights.length; i++) {
        // Check the highlight wasn't already drawn (e.g. on initial load)
        let taskIndex = this.tasks.indexOf(task)
        let highlightId = `related-t${taskIndex}-h${i}`
        if (document.querySelector(`[data-id="${highlightId}"]`)) {
          continue
        }

        this.drawHighlight(
          task.highlights[i],
          highlightId,
          'related',
          () => { this.setCurrentTask(task) }
        )
      }
    },

    /**
     * Set the current task.
     * @param {Task} task.
     *   The task.
     */
    setCurrentTask (task) {
      this.$emit('taskchange', this.currentTask, task)
      this.currentTask = task
      if (this.showRelatedTasks) {
        this.showAllRelatedTasks(task)
      }
    },

    /**
     * Show all related tasks.
     * @param {Task} task.
     *   The task.
     */
    showAllRelatedTasks (task) {
      const relatedTasks = this.getRelatedTasks(task)
      for (let relatedTask of relatedTasks) {
        this.drawRelatedTaskHighlights(relatedTask)
      }
    },

    /**
     * Get all related tasks.
     * @param {Task} task.
     *   The task.
     */
    getRelatedTasks (task) {
      return this.tasks.filter((otherTask) => {
        const otherSourceStr = JSON.stringify(otherTask.tileSource)
        return (
          otherTask !== task &&
          otherTask !== undefined &&
          otherSourceStr === JSON.stringify(task.tileSource)
        )
      })
    },

    /**
     * Go to the previous task.
     */
    previousTask () {
      const index = this.tasks.indexOf(this.currentTask)
      if (index > 0) {
        this.setCurrentTask(this.tasks[index - 1])
      }
    },

    /**
     * Go to the next task.
     */
    nextTask () {
      const index = this.tasks.indexOf(this.currentTask)
      if (index + 1 < this.tasks.length) {
        this.setCurrentTask(this.tasks[index + 1])
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
      return anno
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
      const imgRect = getRectFromFragment(anno.target.selector.value)
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
     * @param {Task} task
     *   The task that the tag belongs to.
     * @param {String} modelKey
     *   The form model key.
     */
    onTranscribeInputBlur (task, modelKey) {
      for (modelKey in task.form.highlights) {
        deleteOverlay(this.viewer, `highlight-${modelKey}`)
      }
    },

    /**
     * Setup the message bus.
     */
    setupMessageBus () {
      this.messageBus.$on('success', text => {
        this.notyf.confirm(text)
      })
      this.messageBus.$on('alert', text => {
        this.notyf.alert(text)
      })
    },

    /**
     * Mode specific configuration for select tasks.
     * @param {Task} task
     *   The task.
     */
    configureSelectMode (task) {
      if (task.mode === 'select') {
        // Draw all selection overlays
        const annos = this.annotator.getSelectAnnotations(task)
        for (let anno of annos) {
          this.drawSelectionOverlay(task, anno)
        }
      }
    },

    /**
     * Generate tasks from task options.
     */
    generateTasks () {
      this.tasks = this.taskOpts.map(opts => {
        return new Task(opts)
      })
    },

    /**
     * Load a task and configure the view accordingly.
     * @param {Task} task
     *   The task.
     */
    loadTask (task) {
      if (task.mode === 'select') {
        this.configureSelectMode(task)
      }
      this.drawHighlights(task)
      if (this.showRelatedTasks) {
        this.showAllRelatedTasks(task)
      }
    },

    /**
     * Check for any unsaved annotations.
     * @param {Object} evt
     *   The event.
     */
    onBeforeUnload (evt) {
      const msg = 'Unsaved changes will be lost.'
      let unsavedTasks = this.tasks.filter((task) => {
        return task.annotations.length > 0 && !task.complete
      })
      if (this.confirmBeforeUnload && unsavedTasks.length > 0) {
        evt.returnValue = msg
        return msg
      }
    }
  },

  watch: {
    currentTask: function (newTask, oldTask) {
      this.taskLoaded = false
      if (
        oldTask &&
        JSON.stringify(oldTask.tileSource) ===
        JSON.stringify(newTask.tileSource)
      ) {
        this.viewer.clearOverlays()
        this.loadTask(newTask)
        this.taskLoaded = true
      } else {
        this.viewer.close()
        this.viewer.open({
          tileSource: newTask.tileSource,
          success: (evt) => {
            this.loadTask(newTask)
            // Set the task loaded flag after the tile has been fully loaded.
            // This helps with things such as the selection preview canvases
            // being drawn using the correct image (rather than the one that has
            // just been removed).
            evt.item.addHandler('fully-loaded-change', () => {
              this.taskLoaded = true
            })
          }
        })
      }
    },
    taskOpts: {
      handler: function () {
        this.generateTasks()
        if (this.tasks.length) {
          this.setCurrentTask(this.tasks[0])
        } else {
          console.warn('No tasks loaded')
        }
      },
      deep: true
    }
  },

  mounted () {
    this.viewer = new OpenSeadragon.Viewer(this.viewerOpts)
    this.generateTasks()
    if (this.tasks.length) {
      this.setCurrentTask(this.tasks[0])
    } else {
      console.warn('No tasks loaded')
    }
    this.setupMessageBus()
    window.addEventListener('beforeunload', this.onBeforeUnload)
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.onBeforeUnload)
  }
}
</script>

<style lang="scss">
@import '~notyf/src/notyf.scss';
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

#viewer-disabled-overlay {
  z-index: 100;
  width: 100%;
  background: rgba(0,0,0,0.5);
  position: absolute;
  height: 100%;
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

.notyf {
  @media screen and (min-width: 768px) {
    right: 350px;
  }

  // Remove if a small screen fix is added to notyf
  @media screen and (max-width: 766px) {
    bottom: auto;
    top: 0;
    left: calc(50vw - 200px);
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 400ms ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
