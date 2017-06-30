<template>
  <div 
    :class="classObj"
    ref="overlay" 
    @click="handleClick">
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
    selection: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    const el = this.$refs.overlay
    this.viewer.addOverlay({
      element: el,
      location: new OpenSeadragon.Rect(this.rect.x, this.rect.y, 
                                       this.rect.width, this.rect.height)
    })
  },

  computed: {
    classObj () {
      return {
        overlay: true,
        selection: this.selection
      }
    }
  },

  methods: {
    handleClick () {
      this.$refs.overlay
      if (this.selection) {
        this.viewer.removeOverlay()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/settings';

.overlay {
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
