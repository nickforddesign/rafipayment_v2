import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

import router from '@/router'

import store from '@/store'
import filters from '@/modules/filters'
import validators from '@/modules/validators'

import App from '@/components/main'
import Logo from '@/components/logo'
import Loading from '@/components/loading'
import Select from '@/components/select'
import Validation from '@/components/validation'
import Field from '@/components/field'
import NumberInput from '@/components/number'
import Currency from '@/components/currency'
import Password from '@/components/password'
import Modal from '@/components/modal'
import Empty from '@/components/empty'
import DatePicker from '@/components/date'
import Search from '@/components/search'
import Searchable from '@/components/searchable'
import ResponsiveTable from '@/components/table'
import Cell from '@/components/table/cell'
import Collection from '@/components/collection'

Vue.config.productionTip = false

const components = [
  Logo,
  Loading,
  Select,
  Validation,
  Field,
  NumberInput,
  Currency,
  Password,
  Modal,
  Empty,
  DatePicker,
  Search,
  Searchable,
  ResponsiveTable,
  Cell,
  Collection
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
  Vue.use(VCalendar)
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
