/* global StatusBar */

import moment from 'moment'

import { pickBy } from 'ramda'

// convert state <-> abbr

import statesHelper from './states'
export { statesHelper }

// check if userAgent is mobile

export function isMobile () {
  const regex = /(iP(od|hone|ad))|(IEMobile)|(Windows Phone)|(Blackberry)|(BB10)|(Android.*Mobile)/i
  return regex.test(window.navigator.userAgent)
}

// toggle cordova status bar

export const toggleStatusBar = (val) => {
  if (process.env.NODE_ENV === 'cordova') {
    try {
      return val ? StatusBar.show() : StatusBar.hide()
    } catch (e) {}
  }
}

// deferred promise

export function Deferred () {
  this.resolve = null
  this.reject = null
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })
  Object.freeze(this)
}

// wait for x ms

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// load scripts from cdn

export function load (url) {
  return new Promise((resolve, reject) => {
    let script = window.document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = url
    script.onload = resolve
    script.onerror = reject
    window.document.head.appendChild(script)
  })
}

// trim properties from obj if value is in array

export function trimObj (obj, ...values) {
  return pickBy((val, key) => {
    return ![...values].includes(val)
  }, obj)
}

// check if local storage is supported

export function localStorageSupported () {
  try {
    localStorage.setItem('_', '_')
    localStorage.removeItem('_')
    return true
  } catch (error) {
    console.warn(error)
    return false
  }
}

const hasLocalStorage = localStorageSupported()

export function setStorage(key, value) {
  return hasLocalStorage
    ? localStorage.setItem(key, value)
    : null
}

export function getStorage(key) {
  return hasLocalStorage
    ? localStorage.getItem(key)
    : null
}

export function clearStorage(key) {
  return hasLocalStorage
    ? localStorage.removeItem(key)
    : null
}

// reset state of model or vuex store

export function resetState (state, defaults) {
  return Object.keys(defaults).forEach(key => {
    state[key] = defaults[key]
  })
}

// reset all modules of a vuex store

export function resetAllStates (state, modules) {
  Object.keys(modules).forEach(key => {
    resetState(state[key], modules[key].defaults())
  })
}

// parse currency strings to valid currency floats

export function parseCurrency (value, constructor, abs) {
  if (!['string', 'number'].includes(typeof value)) return
  if (/[^$,.\d\-+]/.test(value)) return false
  const parsed = parseFloat(('' + value).replace(/[$,]/g, ''))
  const amount = abs
    ? Math.abs(parsed)
    : parsed
  const fixed = amount.toFixed(2)
  if (typeof fixed !== 'string') return false
  return constructor
    ? new constructor(fixed).valueOf()
    : fixed
}

// make parsed currency floats look pretty

export function prettyCurrency (value, _symbol = '$') {
  let parsed = parseFloat(value)
  const leader = parsed < 0
    ? '-'
    : ''
  parsed = Math.abs(parsed)
  const number_string = parseCurrency(parsed)
  if (number_string === false) {
    return ''
  }
  const symbol = _symbol || ''
  return leader + symbol + number_string.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

// convert unit number to a pretty unit number

export function unitsHelper (number) {
  if (/^[\d]/.test(number)) number = '#' + number
  return number
}

// get position data for touch

export function getPanStartPosition (event) {
  const delta_x = event.deltaX
  const delta_y = event.deltaY
  const final_x = event.srcEvent.pageX || event.srcEvent.screenX || 0
  const final_y = event.srcEvent.pageY || event.srcEvent.screenY || 0

  return {
    x: final_x - delta_x,
    y: final_y - delta_y
  }
}

// turn mix, max dates into months array

export function getMonthsArray (min, max) {
  const start = moment.utc(min.$date).startOf('month')
  const end = moment.utc(max.$date).endOf('month')
  const array = []
  let date = start
  while (date <= end) {
    array.push(date.format('MM/YYYY'))
    date = date.add(1, 'months')
  }
  return array
}
