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
      form: this.copyForm()
    }
  },

  components: {
    'vue-form-generator': VueFormGenerator.component
  },

  props: {
    task: {
      type: Task,
      required: true
    },
    disableComplete: {
      type: Boolean,
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
    },

    /**
     * Emit the submit event on enter.
     */
    onKeyup (evt) {
      if (evt.keyCode === 13) {
        this.$emit('submit', this.task)
      }
    },

    /**
     * Add event listeners.
     */
    addEventListeners () {
      const fieldElems = document.querySelectorAll('.form-control')
      for (let i = 0; i < fieldElems.length; i++) {
        fieldElems[i].addEventListener('focus', this.onInputFocus)
        fieldElems[i].addEventListener('blur', this.onInputBlur)
        fieldElems[i].addEventListener('keyup', this.onKeyup)
      }
    },

    /**
     * Make a copy of the form and disable any fields if necessary.
     */
    copyForm () {
      let form = JSON.parse(JSON.stringify(this.task.form))
      if (this.disableComplete && this.task.complete) {
        form.schema.fields = form.schema.fields.map((field) => {
          field.disabled = true
          return field
        })
      }
      return form
    },

    /**
     * Load the form.
     */
    load () {
      this.form = this.copyForm()
      this.addEventListeners()
      document.querySelector('.form-control').focus()
    }
  },

  mounted () {
    this.load()
  },

  beforeDestroy () {
    const fieldElems = document.querySelectorAll('.form-control')
    for (let i = 0; i < fieldElems.length; i++) {
      fieldElems[i].removeEventListener('focus', this.onInputFocus)
      fieldElems[i].removeEventListener('blur', this.onInputBlur)
      fieldElems[i].removeEventListener('keyup', this.onKeyup)
    }
  },

  watch: {
    task: function () {
      this.load()
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

  :disabled {
    background: $gray-light;
  }
}

#lv-form {
  flex: 1 1 auto;
}
</style>
