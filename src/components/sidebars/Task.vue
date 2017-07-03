<template>
  <div id="lv-task-sidebar">
    <sidebar title="Task">
      <h4>{{ objective }}</h4>
      <p>{{ guidance }}</p>
      <button class="btn" @click="submit">
        Submit
      </button>
    </sidebar>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  },

  props: {
    objective: {
      type: String,
      required: true
    },
    guidance: {
      type: String,
      required: true
    }
  },

  methods: {
    submit () {
      this.$emit('submit', {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/settings';
@import '../../assets/style/partials/buttons';

#lv-task-sidebar {
  ul {
    overflow-y: auto;
    height: 300px;
    list-style: none;
    padding: 0.8rem;
    border: 1px solid $gray;

    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;

      &:not(:last-child) {
        margin-bottom: 0.75rem;
      }
    }
  }

  svg {
    margin-left: 5px;
  }

  button {
    display: flex;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
