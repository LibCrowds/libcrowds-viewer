/**
 * Delete an overlay.
 * @param {Object} viewer
 *   The viewer.
 * @param {String} id
 *   The overlay ID.
 */
export default function (viewer, id) {
  const query = `.overlay[data-id="${id}"]`
  const el = document.querySelector(query)
  viewer.removeOverlay(el)
}
