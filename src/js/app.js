import Vue from 'vue'
import router from './router'

import App from './components/app'
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
