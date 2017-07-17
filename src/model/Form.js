/**
 * Represents a transcription form.
 */
class Form {
  constructor ({
    model,
    schema
  }) {
    this.model = model
    this.schema = schema
    this.formOptions = {
      validateAfterLoad: true,
      validateAfterChanged: true
    }
    this.errors = []
    this.annotations = {}

    if (model === undefined) {
      throw new Error('model is required')
    }

    if (schema === undefined) {
      throw new Error('schema is required')
    }
  }
}

export default Form
