<template>
  <div class="overlay" ref="overlay">

  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },

  props: {
    viewer: {
      type: Object,
      required: true
    },
    rect: {
      type: Object,
      required: true
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

  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/settings';

.overlay {
  border: 2px solid #3498DB;
  background-color: rgba(#3498DB, 0.2);
  opacity: .6;

  &:hover,
  &:focus {
    opacity: 1;
  }
}
</style>
