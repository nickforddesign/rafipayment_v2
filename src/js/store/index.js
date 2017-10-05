import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in: false,
    user: {
      session: {
        refresh: {
          token: localStorage.getItem('refresh_token')
        }
      }
    }
  },
  getters: {
    user: state => {
      return state.user
    },
    access: state => {
      return _.get(state, 'user.session.access')
    },
    refresh: state => {
      return _.get(state, 'user.session.refresh')
    },
    logged_in: state => {
      return state.logged_in
    }
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user
      state.logged_in = true
      state.user.role = 'tenant'

      localStorage.setItem('refresh_token', this.getters.refresh.token)
      router.push('/dashboard')
    },
    LOGOUT(state) {
      state.user = {}
      state.logged_in = false
      localStorage.removeItem('refresh_token')
      router.push('/')
    }
  },
  actions: {
    login({ commit }, user) {
      commit('LOGIN', user)
    },
    logout({ commit }) {
      commit('LOGOUT')
    }
  }
})
