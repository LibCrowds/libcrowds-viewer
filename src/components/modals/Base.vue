<template>
  <transition name="lv-modal-fade">
    <div class="lv-modal" v-show="value">
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
                  <button class="lv-btn lv-btn-white-inverse" @click="hide">
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
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },

  methods: {
    /**
     * Emit the input event with false to hide the modal.
     */
    hide () {
      this.$emit('input', false)
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
    if (typeof document !== 'undefined') {
      document.addEventListener('keyup', this.onKeyUp)
    }
  },

  beforeDestroy () {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keyup', this.onKeyUp)
    }
  }
}
</script>
