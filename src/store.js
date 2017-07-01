import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    selections: []
  },

  mutations: {
    SET_ITEM: (state, obj) => {
      state[obj.key] = obj.value
    },
    DEL_ITEM: (state, obj) => {
      state[obj.key].splice(obj.index, 1)
    },
    ADD_ITEM: (state, obj) => {
      state[obj.key].unshift(obj.value)
    }
  }
})
