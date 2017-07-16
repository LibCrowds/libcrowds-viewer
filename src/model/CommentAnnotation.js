import Annotation from '@/model/annotation'

/**
 * Represents a Web Annotation used for comments.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} text
 *   The comment value.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 */
class CommentAnnotation extends Annotation {

  constructor ({
    imgInfo,
    text,
    creator = null, 
    generator = null
  }) {
    super('commenting', imgInfo)
    this.addBody({
      type: 'TextualBody',
      value: text,
      purpose: 'commenting',
      format: 'text/plain'
    })
    if (creator) {
      this.addCreator(creator)
    }
    if (generator) {
      this.addGenerator(generator)
    }
  }
}

export default CommentAnnotation
