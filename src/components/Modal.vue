<template>
  <transition name="modal">
    <div class="modal" v-show="show">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <h3>{{ title }}</h3>
                  <span class="close" @click="hide">&times;</span>
                </slot>
              </div>

              <div class="modal-body">
                <slot>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="btn" @click="hide">
                    OK
                  </button>
                </slot>
              </div>

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
    }
  }
}
</script>

<style lang="scss">
@import '~style/settings';
@import '~style/partials/buttons';

.modal {
  position: absolute;
  height: 100%;
  width: 100%;

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    color: #fff;
    background-color: $gray-dark;
    margin-top: 2em;
    max-height: calc(100vh - 4em);
    width: auto;
    margin: 0px auto;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    border: 1px solid $gray-light;
    transition: all .3s ease;

    @media screen and (min-width: 576px) {
      max-width: 500px;
      margin: 30px auto;
    }

    @media screen and (min-width: 992px) {
      max-width: 800px;
    }
  }

  .modal-header {
    margin-top: 0;
    padding: 20px 30px;
    border-bottom: 1px solid $gray-light;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
    }

    .close {
      padding: 0;
      cursor: pointer;
      background: 0 0;
      border: 0;
      -webkit-appearance: none;
      float: right;
      font-size: $font-size-lg;
      font-weight: 200;
      line-height: 1;
    }
  }

  .modal-body {
    padding: 20px 30px;
    overflow: auto;
  }

  .modal-footer {
    margin-top: 0;
    padding: 20px 30px;
    border-top: 1px solid $gray-light;
    flex-direction: row;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: translateY(-10px) scale(0.9);
}
</style>
