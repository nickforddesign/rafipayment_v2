import Vue from 'vue'
import VeeValidate from 'vee-validate'
import router from '@/router'

import store from '@/store'
import filters from '@/modules/filters'
import validators from '@/modules/validators'

import App from '@/components/app'
import Logo from '@/components/logo'
import Loading from '@/components/loading'
import Select from '@/components/select'
import Validation from '@/components/validation'
import Field from '@/components/field'
import Password from '@/components/password'
import Modal from '@/components/modal'
import Search from '@/components/search'

Vue.config.productionTip = false

const components = [
  Logo,
  Loading,
  Select,
  Validation,
  Field,
  Password,
  Modal,
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
  for (let key in validators) {
    VeeValidate.Validator.extend(key, validators[key])
  }

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
