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
    console.log(el)
    this.viewer.addOverlay({
      element: el,
      location: OpenSeadragon.Rect(this.rect.x, this.rect.y, this.rect.width,
                                   this.rect.height)
    })
  },

  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/settings';
.selection-overlay {
  border: 2px solid #3498DB;
  background-color: rgba(#3498DB, 0.2);
  opacity: .6;

  &:hover,
  &:focus {
    opacity: 1;
  }
}

.highlight-overlay {
  -webkit-box-shadow: 0 0 10px #2ECC71;
  box-shadow: 0 0 10px 3px #2ECC71;
  outline: 1px solid #2ECC71;
}
</style>
