import Annotation from '@/model/Annotation'
import errors from '@/utils/errors'

/**
 * Represents a Web Annotation used for tagging.
 * @param {String} target
 *   The URL of the resource being annotated
 * @param {String} tag
 *   Plain text value for the tag.
 * @param {String} fragment
 *   The media fragment selector value (see https://www.w3.org/TR/media-frags/).
 * @param {String} classification
 *   A classification.
 */
class SelectAnnotation extends Annotation {
  constructor ({
    target = errors.throwIfMissing('target'),
    tag = errors.throwIfMissing('tag'),
    fragment = errors.throwIfMissing('fragment'),
    classification = null
  }) {
    super({
      motivation: 'tagging',
      target: target
    })
    this.addTag(tag, fragment)
    if (classification) {
      this.addClassification(classification)
    }
  }
}

export default SelectAnnotation
