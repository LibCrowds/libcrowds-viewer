/**
 * Represents an overlay.
 * @param {String} id
 *   An ID.
 * @param {Object} rect
 *   An OpenSeadragon viewport rectangle.
 */
class Overlay {
  constructor ({
    id,
    rect
  }) {
    this.id = id
    this.rect = rect
  }
}

export default Overlay
