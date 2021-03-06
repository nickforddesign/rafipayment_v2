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

const push = process.env.NODE_ENV === 'cordova'
  ? require('@/modules/push_notifications')
  : null

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
    },
    logged_in(val) {
      if (this.is_cordova && val) {
        push.register()
      }
    }
  },
  computed: {
    is_cordova() {
      return process.env.NODE_ENV === 'cordova'
    },
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
        this.fetch_primary(vm, response)
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
      this.fetch_primary(vm, response)
    },
    async fetch_primary(vm, user) {
      const primary_id = path(['payment', 'primary_funding_source'], user)
      if (primary_id) {
        const response = await vm.$request(`account/funding_sources/${primary_id}`)
        store.dispatch('set_primary', response)
      }
    },
    check_access_token() {
      const expiration_date = path(['expiration', '$date'], this.access)
      const expires = moment.utc(expiration_date).subtract(1, 'minute')
      const now = moment.utc()
      return expiration_date && now < expires
    },
    set_refresh_token(session) {
      store.dispatch('refresh', session)
    },
    async logout() {
      try {
        await push.unregister()
      } catch (error) {
        error
      } finally {
        this.$store.dispatch('logout')
      }
    }
  }
})

export default session
