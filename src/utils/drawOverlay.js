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
  el.style.zIndex = '1'
  if (type === 'selection') {
    el.style.border = '1px solid rgb(52, 152, 219)'
    el.style.backgroundColor = 'rgba(52, 152, 219, 0.2)'
    el.style.boxSizing = 'border-box'
    el.style.opacity = '.8'

    el.addEventListener('mouseover', function () {
      el.style.border = '1px solid #4DAF7C'
      el.style.backgroundColor = 'rgba(77, 175, 124, 0.2)'
    })

    el.addEventListener('mouseout', function () {
      el.style.border = '1px solid rgb(52, 152, 219)'
      el.style.backgroundColor = 'rgba(52, 152, 219, 0.2)'
    })
  } else if (type === 'highlight') {
    el.style.border = '1px solid rgba(77, 175, 124, 0.8)'
    el.style.backgroundColor = 'rgba(77, 175, 124, 0.2)'
  } else if (type === 'related') {
    el.style.border = '1px solid rgba(244, 208, 63, 0.4)'
    el.style.backgroundColor = 'rgba(244, 208, 63, 0.05)'
  }
  if (onClick) {
    el.addEventListener('click', onClick)
  }
  viewer.addOverlay({ element: el, location: rect })
  return el
}
