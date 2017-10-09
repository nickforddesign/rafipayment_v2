import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import router from '@/router'
import { localStorageSupported } from '@/utils'

Vue.use(Vuex)

const hasLocalStorage = localStorageSupported()

function setRefresh(token) {
  return hasLocalStorage
    ? localStorage.setItem('refresh_token', token)
    : null
}

function getRefresh() {
  return hasLocalStorage
    ? localStorage.getItem('refresh_token')
    : null
}

function clearRefresh() {
  return hasLocalStorage
    ? localStorage.removeItem('refresh_token')
    : null
}

export default new Vuex.Store({
  state: {
    logged_in: false,
    user: {
      first_name: '',
      last_name: '',
      role: '',
      session: {
        refresh: {
          token: getRefresh()
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
      // Vue.set(state.user, user)
      state.logged_in = true
      // state.user.role = 'tenant'

      setRefresh(this.getters.refresh.token)
      router.push('/dashboard')
    },
    LOGOUT(state) {
      state.user = {}
      state.logged_in = false
      clearRefresh()
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
