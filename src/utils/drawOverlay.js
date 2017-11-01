/**
 * Draw and return an overlay.
 * @param {Object} viewer
 *   The viewer.
 * @param {String} id
 *   An ID for the overlay.
 * @param {Object} rect
 *   Overlay coordinates.
 * @param {String} cls
 *   Additional overlay class.
 * @param {Function} onClick
 *   A callback to trigger on click (or tap).
 */
export default function (viewer, id, rect, type = '', onClick = null) {
  if (!viewer.addOverlay) {
    return
  }
  const el = document.createElement('div')
  el.dataset.id = id
  el.classList.add('overlay')
  if (type) {
    el.classList.add(type)
  }
  if (onClick) {
    el.addEventListener('click', onClick)
  }
  viewer.addOverlay({ element: el, location: rect })
  return el
}
