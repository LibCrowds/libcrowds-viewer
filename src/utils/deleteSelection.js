import { store } from '@/store'

export default function (selection) {
  const viewer = store.state.viewer
  viewer.removeOverlay(selection.id)
}
