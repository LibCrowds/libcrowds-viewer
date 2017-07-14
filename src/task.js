import Annotation from '@/annotation'

/**
 * Represents a task to be updated with user input as annotations.
 */
class Task {

  constructor ({
    id,
    tileSource,
    manifest = '',
    objective = '',
    guidance = '',
    tag = '',
    form = {},
    regions = [],
    annotations = []
  }) {
    this.id = id
    this.tileSource = tileSource
    this.manifest = manifest
    this.objective = objective
    this.guidance = guidance
    this.tag = tag
    this.form = form
    this.regions = regions
    this.annotations = annotations
  }

  /**
   * Return an annotation by motivation.
   * @param {String} motivation
   */
  _getAnnotationsByMotivation (motivation) {
    const filteredAnnos = this.annotations.filter(function(anno) {
      return anno.motivation = motivation
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
   * Add a comment.
   * @param {String} text
   *   The comment value.
   */
  _addComment (text) {
    let comment = new Annotation('commenting', this.tileSource)
    comment.addBody({
      type: 'TextualBody',
      value: text,
      purpose: 'commenting',
      format: 'text/plain'
    })
    this.annotations.push(comment)
  }

  /**
   * Update the comment (assumes one comment per image).
   * @param {String} text
   *   The comment value.
   */
  updateComment (text) {
    let annos = this._getAnnotationsByMotivation('commenting')
    if (annos.length) {
      annos[0].modified = new Date().toISOString()
      annos[0].body.value = text
      return
    }
    this._addComment(text)
  }

  /**
   * Add and return a tag.
   * @param {String} fragmentURI
   *   The IIIF image region.
   */
  addTag (fragmentURI) {
    const anno = new Annotation('tagging', this.tileSource)
    anno.target.selector = {
      type: 'FragmentSelector',
      value: fragmentURI,
      conformsTo: 'http://iiif.io/api/image'
    }
    anno.addBody({
      purpose: 'tagging',
      type: 'TextualBody',
      value: this.tag
    })
    this.annotations.push(anno)
    return anno
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
}

export default Task
