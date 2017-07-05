import { store } from '@/store'

export default function (selection) {
  const query = `.selection[data-id="${selection.id}"]`
  const el = document.querySelector(query)
  store.commit('DEL_ARRAY_ITEM', { key: 'selections', value: selection })
  store.state.viewer.removeOverlay(el)
}
