import { path } from 'ramda'
import Vue from 'vue'
import VueRequests from 'vue-requests'
import VueModels from 'vue-models'
import VueCollections from 'vue-collections'

import { sleep } from '@/utils'
import store from '@/store'
import config from '@/config'
import session from '@/session'
import loading from '@/components/loading'

const version = process.env.VERSION
const env = process.env.NODE_ENV

// error tracking
import './modules/sentry'

// global styles
import '../scss/styles.scss'

Vue.use(VueRequests, {
  root: config.api,
  headers: {
    access() {
      return path(['getters', 'session:access', 'token'], store)
    },
    rafipayment_client() {
      return `${config.client}/${version}`
    }
  },
  async before() {
    if (session.logged_in && !session.check_access_token()) {
      await session.refresh_access_token(this)
    }
  },
  timeout() {
    alert('The request timed out')
  }
})

Vue.use(VueModels)
Vue.use(VueCollections)

// push notifications
if (env === 'cordova') {
  const push = require('./modules/push_notifications')
  push.init(Vue)
}

export default new Vue({
  el: '#app',
  store,
  name: 'load',
  template: `
    <div class="app-container">
      <loading v-if="loading" />
      <div class="app" />
    </div>`,
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
    init() {
      session.refresh_session(this)
    },
    loadApp() {
      this.loading = false
      this.$destroy()
      import('@/app')
    }
  },
  components: { loading }
})
