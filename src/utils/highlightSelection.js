import { store } from '@/store'

export default function (selection, highlight) {
  const el = document.querySelector(`#${selection.id}`)
  if (highlight) {
    el.classList.add('highlight')
  } else {
    el.classList.remove('highlight')
  }
}
