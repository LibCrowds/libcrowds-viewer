<template>
  <div id="lc-controls">
  
    <button 
      :id="viewerOpts.zoomOutButton" 
      data-toggle="tooltip" 
      title="Zoom out"
      @click="controlClicked">
      -
    </button>
    
    <button 
      :id="viewerOpts.homeButton" 
      data-toggle="tooltip" 
      title="Reset zoom"
      @click="controlClicked">
      0
    </button>
    
    <button
      :id="viewerOpts.fullPageButton"
      data-toggle="tooltip"
      title="Fullscreen"
      @click="controlClicked">
      X
    </button>
    
    <button 
      :id="viewerOpts.zoomInButton" 
      data-toggle="tooltip" 
      title="Zoom in"
      @click="controlClicked">
      +
    </button>
    
    <button 
      :id="viewerOpts.helpButton" 
      data-toggle="tooltip" 
      title="Help"
      @click="controlClicked">
      ?
    </button>
    
    <button 
      :id="viewerOpts.infoButton"
      data-toggle="tooltip"
      title="Details"
      @click="controlClicked">
      i
    </button>
    
    
  </div>
</template>

<script>
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
    }
  },
  
  methods: {
    controlClicked (evt) {
      this.$emit('controlClick', evt.target.id)
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
