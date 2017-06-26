<template>
  <div id="modal-template">
    <transition name="modal" v-if="show">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                <h3>{{ title }}</h3>
                <span class="close" @click="show = false">&times;</span>
              </slot>
            </div>

            <div class="modal-body">
              <slot>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button" @click="show = false">
                  OK
                </button>
              </slot>
            </div>

          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      show: false
    }
  },

  props: {
    title: String
  },

  methods: {
    close () {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/settings';

#modal-template {
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
    color: #fff;
    background-color: $gray-dark;
    margin-top: 2em;
    max-height: 500px;
    width: auto;
    margin: 0px auto;
    overflow: hidden;
    font-size: 14px;
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
      font-size: 1.5rem;
      font-weight: 200;
      line-height: 1;
    }
  }

  .modal-body {
    padding: 20px;
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

  .modal-default-button {
    background-color: transparent;
    border: 1px solid white;
    color: white;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    touch-action: manipulation;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
