import Form from '@/model/Form'
import getImageUri from '@/utils/getImageUri'

/**
 * Represents a task to be updated with user input as annotations.
 */
class Task {
  constructor ({
    mode,
    id,
    imgInfoUri,
    imgInfo,
    manifestUri = '',
    objective = '',
    guidance = '',
    tag,
    classification,
    form = null,
    regions = [],
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
    this.regions = regions
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
    const baseMsg = 'Failed to initialise task - '

    if (this.mode === undefined) {
      throw new Error(`${baseMsg} mode is required`)
    }

    if (this.imgInfo === undefined) {
      throw new Error(`${baseMsg} imgInfo is required`)
    }

    if (validModes.indexOf(this.mode) < 0) {
      throw new Error(`${baseMsg} mode must be one of ${validModes}`)
    }

    if (this.imgInfoUri === undefined) {
      throw new Error(`${baseMsg} imgInfoUri is required`)
    }

    if (this.mode === 'select' && !this.tag) {
      throw new Error(`${baseMsg} tag is required when in select mode`)
    }

    if (mode === 'transcribe') {
      try {
        this.form = new Form(this.form)
      } catch (err) {
        throw new Error(`${baseMsg} ${err}`)
      }
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
