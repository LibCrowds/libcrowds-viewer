import Annotation from '@/model/annotation'

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
 */
class TagAnnotation extends Annotation {

  constructor ({
    imgInfo,
    value, 
    fragmentURI = null, 
    creator = null, 
    generator = null
  }) {
    super('tagging', imgInfo, creator, generator)
    this.addTag(value, imgInfo, fragmentURI)
  }
}

export default TagAnnotation