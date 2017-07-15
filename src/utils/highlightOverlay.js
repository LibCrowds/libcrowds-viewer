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
    el.classList.add('focus')
  } else {
    el.classList.remove('focus')
  }
}
