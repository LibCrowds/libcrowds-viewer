export default function (selection, highlight) {
  const query = `.selection[data-id="${selection.id}"]`
  const el = document.querySelector(query)
  if (highlight) {
    el.classList.add('focus')
  } else {
    el.classList.remove('focus')
  }
}
