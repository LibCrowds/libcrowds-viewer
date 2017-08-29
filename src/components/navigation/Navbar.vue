<template>
  <nav id="lv-navbar">
    <div class="lv-navbar-container">
      <div class="lv-navbar-navs" ref="navs">
        <div
          class="lv-navbar-close"
          @click="toggleNavCollapse">
          <icon
            class="close"
            name="times"
            scale="1.5">
          </icon>
        </div>
        <a
          v-for="(item, index) in navigation"
          :key="index"
          :href="item.url">
          {{ item.label }}
        </a>
      </div>
      <button class="lv-navbar-hamburger" @click="toggleNavCollapse">
        <icon name="bars"></icon>
      </button>
    </div>
  </nav>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/times'

export default {
  props: {
    navigation: {
      type: Array,
      required: true
    }
  },

  components: {
    Icon
  },

  methods: {
    /**
     * Toggle the collapsible sidenav.
     */
    toggleNavCollapse () {
      this.$refs.navs.classList.toggle('show')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/settings';

#lv-navbar {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-color: $gray-dark;
  border-bottom: 1px solid #000;

  .lv-navbar-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .lv-navbar-navs {
    display: none;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    font-size: $font-size-sm;
    height: 100%;
    width: 100%;
    background-color: rgba(#F7F7F7, 0.98);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 350ms;
    overflow-y: auto;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    font-family: $font-family-headings;
    font-weight: 600;

    @media screen and (min-width: 768px) {
      display: flex;
      position: relative;
      flex-direction: row;
      transform: none;
      background: transparent;
      font-weight: 400;
      justify-content: flex-start;
      overflow: hidden;
    }

    &.show {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }

    .lv-navbar-close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
      color: lighten($gray-dark, 20%);

      @media screen and (min-width: 768px) {
        display: none;
      }
    }

    a {
      position: relative;
      text-decoration: none;
      color: $gray-dark;
      transition: color 200ms ease;
      padding: 0.5rem;

      &:hover,
      &:focus {
        color: $red;
      }

      @media screen and (min-width: 768px) {
        font-family: $font-family-headings;
        font-size: $font-size-sm;
        float: left;
        display: block;
        color: #fff;
        text-align: center;
        padding: 1.2rem 1rem;
        text-decoration: none;
      }
    }
  }

  .lv-navbar-hamburger {
    display: block;
    margin-left: auto;
    background: none;
    border: none;
    color: #fff;
    display: flex;
    padding: 1.2rem 1rem;

    @media screen and (min-width: 768px) {
      display: none;
    }
  }
}
</style>
