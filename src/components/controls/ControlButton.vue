<template>
  <button
    :class="`hint--${hintPosition} hint--no-animate btn btn-control`"
    :aria-label="tooltip"
    @click="callback($event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    hintPosition: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~hint.css';
@import '~style/settings';
@import '~style/partials/buttons';

button {
  .active {
    color: $blue;
  }
}
</style>
