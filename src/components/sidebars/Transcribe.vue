<template>
  <div id="lv-transcribe-sidebar">
    <sidebar title="Transcribe">
      <vue-form-generator
        :schema="schema"
        :model="model">
      </vue-form-generator>
    </sidebar>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator"
import Sidebar from '@/components/Sidebar'
import { store } from '@/store'

export default {
  components: {
    Sidebar,
    "vue-form-generator": VueFormGenerator.component
  },

  props: {
    model: {
      type: Object,
      required: true
    },
    schema: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/settings';
@import '../../assets/style/partials/forms';

#lv-transcribe-sidebar {
  fieldset {
    border: none;
    padding: 0;
  }

  .form-group {
    margin-bottom: 1rem;
  }
}
</style>
