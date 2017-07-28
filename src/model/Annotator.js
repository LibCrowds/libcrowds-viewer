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
  _getTranscribeAnnotations (task) {
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
  _getSelectAnnotations (task) {
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
  _getCommentAnnotations (task) {
    let matched = []
    for (let anno of task.annotations) {
      if (anno instanceof CommentAnnotation) {
        matched.push(anno)
      }
    }
    return matched
  }

  /**
   * Return the annotation for a form field.
   *   The task.
   * @param {String} key
   *   The model key.
   */
  _getFormFieldAnnotation (task, key) {
    const allAnnos = this._getTranscribeAnnotations(task)
    const fieldAnnos = this.filterAnnotations(allAnnos, {
      body: {
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
    return task.annotations[idx]
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
    console.log(anno)
    if (!anno) {
      anno = annotation
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
   * @param {String} value
   *   The transcription value.
   */
  storeTranscriptionAnnotation (task, key, transcription) {
    let anno = this._getFormFieldAnnotation(task, key)
    if (!anno) {
      anno = new TranscribeAnnotation({
        imgInfo: task.imgInfo,
        transcription: transcription,
        tag: key,
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
}

export default Annotator
