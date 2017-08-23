import Annotation from '@/model/Annotation'
import errors from '@/utils/errors'

/**
 * Represents a Web Annotation used for transcriptions.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} transcription
 *   The transcription.
 * @param {String} tag
 *   The tag value.
 * @param {String} fragment
 *   A fragment selector value.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 * @param {String} classification
 *   A classification.
 */
class TranscribeAnnotation extends Annotation {
  constructor ({
    transcription = errors.throwIfMissing(),
    tag = errors.throwIfMissing(),
    fragment = null,
    creator = null,
    generator = null,
    classification = null
  }) {
    super({
      motivation: 'describing',
      creator: creator,
      generator: generator
    })
    this.addDescription(transcription)
    this.addTag(tag, fragment)
    if (classification) {
      this.addClassification(classification)
    }
  }
}

export default TranscribeAnnotation
