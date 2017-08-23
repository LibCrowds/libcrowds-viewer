/**
 * Return a data URI containing a representation of the current image.
 * @param {Object} viewer
 *   The OpenSeadragon viewer.
 * @param {String} format
 *   The image format.
 */
export default function (viewer, format = 'image/jpeg') {
  return viewer.drawer.canvas.toDataURL(format)
}
