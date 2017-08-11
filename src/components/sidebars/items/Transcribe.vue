<template>
  <div id="lv-sidebar-transcribe-item">

    <vue-form-generator
      id="lv-form"
      ref="form"
      v-if="form"
      :schema="form.schema"
      :model="form.model"
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
    /**
     * Emit the update event when the form validates (or otherwise).
     */
    onValidated (isValid, errors) {
      document.querySelector('.form-group').classList.remove('show-errors')
      // Replace the empty string with null for date fields in order
      // to avoid Invalid Date in fecha.format
      this.form.schema.fields.forEach((field) => {
        if (field.inputType === 'date' && this.form.model[field.model] === '') {
          this.form.model[field.model] = null
        }
      })
      this.form.errors = errors
      this.$emit('update', this.task, this.form)
    },

    /**
     * Emit the inputfocus event.
     */
    onInputFocus (evt) {
      const modelId = evt.target.id
      this.$emit('inputfocus', this.task, modelId)
    },

    /**
     * Emit the inputblur event.
     */
    onInputBlur () {
      this.$emit('inputblur', this.task)
    }
  },

  mounted () {
    const fieldElems = document.querySelectorAll('.form-control')
    for (let el of fieldElems) {
      el.addEventListener('focus', this.onInputFocus)
      el.addEventListener('blur', this.onInputBlur)
    }
  },

  beforeDestroy () {
    const fieldElems = document.querySelectorAll('.form-control')
    for (let el of fieldElems) {
      el.removeEventListener('focus', this.onInputFocus)
      el.removeEventListener('focus', this.onInputBlur)
    }
  },

  watch: {
    task: function () {
      this.form = JSON.parse(JSON.stringify(this.task.form))
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
