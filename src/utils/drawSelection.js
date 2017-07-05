import uuid from 'uuid/v4'
import { store } from '@/store'

export default function (selection) {
  // Convert Viewport rect to Image rect
  const rect = new OpenSeadragon.Rect(selection.x, selection.y,
                                      selection.width, selection.height)
  const viewer = store.state.viewer
  const el = document.createElement('div')
  el.dataset.selectionId = uuid()
  el.classList.add('overlay')
  el.classList.add('selection')
  viewer.addOverlay({ element: el, location: rect })
}
