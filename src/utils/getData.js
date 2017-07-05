import { store } from '@/store'
import getSelections from '@/utils/getSelections'

export default function () {
  return {
    selections: getSelections(),
    note: store.state.note
  }
}
