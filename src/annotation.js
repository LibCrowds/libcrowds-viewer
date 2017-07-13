import uuid from 'uuid/v4'

/**
 * Represents a Web Annotation.
 *
 * See https://www.w3.org/TR/annotation-model/
 *
 * Note that as the viewer is not currently responsible for storing the
 * annotations the id is auto-generated as a random UUID, which can later be
 * updated by the client should they decide to send the data to their own
 * annotation server.
 * @param {String} motivation
 *   A motivation from the following section of the spec.
 *   https://www.w3.org/TR/annotation-model/#motivation-and-purpose
 * @param {String} targetId
 *   The target ID of the annotation (i.e. the IIIF image source).
 */
class Annotation {

  constructor (motivation, targetId) {
    this['@context'] = 'http://www.w3.org/ns/anno.jsonld'
    this['id'] = uuid()
    this.type = 'Annotation'
    this.motivation = motivation
    this.created = new Date()
    this.target = {
      id: targetId,
      type: 'Image'
    }
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
    this.generated = new Date()
  }

  /**
   * Set the target of the annotation
   * @param {String} id
   *
   */
  setTarget(id) {

  }
}
