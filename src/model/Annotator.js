import TranscribeAnnotation from '@/model/TranscribeAnnotation'
import SelectAnnotation from '@/model/SelectAnnotation'
import CommentAnnotation from '@/model/CommentAnnotation'

/**
 * Represents an annotator responsible for managing all task annotations.
 */
class Annotator {
  constructor (
    {
      creator = null,
      generator = null
    } = {
      creator: null,
      generator: null
    }
  ) {
    this.creator = creator
    this.generator = generator
  }

  /**
   * Check if a section of an object contains another.
   * @param {Object} find
   *   The object to find.
   * @param {Object} root
   *   The object to search.
   */
  _hasMatch (find, root) {
    if (root === undefined) {
      return false
    } else if (!Array.isArray(root)) {
      return root === find
    } else {
      for (let item of root) {
        if (JSON.stringify(item) === JSON.stringify(find)) {
          return true
        }
      }
      return false
    }
  }

  /**
   * Check if an annotation contains the given key-value pairs.
   *
   * If the key happens to relate to an array within the Annotation a search
   * will be made within that array.
   *
   * Example:
   * contains({
   *  id: 123,
   *  body: {
   *    purpose: 'tagging',
   *    value: 'something'
   *  }
   * })
   *
   * @param {Annotation} annotation
   *   The annotation.
   * @param {Object} terms
   *   Key-value pairs to check.
   */
  _search (annotation, terms) {
    for (let key in terms) {
      if (!this._hasMatch(terms[key], annotation[key])) {
        return false
      }
    }
    return true
  }

  /**
   * Return all instances of TranscribeAnnotation for the task.
   * @param {Task} task
   *   The task.
   */
  getTranscribeAnnotations (task) {
    let matched = []
    for (let anno of task.annotations) {
      if (anno instanceof TranscribeAnnotation) {
        matched.push(anno)
      }
    }
    return matched
  }

  /**
   * Return all instances of SelectAnnotation for the task.
   * @param {Task} task
   *   The task.
   */
  getSelectAnnotations (task) {
    let matched = []
    for (let anno of task.annotations) {
      if (anno instanceof SelectAnnotation) {
        matched.push(anno)
      }
    }
    return matched
  }

  /**
   * Return all instances of CommentAnnotation for the task.
   * @param {Task} task
   *   The task.
   */
  getCommentAnnotation (task) {
    let matched = []
    for (let anno of task.annotations) {
      if (anno instanceof CommentAnnotation) {
        matched.push(anno)
      }
    }
    if (matched.length > 1) {
      throw Error('Multiple comment annotations identified')
    }
    return matched.length > 0 ? matched[0] : null
  }

  /**
   * Return the annotation for a form field.
   * @param {Task} task
   *   The task.
   * @param {String} key
   *   The model key.
   */
  getFormFieldAnnotation (task, key) {
    const allAnnos = this.getTranscribeAnnotations(task)
    const fieldAnnos = this.filterAnnotations(allAnnos, {
      body: {
        type: 'TextualBody',
        purpose: 'tagging',
        value: key
      }
    })
    if (fieldAnnos.length > 1) {
      throw Error('Multiple form field annotations identified')
    }
    return fieldAnnos.length > 0 ? fieldAnnos[0] : null
  }

  /**
   * Return an Annotation.
   * @param {Task} task
   *   The task.
   * @param {*} id
   *   The Annotation ID.
   */
  getAnnotation (task, id) {
    const filtered = task.annotations.filter((anno) => {
      return anno.id === id
    })
    const idx = task.annotations.indexOf(filtered[0])
    return idx > -1 ? task.annotations[idx] : null
  }

  /**
   * Add or update an Annotation.
   * @param {Task} task
   *   The task.
   * @param {Annotation} annotation
   *   The Annotation.
   */
  storeAnnotation (task, annotation) {
    let anno = this.getAnnotation(task, annotation.id)
    if (anno !== null) {
      anno = annotation
      anno.setModified()
    } else {
      task.annotations.push(annotation)
    }
  }

  /**
   * Delete an Annotation by ID.
   * @param {Task} task
   *   The task.
   * @param {String} id
   *   The ID of the Annotation to delete.
   */
  deleteAnnotation (task, id) {
    const filteredAnnos = task.annotations.filter((anno) => {
      return anno.id !== id
    })
    if (filteredAnnos.length === task.annotations.length) {
      throw Error('No Annotation exists with that ID')
    }
    task.annotations = filteredAnnos
  }

  /**
   * Return Annotations.
   * @param {Array} annotations
   *   The task.
   * @param {Object} terms
   *   Key-value pairs to check.
   */
  filterAnnotations (annotations, terms) {
    let filtered = []
    for (let anno of annotations) {
      if (this._search(anno, terms)) {
        filtered.push(anno)
      }
    }
    return filtered
  }

  /**
   * Create or update a transcription annotation.
   * @param {Task} task
   *   The task.
   * @param {String} key
   *   The form model key.
   * @param {String} transcription
   *   The transcription value.
   * @param {String} rect
   *   A image rectangle to be converted to a fragment selector.
   */
  storeTranscriptionAnnotation (task, key, transcription, rect = null) {
    let anno = this.getFormFieldAnnotation(task, key)
    const fragment = rect
      ? `xywh=${rect.x},${rect.y},${rect.width},${rect.height}`
      : null
    if (anno === null) {
      anno = new TranscribeAnnotation({
        target: task.target,
        transcription: transcription,
        tag: key,
        fragment: fragment,
        creator: this.creator,
        generator: this.generator,
        classification: task.form.classification[key]
      })
      this.storeAnnotation(task, anno)
    } else {
      // Replace the description
      anno.body = anno.body.filter((item) => {
        return item.purpose !== 'describing'
      })
      anno.addDescription(transcription)
      this.storeAnnotation(task, anno)
    }
    return anno
  }

  /**
   * Create or update a CommentAnnotation.
   *
   * There should only be one CommentAnnotation per task.
   * @param {Task} task
   *   The task.
   * @param {String} comment
   *   The comment text.
   */
  storeCommentAnnotation (task, comment) {
    let anno = this.getCommentAnnotation(task)
    if (anno === null) {
      anno = new CommentAnnotation({
        target: task.target,
        comment: comment,
        creator: this.creator,
        generator: this.generator
      })
      this.storeAnnotation(task, anno)
    } else {
      anno.body.value = comment
      this.storeAnnotation(task, anno)
    }
    return anno
  }

  /**
   * Create a SelectAnnotation.
   * @param {Task} task
   *   The task.
   * @param {Object} rect
   *   The image rectangle.
   */
  createSelectAnnotation (task, rect) {
    const fragment = `xywh=${rect.x},${rect.y},${rect.width},${rect.height}`
    const anno = new SelectAnnotation({
      target: task.target,
      tag: task.tag,
      fragment: fragment,
      creator: this.creator,
      generator: this.generator,
      classification: task.classification
    })
    this.storeAnnotation(task, anno)
    return anno
  }
}

export default Annotator
