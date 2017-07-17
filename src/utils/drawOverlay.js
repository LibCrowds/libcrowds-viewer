/**
 * Draw an overlay.
 * @param {Object} viewer
 *   The viewer.
 * @param {String} id
 *   An ID for the overlay.
 * @param {Object} rect
 *   Overlay coordinates.
 * @param {String} cls
 *   Additional overlay class.
 */
export default function (viewer, id, rect, cls = "") {
  if (!viewer.addOverlay) {
    return
  }
  const el = document.createElement('div')
  el.dataset.id = id
  el.classList.add('overlay')
  el.classList.add(cls)
  viewer.addOverlay({ element: el, location: rect })
}
