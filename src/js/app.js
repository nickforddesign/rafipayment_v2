import Vue from 'vue'
import VeeValidate from 'vee-validate'
import router from '@/router'

import store from '@/store'
import filters from '@/modules/filters'

import App from '@/components/app'
import Logo from '@/components/logo'
import Validation from '@/components/validation'
import Password from '@/components/password'
import Search from '@/components/search'

Vue.config.productionTip = false

const components = [
  Logo,
  Password,
  Validation,
  Search
]

const install = (Vue) => {
  for (let key in filters) {
    Vue.filter(key, filters[key])
  }
  components.map(component => {
    if (!component.name) {
      throw ReferenceError('Global component missing name')
    }
    Vue.component(component.name, component)
  })

  Vue.use(VeeValidate)
}

install(Vue)

/* eslint-disable no-new */
new Vue({
  el: '.app-container',
  store,
  router,
  template: '<App></App>',
  components: { App }
})
