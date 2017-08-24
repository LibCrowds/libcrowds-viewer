import Annotation from '@/model/Annotation'
import errors from '@/utils/errors'

/**
 * Represents a Web Annotation used for comments.
 * @param {String} target
 *   The URL of the resource being annotated
 * @param {String} comment
 *   The comment value.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 */
class CommentAnnotation extends Annotation {
  constructor ({
    target = errors.throwIfMissing('target'),
    comment = errors.throwIfMissing('comment'),
    creator = null,
    generator = null
  }) {
    super({
      motivation: 'commenting',
      target: target,
      creator: creator,
      generator: generator
    })
    this.addComment(comment)
  }
}

export default CommentAnnotation
