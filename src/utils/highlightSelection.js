import { store } from '@/store'

export default function (selection, highlight) {
  const query = `.selection[data-selection-id="${selection.id}"]`
  const el = document.querySelector(query)
  if (highlight) {
    el.classList.add('highlight')
  } else {
    el.classList.remove('highlight')
  }
}
