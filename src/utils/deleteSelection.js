import { store } from '@/store.js'

export default function (selection) {
  const viewer = store.state.viewer
  viewer.removeOverlay(selection.id)
}
