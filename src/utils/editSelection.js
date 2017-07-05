import { store } from '@/store'
import deleteSelection from '@/utils/deleteSelection'

export default function (selection) {
  const viewer = store.state.viewer
  const selector = store.state.selector
  const overlay = viewer.getOverlayById(selection.id)
  const bounds = overlay.getBounds(viewer.viewport)
  deleteSelection(selection)
  selector.rect = new OpenSeadragon.SelectionRect(bounds.x, bounds.y,
                                                  bounds.width, bounds.height)
  selector.draw()
  selector.enable()
}
