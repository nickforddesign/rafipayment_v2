import Vue from 'vue'
import Vuex from 'vuex'
// import _ from 'lodash'
import { resetAllStates } from '@/utils'

import session from './modules/session'
import app from './modules/app'

Vue.use(Vuex)

const modules = [
  session,
  app
]

export default new Vuex.Store({
  modules,
  mutations: {
    RESET_ALL(state) {
      resetAllStates(state, modules)
    }
  },
  actions: {
    reset_all({ commit }) {
      commit('RESET_ALL')
    }
  }
})
