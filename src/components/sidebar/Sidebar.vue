<template>
  <div class="lv-sidebar">
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
.lv-sidebar {
  font-size: 14px;
  color: #FFFFFF;
  overflow-y: auto;
  max-height: 100%;
  border: 2px solid rgb(85, 85, 85);
  background-color: rgba(0, 0, 0, 0.75);
  margin: 1rem;

  @media screen and (min-width: 992px) {
    flex-direction: column;
  }

  .lv-sidebar-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.6rem;
    font-family: sans-serif;
    letter-spacing: 1px;

    h4 {
      text-transform: uppercase;
      margin: 0;
      flex-direction: row;
    }
  }

  .lv-sidebar-content {
    padding: 0.6em;
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
