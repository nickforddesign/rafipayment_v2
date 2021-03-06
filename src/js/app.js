// external libraries
import './lib'

import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueTouch from 'vue-touch'
import PortalVue from 'portal-vue'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import VueTheMask from 'vue-the-mask'

import router from '@/router'

import store from '@/store'
import filters from '@/modules/filters'
import validators from '@/modules/validators'

import Select from '@/components/inputs/select'
import CheckBox from '@/components/inputs/checkbox'
import Radio from '@/components/inputs/radio'
import NumberInput from '@/components/inputs/number'
import PhoneInput from '@/components/inputs/phone'
import CurrencyInput from '@/components/inputs/currency'
import PasswordInput from '@/components/inputs/password'
import DateInput from '@/components/inputs/date'

import App from '@/components/main'
import Logo from '@/components/logo'
import Loading from '@/components/loading'
import Validation from '@/components/validation'
import Field from '@/components/field'
import SearchInput from '@/components/search'
import Searchable from '@/components/searchable'
import Modal from '@/components/modal'
import Empty from '@/components/empty'
import ResponsiveTable from '@/components/table'
import Cell from '@/components/table/cell'
import Collection from '@/components/collection'
import Collapse from '@/components/collapse'
import GoogleMap from '@/components/map'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'cordova') {
  import('@/modules/universal_links')
}

const components = [
  Logo,
  Loading,
  Select,
  Validation,
  Field,
  CheckBox,
  Radio,
  NumberInput,
  PhoneInput,
  CurrencyInput,
  PasswordInput,
  Modal,
  Empty,
  DateInput,
  SearchInput,
  Searchable,
  ResponsiveTable,
  Cell,
  Collection,
  Collapse,
  GoogleMap
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
  Vue.use(VueTouch)
  Vue.use(PortalVue)
  Vue.use(VCalendar)
  Vue.use(VueTheMask)
}

install(Vue)

/* eslint-disable no-new */
const app = new Vue({
  el: '.app-container',
  store,
  router,
  template: '<App></App>',
  components: { App },
  computed: {
    is_cordova() {
      return process.env.NODE_ENV === 'cordova'
    }
  },
  methods: {
    alert(
      message = '',
      callback = () => {},
      title = 'Alert',
      button_label = 'OK',
      confirm_class = 'primary'
    ) {
      const createAlert = this.is_cordova
        ? navigator.notification.alert
        : modalAlert
      return createAlert(message, callback, title, button_label, confirm_class)
    },
    confirm(
      message = '',
      callback = () => {},
      title = 'Confirm',
      button_labels = ['OK', 'Cancel'],
      confirm_class = 'danger'
    ) {
      const createAlert = this.is_cordova
        ? navigator.notification.confirm
        : modalConfirm
      return createAlert(message, callback, title, button_labels, confirm_class)
    }
  }
})

function modalAlert(message, callback, title, button_label, confirm_class) {
  return app.$store.dispatch('alert_show', {
    message,
    callback,
    title,
    button_label,
    confirm_class
  })
}

function modalConfirm(message, callback, title, button_labels, confirm_class) {
  return app.$store.dispatch('alert_show', {
    message,
    callback,
    title,
    button_labels,
    confirm_class
  })
}

export default app
