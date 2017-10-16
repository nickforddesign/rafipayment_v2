import _ from 'lodash'
import Vue from 'vue'
import VueRequests from 'vue-requests'
import VueModels from 'vue-models'
import VueCollections from 'vue-collections'
// import moment from 'moment'

import { sleep } from '@/utils'
import store from '@/store'
import config from '@/config'
import session from '@/session'
import loading from '@/components/loading'

// global styles
import '../scss/styles.scss'

Vue.use(VueRequests, {
  root: config.api,
  headers: {
    Access() {
      return _.get(store, 'getters.session:access.token')
    }
  },
  async before(vm) {
    if (session.access_token_expired) {
      await session.refresh_access_token(vm)
    }
  },
  timeout() {
    alert('The request timed out')
  }
})

Vue.use(VueModels)
Vue.use(VueCollections)

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
