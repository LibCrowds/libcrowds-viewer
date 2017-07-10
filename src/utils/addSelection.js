import uuid from 'uuid/v4'
import { store } from '@/store'
import drawOverlay from '@/utils/drawOverlay'

export default function (viewer, selectionRect) {
  const vp = viewer.viewport
  const imgRect = vp.viewportToImageRectangle(selectionRect)
  const vpRect = vp.imageToViewportRectangle(imgRect)
  const el = document.createElement('div')
  const selection = {
    id: uuid(),
    viewportRect: vpRect,
    imageRect: imgRect
  }
  store.commit('ADD_ARRAY_ITEM', { key: 'selections', value: selection })
  drawOverlay(viewer, selection.id, selection.viewportRect, 'selection')
}
