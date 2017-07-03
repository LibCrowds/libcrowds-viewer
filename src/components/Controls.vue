<template>
  <div ref="controls" class="lv-controls">

      <button
        :id="b.id"
        v-for="b in buttons"
        :key="b.id"
        class="hint--right hint--no-animate"
        :aria-label="b.tooltip"
        @click="handleClick(b.click)">
        <icon :name="b.icon" scale="1.25"></icon>
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
import 'vue-awesome/icons/chevron-up'
import 'vue-awesome/icons/chevron-down'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
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
    },
    position: {
      type: String,
      default: 'TOP'
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
  },

  mounted () {
    const pos = this.position.toLowerCase()
    this.$refs.controls.classList.add(pos)
  }
}
</script>

<style lang="scss" scoped>
@import '~hint.css';

.lv-controls {
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

  &.top {
    top: 0;
  }

  &.bottom {
    bottom: 0;
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
