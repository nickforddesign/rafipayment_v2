/* global cordova PushNotification */
const session = require('@/session').default

const push = {
  init(Vue) {
    this.vm = new Vue()
    this.bindEvents()
  },
  bindEvents() {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false
    )
  },
  bindClearAll() {
    document.addEventListener(
      'resume',
      this.clearAll.bind(this),
      false
    )
  },
  onDeviceReady() {
    this.setupPush()
  },
  setupPush() {
    this.push = PushNotification.init({
      'android': {
        'senderID': '582343470433'
      },
      'ios': {
        'sound': true,
        'vibration': true,
        'badge': true
      },
      'browser': {},
      'windows': {}
    })

    this.push.on('registration', data => {
      const oldRegId = localStorage.getItem('registrationId')
      if (oldRegId !== data.registrationId) {
        localStorage.setItem('registrationId', data.registrationId)
        if (session.logged_in) {
          this.register()
        }
      }
      localStorage.setItem('platformId', cordova.platformId)
    })

    this.bindClearAll()
    this.clearAll()

    this.push.on('error', e => {
      console.warn(e)
    })

    this.push.on('notification', data => {
      console.log('notification event', data)
    })
  },
  clearAll() {
    return this.push.clearAllNotifications()
  },
  getId() {
    return localStorage.getItem('registrationId')
  },
  register() {
    console.log('register')
    return this.vm.$request(`account/devices`, {
      method: 'post',
      body: {
        device_id: this.getId()
      }
    })
  },
  unregister() {
    return this.vm.$request(`account/devices/${this.getId()}`, {
      method: 'delete'
    })
  }
}

module.exports = push
