import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    selector: {},
    viewer: {},
    selections: [],
    form: {
      model: {},
      errors: {},
      isValid: true
    },
    imgSource: '',
    note: ''
  },

  mutations: {
    SET_ITEM: (state, obj) => {
      state[obj.key] = obj.value
    },
    ADD_ARRAY_ITEM: (state, obj) => {
      state[obj.key].unshift(obj.value)
    },
    DEL_ARRAY_ITEM: (state, obj) => {
      state[obj.key].splice(obj.index, 1)
    },
  },

  getters: {
    getData: state => {
      return {
        selections: state.selections,
        imgSource: state.imgSource,
        note: state.note,
        form: state.form
      }
    },
    getSelections: state => () => state.selections
  }
})
