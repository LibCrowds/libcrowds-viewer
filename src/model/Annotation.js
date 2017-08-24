import uuid from 'uuid/v4'
import errors from '@/utils/errors'

/**
 * Represents a Web Annotation.
 *
 * See https://www.w3.org/TR/annotation-model/
 *
 * Note that as the viewer is not currently responsible for storing the
 * annotations the id is generated as a random UUID. This can later be
 * updated by the client should they decide to send the data to their own
 * annotation server.
 * @param {String} motivation
 *   A motivation from the following section of the spec.
 *   https://www.w3.org/TR/annotation-model/#motivation-and-purpose
 * @param {String} target
 *   The URL of the resource being annotated
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 */
class Annotation {
  constructor ({
    motivation = errors.throwIfMissing('motivation'),
    target = errors.throwIfMissing('target'),
    creator = null,
    generator = null
  }) {
    this['@context'] = 'http://www.w3.org/ns/anno.jsonld'
    this['id'] = uuid()
    this.type = 'Annotation'
    this.motivation = motivation
    this.created = new Date().toISOString()
    this.target = target
    if (creator) {
      this._setMultiItem(this, 'creator', creator)
    }
    if (generator) {
      this._setMultiItem(this, 'generator', generator)
    }
    this.created = new Date().toISOString()
    this.generated = new Date().toISOString()
  }

  /**
   * Update the modified time, if the annotation is modified after creation.
   */
  setModified () {
    const now = new Date().toISOString()
    if (now !== this.created) {
      this.modified = new Date().toISOString()
    }
  }

  /**
   * Set or update an item where more than one value is allowed.
   * @param {*} root
   *   The root attribute for which key should be set to value.
   * @param {String} key
   *   The attribute of root for which to add value.
   * @param {*} value
   *   The value to be set for key.
   */
  _setMultiItem (root, key, value) {
    if (root[key] === undefined) {
      // Set the item if none exists
      root[key] = value
    } else if (root[key].id && value.id && root[key].id === value.id) {
      // Update the item if IDs exist and match
      root[key] = value
    } else if (Array.isArray(root[key])) {
      // Add unique items to an array (and update any with the same ID)
      for (let item of root[key]) {
        if (item.id && value.id && item.id === value.id) {
          root[key][root[key].indexOf(item)] = value
          return
        }
      }
      root[key].push(value)
    } else {
      // Create new array if both items are unique
      root[key] = [root[key], value]
    }
  }

  /**
   * Add a tag to the Body and set the fragement selector, if provided.
   * @param {String} value
   *   A plain text value.
   * @param {String} fragment
   *   The media fragment selector value (see https://www.w3.org/TR/media-frags/).
   */
  addTag (value, fragment = null) {
    if (fragment) {
      console.log(typeof this.target)
      if (typeof this.target === 'string') {
        this.target = {
          source: this.target
        }
      }
      this.target.selector = {
        type: 'FragmentSelector',
        conformsTo: 'http://www.w3.org/TR/media-frags/',
        value: fragment
      }
    }

    this._setMultiItem(this, 'body', {
      type: 'TextualBody',
      purpose: 'tagging',
      value: value
    })
  }

  /**
   * Add a description to the Body.
   * @param {String} value
   *   A plain text value.
   */
  addDescription (value) {
    this._setMultiItem(this, 'body', {
      type: 'TextualBody',
      purpose: 'describing',
      value: value,
      format: 'text/plain'
    })
  }

  /**
   * Add a classification to the Body
   * @param {String} source
   *   A specific representation source.
   */
  addClassification (source) {
    this._setMultiItem(this, 'body', {
      type: 'SpecificResource',
      purpose: 'classifying',
      source: source
    })
  }

  /**
   * Add a comment to the Body
   * @param {String} value
   *   The value of the resource.
   */
  addComment (value) {
    this._setMultiItem(this, 'body', {
      type: 'TextualBody',
      value: value,
      purpose: 'commenting',
      format: 'text/plain'
    })
  }
}

export default Annotation
