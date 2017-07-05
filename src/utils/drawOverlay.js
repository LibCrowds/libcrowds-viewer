import { store } from '@/store'

export default function (id, rect, cls) {
  const viewer = store.state.viewer
  const el = document.createElement('div')
  el.dataset.id = id
  el.classList.add('overlay')
  el.classList.add(cls)
  viewer.addOverlay({ element: el, location: rect })
}
