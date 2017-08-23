import Annotation from '@/model/Annotation'
import errors from '@/utils/errors'

/**
 * Represents a Web Annotation used for comments.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} comment
 *   The comment value.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 */
class CommentAnnotation extends Annotation {
  constructor ({
    imgInfo = errors.throwIfMissing('imgInfo'),
    comment = errors.throwIfMissing('comment'),
    creator = null,
    generator = null
  }) {
    super({
      motivation: 'commenting',
      imgInfo: imgInfo,
      creator: creator,
      generator: generator
    })
    this.addComment(comment)
  }
}

export default CommentAnnotation
