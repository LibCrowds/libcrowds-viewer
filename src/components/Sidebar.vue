<template>
  <div class="lv-sidebar">
    <div class="lv-sidebar-wrapper">
      <div class="lv-sidebar-container">
        <div class="lv-sidebar-header">
          <h4>{{ title }}</h4>
          <span
            :class="toggleClassObj"
            @click="toggleCollapse">
            &#x25B2;
          </span>
        </div>
        <div class="lv-sidebar-content" v-show="!contentCollapsed">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      contentCollapsed: false
    }
  },

  props: {
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    toggleClassObj: function () {
      return {
        toggle: true,
        active: this.contentCollapsed
      }
    }
  },

  methods: {
    toggleCollapse () {
      this.contentCollapsed = !this.contentCollapsed
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/partials/buttons';

.lv-sidebar {
  .lv-sidebar-wrapper {
    position: fixed;
    z-index: 2;
    right: 0;
    width: 35%;
    margin: 0.8rem;
    overflow: hidden;

    @media screen and (min-width: 992px) {
      width: 25%;
    }

    @media screen and (min-width: 992px) {
        width: 25%;
    }
  }

  .lv-sidebar-container {
    color: #FFFFFF;
    overflow-y: auto;
    padding: 0.8rem;
    max-height: 100%;
    border: 2px solid rgb(85, 85, 85);
    background-color: rgba(0, 0, 0, 0.75);

    @media screen and (min-width: 992px) {
      flex-direction: column;
    }
  }

  .lv-sidebar-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h4 {
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0;
      margin-top: 0;
      flex-direction: row;
    }
  }

  .toggle {
    cursor: default;
    background: none;
    border: none;
    color: #FFFFFF;
    float: right;
    transition: transform 500ms;

    &.active {
      transform: rotate(180deg);
    }
  }
}
</style>
