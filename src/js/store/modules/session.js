import { path } from 'ramda'
import { setStorage, getStorage, clearStorage } from '@/utils'
import events from 'pubsub-js'

const defaults = () => ({
  logged_in: false,
  primary: null,
  user: {
    first_name: '',
    last_name: '',
    role: '',
    session: {
      refresh: {
        token: getStorage('refresh_token')
      }
    }
  }
})

export default {
  defaults,
  state: defaults(),
  getters: {
    'session:user': state => {
      return state.user
    },
    'session:role': state => {
      return state.user.role
    },
    'session:access': state => {
      return path(['user', 'session', 'access'], state)
    },
    'session:refresh': state => {
      return path(['user', 'session', 'refresh'], state)
    },
    'session:logged_in': state => {
      return state.logged_in
    },
    'session:primary': state => {
      return state.primary
    }
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user
      state.logged_in = true
      setStorage('refresh_token', this.getters['session:refresh'].token)
    },
    LOGOUT(state) {
      this.dispatch('reset_all')
      clearStorage('refresh_token')
    },
    REFRESH(state, session) {
      state.user.session = session
      setStorage('refresh_token', this.getters['session:refresh'].token)
    },
    ACTIVATE(state, user) {
      state.user = user
    },
    SET_PRIMARY(state, data) {
      state.primary = data
    }
  },
  actions: {
    login({ commit }, user) {
      commit('LOGIN', user)
      events.publish('login')
    },
    logout({ commit }) {
      commit('LOGOUT')
      events.publish('logout')
    },
    refresh({ commit }, { session }) {
      commit('REFRESH', session)
    },
    activate({ commit }, user) {
      commit('ACTIVATE', user)
    },
    set_primary({ commit }, data) {
      commit('SET_PRIMARY', data)
    }
  }
}
