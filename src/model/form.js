/**
 * Represents a transcription form.
 */
class Form {

  constructor ({
    model,
    fields,
    errors = [],
    annotations = []
  }) {
    this.model = model
    this.schema = {
      fields: fields
    }
    this.formOptions = {
      validateAfterLoad: true,
      validateAfterChanged: true
    }
    this.errors = errors
    this.annotations = annotations

    if (this.model === undefined) {
      throw new Error('model is required')
    }

    if (this.fields === undefined) {
      throw new Error('fields is required')
    }
  }
}

export default Form
