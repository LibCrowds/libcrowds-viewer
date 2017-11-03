/**
 * Toggle a class on an overlay.
 * @param {String} id
 *   The overlay ID.
 * @param {Boolean} add
 *   True to add the class, false otherwise.
 * @param {String} cls
 *   The class to add.
 */
export default function (id, add, cls) {
  if (typeof document === 'undefined') {
    return
  }

  const query = `.overlay[data-id="${id}"]`
  const el = document.querySelector(query)
  if (add) {
    el.classList.add(cls)
  } else {
    el.classList.remove(cls)
  }
}
