import _ from 'lodash'
import moment from 'moment'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VueModels from 'vue-models'

import store from '@/store'
import User from '@/models/user'

Vue.use(VueModels)

const session = new Vue({
  store,
  name: 'session',
  models: {
    user() {
      return new User(null, {
        name: 'session_user',
        url: 'account/',
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
    access_token_expired() {
      const expiration_date = _.get(this.access, 'expiration.$date')
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
      const token = _.get(store, 'getters.session:refresh.token')
      if (token) {
        const response = await vm.$request(`/session/${endpoint}`, {
          method: 'post',
          body: {
            token
          }
        }, false)
        store.dispatch('login', response)
      }
    }
  }
})

export default session
