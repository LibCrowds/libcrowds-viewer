<template>
  <div id="lv-transcribe-sidebar">
    <sidebar title="Transcribe">
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
        @validated="onValidated">
      </vue-form-generator>
    </sidebar>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator"
import Sidebar from '@/components/Sidebar'
import { store } from '@/store'

export default {
  data: function () {
    return {
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
    }
  },

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
  },

  methods: {
    onValidated: function (isValid, errors) {
      store.state.form.model = this.model
      store.state.form.isValid = isValid
      store.state.form.errors = errors
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
