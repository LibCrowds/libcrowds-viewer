<template>
  <nav id="lv-navigation-sidebar" :class="navClass">
    <div
      class="lv-sidebar-close"
      @click="hide">
      <icon
        class="close"
        name="times"
        scale="1.5">
      </icon>
    </div>
    <ul>
      <li
        v-for="(item, index) in navigation"
        :key="index">
        <a :href="item.url">{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times'

export default {
  props: {
    navigation: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      requried: false
    }
  },

  components: {
    Icon
  },

  computed: {
    navClass: function () {
      return {
        show: this.show
      }
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

<style lang="scss" scoped>
@import '~style/settings';
@import '~style/partials/buttons';
@import '~style/partials/transitions';

#lv-navigation-sidebar {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 14px;
  height: 100%;
  background-color: rgba(#F7F7F7, 0.98);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 350ms;
  overflow-y: auto;
  flex-shrink: 2;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);

  &.show {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  @media screen and (min-width: 768px) {
    width: 320px;
    flex-shrink: 0;
    margin-top: 8px;
    margin-bottom: 8px;
    height: calc(100% - 16px);
  }

  ul {
    padding: 1rem;
    list-style: none;
    font-family: $font-family-headings;
    font-weight: 600;

    li {
      margin-left: 0;
      position: relative;

      a {
        text-decoration: none;
        color: $gray-dark;
        transition: color 200ms ease;

        &:hover,
        &:focus {
          color: $red;
        }
      }
    }
  }

  .lv-sidebar-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    color: lighten($gray-dark, 20%);
  }
}
</style>
