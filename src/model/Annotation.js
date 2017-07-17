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
      this.addCreator(creator)
    }
    if (generator) {
      this.addGenerator(generator)
    }
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
      this.addCreator(creator)
    }
    if (generator) {
      this.addGenerator(generator)
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
    } else if (root[key].id === value.id) {
      // Update the item if IDs match
      root[key] = value
    } else if (Array.isArray(root[key])) {
      // Add unique items to an array (and update any with the same ID)
      for (let item of root[key]) {
        if (item.id === root[key].id) {
          item = value
        } else {
          root[key].push(value)
        }
      }
    } else {
      // Create new array if both items are unique
      root[key] = [root[key], value]
    }
    this.modified = new Date().toISOString()
  }

  /**
   * Add a tag.
   * @param {String} tag
   *   A plain text value.
   * @param {Object} imgInfo
   *   The IIIF image info.
   * @param {*} fragmentURI
   *   The IIIF image region.
   */
  addTag (tag, imgInfo, fragmentURI = null) {
    if (fragmentURI) {
      this.target.selector = {
        type: 'FragmentSelector',
        value: fragmentURI,
        conformsTo: imgInfo.protocol
      }
    }

    this.addBody({
      type: 'TextualBody',
      purpose: 'tagging',
      value: tag
    })
  }

  /**
   * Add a description
   * @param {String} description
   *   A plain text value.
   * @param {*} fragmentURI
   *   The IIIF image region.
   */
  addDescription (description) {
    this.addBody({
      type: 'TextualBody',
      purpose: 'describing',
      value: description,
      format: 'text/plain'
    })
  }

  /**
   * Add a Body to the Annotation.
   * @param {Object} opts
   *   The Body to be added.
   */
  addBody (opts) {
    this._setMultiItem(this, 'body', opts)
  }

  /**
   * Add a creator to the Annotation.
   * @param {Object} opts
   *   The body to be added.
   */
  addCreator (opts) {
    this._setMultiItem(this, 'creator', opts)
  }

  /**
   * Add a generator to the Annotation.
   * @param {Object} opts
   *   The generator to be added.
   */
  addGenerator (opts) {
    this._setMultiItem(this, 'generator', opts)
  }

  /**
   * Return matching bodies filtered at root level by filters.
   * @param {*} filters
   *   Array of key-value pairs on which to search.
   */
  searchBodies (filters) {
    if (Array.isArray(this.body)) {
      const filtered = this.body.filter(function (item) {
        for (let prop in filters) {
          if (item[prop] !== filters[prop]) {
            return false
          }
        }
        return true
      })
      const bodies = []
      for (let item of filtered) {
        const idx = this.body.indexOf(item)
        bodies.push(this.body[idx])
      }
      return bodies
    } else if (this.body !== undefined) {
      for (let prop in filters) {
        if (this.body[prop] !== filters[prop]) {
          return []
        }
      }
      return this.body
    }
  }
}

export default Annotation
