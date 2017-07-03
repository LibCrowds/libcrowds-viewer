import { store } from '@/store.js'

export default function () {
  const viewer = store.state.viewer
  const overlays = typeof viewer.currentOverlays !== 'undefined'
                     ? viewer.currentOverlays
                     : []
  const selections = overlays.filter(function (overlay) {
    return overlay.element.classList.contains('selection')
  }).map(function (s) {
    const bounds = s.getBounds(viewer.viewport)
    const vpRect = new OpenSeadragon.SelectionRect(bounds.x,
                                                    bounds.y,
                                                    bounds.width,
                                                    bounds.height)
    return {
      id: s.element.id,
      rect: viewer.viewport.viewportToImageRectangle(vpRect)
    }
  })
  return selections
}



