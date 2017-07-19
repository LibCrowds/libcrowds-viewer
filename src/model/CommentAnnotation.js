import Annotation from '@/model/Annotation'

/**
 * Represents a Web Annotation used for comments.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} value
 *   The comment value.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 */
class CommentAnnotation extends Annotation {
  constructor ({
    imgInfo,
    value,
    creator = null,
    generator = null
  }) {
    super({
      motivation: 'commenting',
      imgInfo: imgInfo,
      creator: creator,
      generator: generator
    })
    this.addComment(value)
  }
}

export default CommentAnnotation
