import Annotation from '@/model/Annotation'
import throwIfMissing from '@/utils/errors'

/**
 * Represents a Web Annotation used for transcriptions.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} value
 *   The description value.
 * @param {String} tag
 *   The tag value.
 * @param {String} fragmentURI
 *   An IIIF image region.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 * @param {String} classification
 *   A classification.
 */
class TranscribeAnnotation extends Annotation {
  constructor ({
    imgInfo = throwIfMissing(),
    value = throwIfMissing(),
    tag = throwIfMissing(),
    fragmentURI = null,
    creator = null,
    generator = null,
    classification = null
  }) {
    super({
      motivation: 'describing',
      imgInfo: imgInfo,
      creator: creator,
      generator: generator
    })
    this.addDescription(value)
    this.addTag(tag, fragmentURI)
    if (classification) {
      this.addClassification(classification)
    }
  }
}

export default TranscribeAnnotation
