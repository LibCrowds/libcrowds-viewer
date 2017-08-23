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
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 */
class Annotation {
  constructor ({
    motivation = errors.throwIfMissing(),
    imgInfo = errors.throwIfMissing(),
    creator = null,
    generator = null
  }) {
    this['@context'] = [
      'http://www.w3.org/ns/anno.jsonld',
      imgInfo['context'] || imgInfo['@context']
    ]
    this['id'] = uuid()
    this.type = 'Annotation'
    this.motivation = motivation
    this.created = new Date().toISOString()
    this.target = {
      id: imgInfo['id'] || imgInfo['@id'],
      width: imgInfo.width,
      height: imgInfo.height,
      type: 'Image',
      format: 'image/jpeg'
    }
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
   * Update the modified time and add creator and generator.
   * @param {Object} creator
   *   The Annotation creator.
   * @param {Object} generator
   *   The Annotation generator.
   */
  modify ({creator = null, generator = null}) {
    this.modified = new Date().toISOString()
    if (creator) {
      this._setMultiItem(this, 'creator', creator)
    }
    if (generator) {
      this._setMultiItem(this, 'generator', generator)
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
    this.modified = new Date().toISOString()
  }

  /**
   * Add a tag to the Body and set the fragement selector, if provided.
   * @param {String} value
   *   A plain text value.
   * @param {Object} imgInfo
   *   The IIIF image info.
   * @param {String} fragment
   *   A fragment selector value.
   */
  addTag (value, imgInfo, fragment = null) {
    if (fragment) {
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
   * @param {String} value
   *   The value of the resource.
   */
  addClassification (value) {
    this._setMultiItem(this, 'body', {
      type: 'SpecificResource',
      purpose: 'classifying',
      value: value
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
