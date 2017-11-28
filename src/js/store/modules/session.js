import { path } from 'ramda'
import { setStorage, getStorage, clearStorage } from '@/utils'

const defaults = () => ({
  logged_in: false,
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
    'session:access': state => {
      return path(['user', 'session', 'access'], state)
    },
    'session:refresh': state => {
      return path(['user', 'session', 'refresh'], state)
    },
    'session:logged_in': state => {
      return state.logged_in
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
      // setStorage('refresh_token', this.getters['session:refresh'].token)
    }
  },
  actions: {
    login({ commit }, user) {
      commit('LOGIN', user)
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    refresh({ commit }, { session }) {
      commit('REFRESH', session)
    },
    activate({ commit }, user) {
      commit('ACTIVATE', user)
    }
  }
}
