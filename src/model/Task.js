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
   * Add or update an Annotation.
   * @param {Annotation} annotation
   *   The Annotation.
   */
  storeAnnotation (annotation) {
    let anno = this.getAnnotation(annotation.id)
    if (anno !== null) {
      anno = annotation
    } else {
      this.annotations.push(anno)
    }
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

  /**
   * Return Annotations.
   * @param {Object} terms
   *   Key-value pairs to check.
   */
  searchAnnotations (terms) {
    let annotations = []
    if (this.annotations.length) {
      console.log('is function', typeof this.annotations[0].search === 'function')
    }
    for (let anno of this.annotations) {
      console.log('is function', typeof anno.search === 'function')
      if (anno.search(terms)) {
        annotations.push(anno)
      }
    }
    return annotations
  }
}

export default Task
