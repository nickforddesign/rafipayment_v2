import { path } from 'ramda'
import moment from 'moment'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VueModels from 'vue-models'

import store from '@/store'
import User from '@/models/user'

Vue.use(VueModels, {
  schemaWarnings: false
})

const session = new Vue({
  store,
  name: 'session',
  models: {
    user() {
      return new User(null, {
        name: 'session_user',
        url: 'account',
        persist: true
      })
    }
  },
  watch: {
    user(val) {
      this.$user = this.user
    }
  },
  computed: {
    ...mapGetters({
      access: 'session:access',
      user: 'session:user',
      logged_in: 'session:logged_in'
    })
  },
  methods: {
    async refresh_access_token(vm) {
      await this.refresh('refresh', vm)
    },
    async refresh_session(vm) {
      await this.refresh('login', vm)
    },
    async refresh(endpoint = '', vm) {
      const token = path(['getters', 'session:refresh', 'token'], store)
      if (token) {
        const response = await vm.$request(`session/${endpoint}`, {
          method: 'post',
          body: {
            token
          }
        }, false)
        store.dispatch(endpoint, response)
      }
    },
    async activate(vm, token) {
      const response = await vm.$request('session/invite', {
        method: 'put',
        body: {
          token
        }
      })
      store.dispatch('activate', response)
    },
    check_access_token() {
      const expiration_date = path(['expiration', '$date'], this.access)
      const expires = moment.utc(expiration_date)
      const now = moment.utc()
      let output = false
      if (expiration_date) {
        if (expires < now) {
          output = true
        }
      }
      return output
    },
    set_refresh_token(session) {
      store.dispatch('refresh', session)
    }
  }
})

export default session
