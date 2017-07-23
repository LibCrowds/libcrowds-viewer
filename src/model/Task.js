import Form from '@/model/Form'

/**
 * Represents a task to be updated with user input as annotations.
 */
class Task {
  constructor ({
    mode,
    id,
    imgInfoUri,
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

    // Validate
    const validModes = ['select', 'transcribe']
    const baseMsg = 'Failed to initialise task - '

    if (this.mode === undefined) {
      throw new Error(`${baseMsg} mode is required`)
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
   * Fetch the image info.
   */
  fetchImageInfo () {
    return fetch(this.imgInfoUri, {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).catch(function (err) {
      throw Error(`Could not retrieve image info: ${err}`)
    })
  }

  /**
   * Return an Annotation.
   * @param {*} id
   *   The Annotation ID.
   */
  getAnnotation (id) {
    const filtered = this.annotations.filter(function (anno) {
      return anno.id === id
    })
    const idx = this.annotations.indexOf(filtered[0])
    return this.annotations[idx]
  }

  /**
   * Delete an Annotation by ID.
   * @param {String} id
   *   The ID of the Annotation to delete.
   */
  deleteAnnotation (id) {
    const filteredAnnos = this.annotations.filter(function (anno) {
      return anno.id !== id
    })
    if (filteredAnnos.length === this.annotations.length) {
      throw Error('No Annotation exists with that ID')
    }
    this.annotations = filteredAnnos
  }
}

export default Task
