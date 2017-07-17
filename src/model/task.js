import Annotation from '@/model/Annotation'
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
    form = null,
    regions = [],
    annotations = []
  }) {
    this.mode = mode
    this.id = id
    this.imgInfoUri = imgInfoUri
    this.manifestUri = manifestUri
    this.objective = objective
    this.guidance = guidance
    this.tag = tag
    this.form = form
    this.regions = regions
    this.annotations = annotations
    
    this.fetchImageInfo().then((info) => {
      this.imgInfo = info
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
   * Fetch the image info.
   */
  fetchImageInfo () {
    return fetch(this.imgInfoUri, {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).catch(function(err) {
      throw Error('Could not retrieve image info')
    })
  }

  /**
   * Return annotations by motivation.
   * @param {String} motivation
   *   The motivation.
   */
  getAnnotationsByMotivation (motivation) {
    const filteredAnnos = this.annotations.filter(function(anno) {
      return anno.motivation === motivation
    })

    const annoList = []
    for (let filteredAnno of filteredAnnos) {
      const idx = this.annotations.indexOf(filteredAnno)
      const originalAnno = this.annotations[idx]
      annoList.push(originalAnno)
    }
    return annoList
  }

  /**
   * Return an Annotation.
   * @param {*} id
   *   The Annotation ID.
   */
  getAnnotation (id) {
    const filtered = this.annotations.filter(function(anno) {
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
    const filteredAnnos = this.annotations.filter(function(anno) {
      return anno.id !== id
    })
    if (filteredAnnos.length === this.annotations.length) {
      throw Error('No Annotation exists with that ID')
    }
    this.annotations = filteredAnnos
  }

  /**
   * Add a and return a comment Annotation.
   * @param {String} text
   *   The comment value.
   * @param {Object} creator
   *   The Annotation creator.
   * @param {Object} generator
   *   The Annotation generator.
   */
  addComment ({text, creator = null, generator = null}) {
    let anno = new Annotation('commenting', this.imgInfo)
    anno.addBody({
      type: 'TextualBody',
      value: text,
      purpose: 'commenting',
      format: 'text/plain'
    })
    if (creator) {
      anno.addCreator(creator)
    }
    if (generator) {
      anno.addGenerator(generator)
    }
    this.annotations.push(anno)
    return anno
  }

  /**
   * Add a tag.
   * @param {String} value
   *   Plain text value for the tag.
   * @param {String} fragmentURI
   *   The IIIF image region.
   * @param {Object} creator
   *   The Annotation creator.
   * @param {Object} generator
   *   The Annotation generator.
   */
  addTag ({value, fragmentURI = null, creator = null, generator = null}) {
    const anno = new Annotation('tagging', this.imgInfo)
    anno.addTag(this.tag, this.imgInfo, fragmentURI)
    if (creator) {
      anno.addCreator(creator)
    }
    if (generator) {
      anno.addGenerator(generator)
    }
    this.annotations.push(anno)
    return anno
  }

  /**
   * Add a description
   * @param {String} value
   *   Plain text value for the description.
   * @param {String} tag
   *   Plain text value for the tag.
   * @param {String} fragmentURI
   *   The IIIF image region.
   * @param {Object} creator
   *   The Annotation creator.
   * @param {Object} generator
   *   The Annotation generator.
   */
  describe ({value, tag, fragmentURI = null, creator = null, generator = null}) {
    const anno = new Annotation('describing', this.imgInfo)
    anno.addDescription(value)
    anno.addTag(tag, fragmentURI = null)
    if (creator) {
      anno.addCreator(creator)
    }
    if (generator) {
      anno.addGenerator(generator)
    }
    this.annotations.push(anno)
    return anno
  }
}

export default Task
