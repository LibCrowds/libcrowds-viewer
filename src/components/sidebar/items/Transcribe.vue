<template>
  <div id="lv-sidebar-transcribe-item">

    <vue-form-generator
      id="lv-form"
      :schema="task.form.schema"
      :model="task.form.model"
      :options="formOptions"
      @validated="onValidated">
    </vue-form-generator>

  </div>
</template>

<script>
import Task from '@/model/Task'
import VueFormGenerator from 'vue-form-generator'

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
    'vue-form-generator': VueFormGenerator.component
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
      // Replace the empty string with null for date fields
      // to avoid Invalid Date in fecha.format
      this.form.schema.fields.forEach((field) => {
        if (field.inputType === 'date' && this.form.model[field.model] === '') {
          this.form.model[field.model] = null
        }
      })
      this.$emit('update', this.task, this.form, errors)
    }
  }
}
</script>

<style lang="scss">
@import '~style/settings';
@import '~style/partials/forms';

#lv-sidebar-transcribe-item {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  fieldset {
    border: none;
    padding: 0;
  }

  .form-group {
    margin-bottom: 1rem;
  }
}

#lv-form {
  flex: 1 1 auto;
}
</style>
