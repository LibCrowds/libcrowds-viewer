<template>
 <div
   :class="cls"
   ref="overlay">
  </div>
</template>

<script>
export default {
  props: {
    viewer: {
      type: Object,
      required: true
    },
    rect: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: null
    }
  },

  computed: {
    cls: function () {
      const type = this.type ? this.type : ''
      return `overlay ${type}`
    }
  },

  mounted () {
    const el = this.$refs.overlay
    this.viewer.addOverlay({
      element: el,
      location: new OpenSeadragon.Rect(this.rect.x, this.rect.y, 
                                       this.rect.width, this.rect.height)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/settings';

.overlay {
  z-index: 100;

  &.selection {
    border: 2px solid #3498DB;
    background-color: rgba(#3498DB, 0.2);
    opacity: .6;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
}
</style>
