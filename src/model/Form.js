import errors from '@/utils/errors'

/**
 * Represents a transcription form.
 */
class Form {
  constructor ({
    model = errors.throwIfMissing(),
    schema = errors.throwIfMissing(),
    classification = {}
  }) {
    this.model = model
    this.schema = schema
    this.classification = classification
    this.formOptions = {
      validateAfterLoad: true,
      validateAfterChanged: true
    }
    this.errors = []
  }
}

export default Form
