import _ from 'lodash'
import Vue from 'vue'
import VueRequests from 'vue-requests'
import moment from 'moment'

import store from '@/store'
import { sleep } from '@/utils'
import loading from '@/components/loading'

Vue.use(VueRequests, {
  // root: 'http://192.168.0.164:8000',
  root: 'http://api.staging.rafipayment.com',
  headers: {
    Access() {
      return _.get(store, 'getters.access.token')
    }
  },
  async before(vm) {
    const expiration_date = _.get(store, 'getters.access.expiration.$date')
    const expires = moment.utc(expiration_date)
    const now = moment.utc()
    if (expiration_date && (expires < now)) {
      const response = await vm.$request('/session/refresh', {
        method: 'post',
        body: {
          token: _.get(store, 'getters.refresh.token')
        }
      }, false)
      store.dispatch('login', response)
    }
  },
  timeout() {
    alert('The request timed out')
  }
})

export default new Vue({
  el: '#app',
  store,
  name: 'load',
  template: `
    <div class="app-container">
      <loading v-if="loading" />
      <div class="app" />
    </div>`,
  components: { loading },
  data() {
    return {
      loading: true
    }
  },
  async created() {
    await this.init()
    await sleep(1000)
    this.loadApp()
  },
  methods: {
    async init() {
      const token = _.get(store, 'getters.refresh.token')
      if (token) {
        const response = await this.$request('/session/refresh', {
          method: 'post',
          body: {
            token
          }
        })
        this.$store.dispatch('login', response)
      }
    },
    loadApp() {
      this.loading = false
      this.$destroy()
      import('@/app')
    }
  }
})
