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
 */
class Annotation {

  constructor (motivation, imgInfo) {
    this['@context'] = 'http://www.w3.org/ns/anno.jsonld'
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
  _setMultiItem(root, key, value) {
    if (typeof root[key] === 'undefined') {
      root[key] = value
    } else if (Array.isArray(root[key])) {
      root[key].push(value)
    } else {
      root[key] = [root[key], value]
    }
    this.modified = new Date().toISOString()
  }

  /**
   * Set the agent responsible for creating the resource.
   * @param {String} id
   * @param {String} name
   * @param {String} nick
   */
  setCreator(id, type, name, nick) {
    this.creator = {
      id: id,
      type: type,
      name: name,
      nick: nick
    }
    this.modified = new Date().toISOString()
  }

  /**
   * Set the agent responsible for generating the serialization of the
   * Annotation.
   * @param {String} id
   * @param {String} name
   * @param {String} homepage
   */
  setGenerator(id, type, name, homepage) {
    this.generator = {
      id: id,
      type: type,
      name: name,
      homepage: homepage
    }
    this.generated = new Date().toISOString()
  }

  /**
   * Add a tag.
   * @param {String} tag
   *   A plain text value.
   * @param {*} fragmentURI
   *   The IIIF image region.
   */
  addTag (tag, fragmentURI = null) {
    if (fragmentURI) {
      this.target.selector = {
        type: 'FragmentSelector',
        value: fragmentURI,
        conformsTo: 'http://iiif.io/api/image/2/context.json'
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
   * Add a body to the annotation.
   * @param {*} obj
   *   The body to be added.
   */
  addBody(obj) {
    this._setMultiItem(this, 'body', obj)
  }
}

export default Annotation
