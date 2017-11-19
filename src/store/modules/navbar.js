// import * as types from '../mutation-types'

const state = {
}

// getters

const getters = {
  routes: (state) => state.routes,
  open: (state) => state.open,
  active: (state) => state.active
}

// actions
const actions = {
  // changeOpen ({ commit, state }, products) {
  //   commit(types.CHECKOUT_REQUEST)
  // },
  // changeActive ({ commit, state }, products) {
  //   commit(types.CHECKOUT_REQUEST)
  // }
}

// mutations
const mutations = {
  changeOpen (state, payload) {
    state.open = payload.url
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
