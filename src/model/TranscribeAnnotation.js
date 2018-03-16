import Annotation from '@/model/Annotation'
import errors from '@/utils/errors'

/**
 * Represents a Web Annotation used for transcriptions.
 * @param {String} target
 *   The URL of the resource being annotated
 * @param {String} transcription
 *   The transcription.
 * @param {String} tag
 *   The tag value.
 * @param {String} fragment
 *   The media fragment selector value (see https://www.w3.org/TR/media-frags/).
 * @param {String} classification
 *   A classification.
 */
class TranscribeAnnotation extends Annotation {
  constructor ({
    target = errors.throwIfMissing('target'),
    transcription = errors.throwIfMissing('transcription'),
    tag = errors.throwIfMissing('tag'),
    fragment = null,
    classification = null
  }) {
    super({
      motivation: 'describing',
      target: target
    })
    this.addDescription(transcription)
    this.addTag(tag, fragment)
    if (classification) {
      this.addClassification(classification)
    }
  }
}

export default TranscribeAnnotation
