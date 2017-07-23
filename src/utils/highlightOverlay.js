/**
 * Toggle the focus class on an overlay.
 * @param {String} id
 *   The overlay ID.
 * @param {Boolean} highlight
 *   True to highlight, false otherwise.
 */
export default function (id, highlight) {
  const query = `.overlay[data-id="${id}"]`
  const el = document.querySelector(query)
  if (highlight) {
    el.style.borderColor = '#4DAF7C'
    el.style.backgroundColor = 'rgba(77, 175, 124, 0.2)'
  } else {
    el.style.borderColor = 'rgb(52, 152, 219)'
    el.style.backgroundColor = 'rgba(52, 152, 219, 0.2)'
  }
}
