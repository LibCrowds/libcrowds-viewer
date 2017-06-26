<template>
  <div id="lc-controls">

      <button
        :id="b.id"
        v-for="b in buttons"
        class="hint--right hint--no-animate"
        :aria-label="b.tooltip"
        @click="handleClick(b.click)">
        <icon :name="b.icon"></icon>
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
    buttons: {
      type: Array,
      required: true
    }
  },

  components: {
    Icon
  },

  methods: {
    handleClick (func) {
      if (typeof func !== 'undefined') {
        func()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~hint.css';

#lc-controls {
  display: flex;
  flex-direction: row;
  margin: 1rem;
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
    padding: .75rem;
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
