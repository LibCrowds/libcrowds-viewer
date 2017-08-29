import errors from '@/utils/errors'

/**
 * Represents a transcription form.
 */
class Form {
  constructor ({
    model = errors.throwIfMissing('model'),
    schema = errors.throwIfMissing('schema'),
    classification = {},
    fragments = {}
  }) {
    this.model = model
    this.schema = schema
    this.classification = classification
    this.fragments = fragments
    this.formOptions = {
      validateAfterLoad: true,
      validateAfterChanged: true
    }
    this.errors = []
  }
}

export default Form
