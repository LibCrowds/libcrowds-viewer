import Annotation from '@/model/Annotation'
import errors from '@/utils/errors'

/**
 * Represents a Web Annotation used for tagging.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} tag
 *   Plain text value for the tag.
 * @param {String} fragment
 *   The fragment selector value.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 * @param {String} classification
 *   A classification.
 */
class SelectAnnotation extends Annotation {
  constructor ({
    imgInfo = errors.throwIfMissing('imgInfo'),
    tag = errors.throwIfMissing('tag'),
    fragment = errors.throwIfMissing('fragment'),
    creator = null,
    generator = null,
    classification = null
  }) {
    super({
      motivation: 'tagging',
      imgInfo: imgInfo,
      creator: creator,
      generator: generator
    })
    this.addTag(tag, imgInfo, fragment)
    if (classification) {
      this.addClassification(classification)
    }
  }
}

export default SelectAnnotation
