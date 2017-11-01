<template>
  <transition name="lv-modal-fade">
    <div class="lv-modal" v-show="show">
        <div class="lv-modal-mask" @click="hide">
          <div class="lv-modal-wrapper">
            <div class="lv-modal-container" @click.stop>

              <header class="lv-modal-header">
                <slot name="header">
                  <h3>{{ title }}</h3>
                  <span class="close" @click="hide">&times;</span>
                </slot>
              </header>

              <div class="lv-modal-body">
                <slot>
                </slot>
              </div>

              <footer class="lv-modal-footer">
                <slot name="footer">
                  <button class="lv-btn" @click="hide">
                    OK
                  </button>
                </slot>
              </footer>

            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: String,
    show: {
      type: Boolean,
      requried: true
    }
  },

  methods: {
    /**
     * Emit the hide event.
     */
    hide () {
      this.$emit('hide')
    },

    /**
     * Hide on esc keyup.
     */
    onKeyUp (evt) {
      const key = evt.keyCode ? evt.keyCode : evt.charCode
      if (key === 27) {
        this.hide()
      }
    }
  },

  mounted () {
    document.addEventListener('keyup', this.onKeyUp)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.onKeyUp)
  }
}
</script>
