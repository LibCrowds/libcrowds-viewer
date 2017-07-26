<template>
  <div ref="controls" class="lv-controls">

      <button
        :id="b.id"
        v-for="b in buttons"
        :key="b.id"
        :class="`hint--${hintPosition} hint--no-animate btn btn-control`"
        :aria-label="b.tooltip"
        @click="handleClick(b.click)">
        <icon :name="b.icon" :scale="scale"></icon>
      </button>

  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
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
import 'vue-awesome/icons/thumbs-up'
import 'vue-awesome/icons/share-alt'

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
    scale: {
      type: [String, Number],
      default: 1.25
    },
    position: {
      type: String,
      default: 'bottom'
    },
    hintPosition: {
      type: String,
      default: 'bottom'
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
    this.$refs.controls.classList.add(this.position)
  }
}
</script>

<style lang="scss" scoped>
@import '~hint.css';
@import '~style/partials/buttons';

.lv-controls {
  display: flex;
  margin: 1rem;
  position: absolute;
  z-index: 2;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 0 0.5rem;

  @media screen and (min-width: 992px) {
    padding: 0;
  }

  &.bottom {
    bottom: 0;
  }

  &.top {
    top: 0;
  }
}
</style>
