<template>
  <button
    :id="id"
    :class="`hint--${hintPosition} hint--no-animate lv-btn lv-btn-control`"
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
    },
    id: String
  }
}
</script>
