import _ from 'lodash'

import router from '@/router'
import { localStorageSupported } from '@/utils'

const defaults = () => ({
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
})

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

export default {
  defaults,
  state: defaults(),
  getters: {
    'session:user': state => {
      return state.user
    },
    'session:access': state => {
      return _.get(state, 'user.session.access')
    },
    'session:refresh': state => {
      return _.get(state, 'user.session.refresh')
    },
    'session:logged_in': state => {
      return state.logged_in
    }
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user
      state.logged_in = true

      setRefresh(this.getters['session:refresh'].token)
      router.push('/dashboard')
    },
    LOGOUT(state) {
      this.dispatch('reset_all')
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
}
