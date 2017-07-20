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
    this.id = rect
    this.schema = schema
    this.shape = shape
  }
}

export default Overlay
