<template>
  <div id="lc-controls">

    <button
      :id="viewerOpts.zoomInButton"
      data-toggle="tooltip"
      title="Zoom in">
      <icon name="plus-circle"></icon>
    </button>

    <button
      :id="viewerOpts.zoomOutButton"
      data-toggle="tooltip"
      title="Zoom out">
      <icon name="minus-circle"></icon>
    </button>

    <button
      :id="viewerOpts.homeButton"
      data-toggle="tooltip"
      title="Reset zoom">
      <icon name="refresh"></icon>
    </button>

    <button
      :id="viewerOpts.fullPageButton"
      data-toggle="tooltip"
      title="Fullscreen">
      <icon name="expand"></icon>
    </button>

    <button
      :id="viewerOpts.helpButton"
      data-toggle="tooltip"
      title="Help"
      @click="showHelpModal">
      <icon name="question-circle"></icon>
    </button>

    <button
      :id="viewerOpts.infoButton"
      data-toggle="tooltip"
      title="Details"
      @click="showMetadataModal">
      <icon name="info-circle"></icon>
    </button>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/minus-circle'
import 'vue-awesome/icons/refresh'
import 'vue-awesome/icons/expand'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/info-circle'
import axios from 'axios'
import Modal from './Modal.vue'

export default {
  data: function () {
    return {
      manifestData: {}
    }
  },

  props: {
    viewerOpts: {
      type: Object,
      required: true
    },
    metadataModalId: {
      type: String,
      required: true
    }
  },

  components: {
    Icon
  },

  methods: {
    showMetadataModal () {
      this.$root.$emit('show::modal', this.metadataModalId)
    },
    showHelpModal () {
      this.$root.$emit('show::modal', this.viewerOpts.helpButton)
    }
  }
}
</script>

<style lang="scss" scoped>
#lc-controls {
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
</style>
