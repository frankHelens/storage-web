import Vue from 'vue'
import Vuex from 'vuex'
import navbar from './modules/navbar'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    isOpen: true,
    isHover: false,
    treeStorage: {}
  },
  getters: {
    isOpen: (state) => state.isOpen,
    isHover: (state) => state.isHover,
    treeStorage: (state) => state.treeStorage
  },
  mutations: {
    changeOpen (state) {
      state.isOpen = !state.isOpen
    },
    changeHover (state, hoverState) {
      state.isHover = hoverState
    },
    changeTreeStorage (state, props) {
      const { page, id, expanded } = props
      if (!state.treeStorage[page]) {
        state.treeStorage[page] = new Set()
      }
      if (expanded) {
        state.treeStorage[page].add(id)
      } else {
        state.treeStorage[page].delete(id)
      }
    }
  },
  modules: {
    navbar
  },
  strict: debug
})
