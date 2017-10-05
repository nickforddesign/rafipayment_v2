// import _ from 'lodash'
import Vue from 'vue'
// import VueRequests from 'vue-requests'
// import moment from 'moment'
import router from './router'

import App from './components/App'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '.app-container',
  store,
  router,
  template: '<App></App>',
  components: { App }
})
