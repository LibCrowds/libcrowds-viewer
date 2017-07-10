import { store } from '@/store'

export default function (viewer, id, rect, cls) {
  if (!viewer.addOverlay) {
    return
  }
  const el = document.createElement('div')
  el.dataset.id = id
  el.classList.add('overlay')
  el.classList.add(cls)
  viewer.addOverlay({ element: el, location: rect })
}
