<template>
  <div id="lv-selection-sidebar">
    <sidebar title="Selections">
    </sidebar>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  data: function () {
    return {
      selections: [
        {
          id: `overlay-123`,
          type: 'selection',
          x: 1,
          y: 1,
          width: 1,
          height: 1
        }
      ]
    }
  },

  components: {
    Sidebar
  }
}
</script>
