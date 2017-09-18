import Form from '@/model/Form'
import errors from '@/utils/errors'

/**
 * Represents a task to be updated with user input as annotations.
 */
class Task {
  constructor ({
    mode = errors.throwIfMissing('mode'),
    tileSource = errors.throwIfMissing('tileSource'),
    target = errors.throwIfMissing('target'),
    id = null,
    info = null,
    objective = '',
    guidance = '',
    tag,
    classification,
    form = null,
    highlights = [],
    liked = false,
    annotations = [],
    complete = false,
    shareUrl = null,
    thumbnailUrl = null,
    help = null,
    bounds = null
  }) {
    this.mode = mode
    this.target = target
    this.tileSource = tileSource
    this.id = id
    this.info = info
    this.objective = objective
    this.guidance = guidance
    this.tag = tag
    this.classification = classification
    this.form = form
    this.highlights = highlights
    this.liked = liked
    this.annotations = annotations
    this.complete = complete
    this.shareUrl = shareUrl
    this.thumbnailUrl = thumbnailUrl
    this.help = help
    this.bounds = bounds

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

  /**
   * Return true if tihs task is the same as another, false otherwise.
   * @param {Task} task
   */
  equals (task) {
    return JSON.stringify(this) === JSON.stringify(task)
  }
}

export default Task
