import Annotation from '@/model/Annotation'

/**
 * Represents a Web Annotation used for tagging.
 * @param {Object} imgInfo
 *   The IIIF image info.
 * @param {String} value
 *   Plain text value for the tag.
 * @param {String} fragmentURI
 *   The IIIF image region.
 * @param {Object} creator
 *   The Annotation creator.
 * @param {Object} generator
 *   The Annotation generator.
 * @param {String} classification
 *   A classification.
 */
class TagAnnotation extends Annotation {
  constructor ({
    imgInfo,
    value,
    fragmentURI = null,
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
    this.addTag(value, imgInfo, fragmentURI)
    if (classification) {
      this.addClassification(classification)
    }
  }
}

export default TagAnnotation
