import uuid from 'uuid/v4'
import { store } from '@/store'
import drawOverlay from '@/utils/drawOverlay'

export default function (selectionRect) {
  const vp = store.state.viewer.viewport
  const imgRect = vp.viewportToImageRectangle(selectionRect)
  const vpRect = vp.imageToViewportRectangle(imgRect)
  const el = document.createElement('div')
  const selection = {
    id: uuid(),
    viewportRect: vpRect,
    imageRect: imgRect
  }
  store.commit('ADD_ARRAY_ITEM', { key: 'selections', value: selection })
  drawOverlay(selection.id, selection.viewportRect, 'selection')
}
