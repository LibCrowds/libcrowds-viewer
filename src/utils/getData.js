import { store } from '@/store.js'
import getSelections from '@/utils/getSelections.js'

export default function () {
  return {
    selections: getSelections(),
    note: store.state.note
  }
}
