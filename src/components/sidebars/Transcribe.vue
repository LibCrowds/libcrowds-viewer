<template>
  <div id="lv-transcribe-sidebar">
    <sidebar title="Transcribe">
      <vue-form-generator
        :schema="task.form.schema"
        :model="task.form.model"
        :options="formOptions"
        @validated="onValidated">
      </vue-form-generator>
    </sidebar>
  </div>
</template>

<script>
import Task from '@/task'
import VueFormGenerator from "vue-form-generator"
import Sidebar from '@/components/Sidebar'

export default {
  data: function () {
    return {
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      },
      // To avoid modifying parent state
      form: JSON.parse(JSON.stringify(this.task.form))
    }
  },

  components: {
    Sidebar,
    "vue-form-generator": VueFormGenerator.component
  },

  props: {
    task: {
      type: Task,
      required: true
    }
  },

  methods: {
    onValidated: function (isValid, errors) {
      document.querySelector('.form-group').classList.remove('show-errors')
      this.$emit('update', this.task, this.form, errors)
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
