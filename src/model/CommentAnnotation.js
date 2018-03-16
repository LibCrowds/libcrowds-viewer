import Annotation from '@/model/Annotation'
import errors from '@/utils/errors'

/**
 * Represents a Web Annotation used for comments.
 * @param {String} target
 *   The URL of the resource being annotated
 * @param {String} comment
 *   The comment value.
 */
class CommentAnnotation extends Annotation {
  constructor ({
    target = errors.throwIfMissing('target'),
    comment = errors.throwIfMissing('comment')
  }) {
    super({
      motivation: 'commenting',
      target: target
    })
    this.addComment(comment)
  }
}

export default CommentAnnotation
