import Form from '@/model/Form'
import getImageUri from '@/utils/getImageUri'
import errors from '@/utils/errors'

/**
 * Represents a task to be updated with user input as annotations.
 */
class Task {
  constructor ({
    mode = errors.throwIfMissing(),
    imgInfoUri = errors.throwIfMissing(),
    imgInfo = errors.throwIfMissing(),
    id = null,
    manifestUri = '',
    objective = '',
    guidance = '',
    tag,
    classification,
    form = null,
    highlights = [],
    liked = false,
    annotations = [],
    complete = false
  }) {
    this.mode = mode
    this.id = id
    this.imgInfoUri = imgInfoUri
    this.manifestUri = manifestUri
    this.objective = objective
    this.guidance = guidance
    this.tag = tag
    this.classification = classification
    this.form = form
    this.highlights = highlights
    this.liked = liked
    this.annotations = annotations
    this.complete = complete

    this.imgInfo = imgInfo

    this.thumbnailUri = getImageUri({
      imgSource: this.imgInfoUri,
      size: '256,'
    })

    // Validate
    const validModes = ['select', 'transcribe']

    if (validModes.indexOf(this.mode) < 0) {
      throw new Error(`Mode must be one of ${validModes}`)
    }

    if (this.mode === 'select' && !this.tag) {
      throw new Error(`Tag is required when in select mode`)
    }

    if (mode === 'transcribe') {
      this.form = new Form(this.form)
    }
  }

  /**
   * Update the form.
   * @param {Object} form
   *   The form.
   */
  updateForm (form) {
    this.form = form
  }
}

export default Task
