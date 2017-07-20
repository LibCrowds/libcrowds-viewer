/**
 * Represents an overlay.
 * @param {String} id
 *   An ID.
 * @param {Object} rect
 *   An OpenSeadragon viewport rectangle.
 * @param {String} shape
 *   The type of shape ('rect' or 'circle').
 */
class Overlay {
  constructor ({
    id,
    rect,
    shape = 'rect'
  }) {
    this.id = id
    this.rect = rect
    this.shape = shape
  }
}

export default Overlay
