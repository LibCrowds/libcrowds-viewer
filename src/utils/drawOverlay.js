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
export default function (viewer, id, rect, type = '') {
  if (!viewer.addOverlay) {
    return
  }
  console.log('overlayRect', rect)
  const el = document.createElement('div')
  el.dataset.id = id
  el.classList.add('overlay')
  el.style.zIndex = '1'
  if (type === 'selection') {
    el.style.border = '2px solid rgb(52, 152, 219)'
    el.style.backgroundColor = 'rgba(52, 152, 219, 0.2)'
    el.style.boxSizing = 'border-box'
    el.style.opacity = '.8'

    el.addEventListener('mouseover', function () {
      el.style.border = '2px solid #4DAF7C'
      el.style.backgroundColor = 'rgba(77, 175, 124, 0.2)'
    })

    el.addEventListener('mouseout', function () {
      el.style.border = '2px solid rgb(52, 152, 219)'
      el.style.backgroundColor = 'rgba(52, 152, 219, 0.2)'
    })
  }
  viewer.addOverlay({ element: el, location: rect })
}
