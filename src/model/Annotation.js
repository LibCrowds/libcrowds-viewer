import uuid from 'uuid/v4'

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
    motivation,
    imgInfo,
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
   * @param {*} fragmentURI
   *   The IIIF image region.
   */
  addTag (value, imgInfo, fragmentURI = null) {
    if (fragmentURI) {
      this.target.selector = {
        type: 'FragmentSelector',
        value: fragmentURI,
        conformsTo: imgInfo.protocol
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
   * @param {*} fragmentURI
   *   The IIIF image region.
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

  /**
   * Check if a section of the annotation contains an object.
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
   * Check if the annotation contains the given key-value pairs.
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
   * @param {Object} terms
   *   Key-value pairs to check.
   */
  search (terms) {
    for (let key in terms) {
      if (!this._hasMatch(terms[key], this[key])) {
        return false
      }
    }
    return true
  }
}

export default Annotation
