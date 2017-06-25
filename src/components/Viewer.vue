<template>
  <div id="project-content" class="d-flex flex-column h-100">
    <div class="viewer-container">
      <div ref="viewer" class="h-100"></div>
    </div>
  </div>
</template>

<script>
import OpenSeadragon from 'openseadragon'
import 'openseadragonselection/dist/openseadragonselection'

export default {
  data: function () {
    return {
      viewer: OpenSeadragon(this.normalizedViewerOpts)
    }
  },

  props: {
    viewerOpts: {
      type: Object,
      default: {}
    }
  },

  computed: {
    normalizedViewerOpts () {
      const defaultOpts = {
        element: this.$refs.viewer,
        prefixUrl: '@/assets/openseadragon/images',
        showNavigator: false,
        navigatorPosition: 'BOTTOM_LEFT',
        zoomInButton: 'zoom-in',
        zoomOutButton: 'zoom-out',
        homeButton: 'reset-zoom',
        helpButton: 'show-help-modal',
        infoButton: 'show-info-modal',
        fullPageButton: 'fullscreen',
        autoHideControls: false,
        gestureSettingsMouse: {
          clickToZoom: false
        },
        gestureSettingsTouch: {
          dblClickToZoom: false
        },
        gestureSettingsPen: {
          dblClickToZoom: false
        },
        selectionEnabled: false,
        selectionConfig: {
          prefixUrl: '@/assets/openseadragon/images',
          restrictToImage: true,
          toggleButton: 'toggle-selection',
          keyboardShortcut: null,
          returnPixelCoordinates: false
        },
        confirmBeforeLeaving: true,
        taskInputConfig: {
          title: 'Task',
          answerButtonText: 'Done',
          showProgress: true,
          showFavourites: true,
          showTutorial: false,
          showComments: true,
          showPreview: true
        }
      }
      return Object.assign(defaultOpts, this.viewerOpts)
    }
  }
}
</script>

<style lang="scss">

.viewer-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #000000;
}

.openseadragon-container {

  &.viewer-loading-icon {
    background: url('/static/svg/loading.svg') 50% 50% no-repeat !important;
  }

  .navbar {
    background-color: rgba(0, 0, 0, 0.75);
  }

  .openseadragon-message {
    color: #FFFFFF;
  }

  .viewer-controls {
    display: flex;
    flex-direction: row;
    top: 70px;
    margin: 0.8rem;
    position: absolute;
    z-index: 2;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 0 0.5rem;

    @media screen and (min-width: 992px) {
      padding: 0;
      flex-direction: column;
    }

    button {
      background: none;
      color: #FFFFFF;
      opacity: 0.8;
      text-shadow: 0 0 5px #000000;
      font-size: 1.25rem;
      padding: .5rem;
      cursor: pointer;
      border: none;
      outline: none !important;
      opacity: 0.65;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }
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
  }

  .selection-overlay {
    border: 2px solid #3498DB;
    background-color: rgba(#3498DB, 0.2);
    opacity: .6;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }

  .highlight-overlay {
    -webkit-box-shadow: 0 0 10px #2ECC71;
    box-shadow: 0 0 10px 3px #2ECC71;
    outline: 1px solid #2ECC71;
  }
}

</style>
