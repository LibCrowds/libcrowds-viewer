import { store } from '@/store'
import deleteSelection from '@/utils/deleteSelection'

export default function (viewer, selection) {
  const selector = store.state.selector
  const rect = selection.viewportRect
  const selectionRect = new OpenSeadragon.SelectionRect(rect.x, rect.y,
                                                        rect.width, rect.height)
  selector.rect = selectionRect
  selector.draw()
  selector.enable()
  deleteSelection(viewer, selection)
}
