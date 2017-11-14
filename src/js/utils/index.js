import { pickBy } from 'ramda'

// convert state <-> abbr

import statesHelper from './states'
export { statesHelper }

// check if userAgent is mobile

export function isMobile () {
  const regex = /(iP(od|hone|ad))|(IEMobile)|(Windows Phone)|(Blackberry)|(BB10)|(Android.*Mobile)/i
  return regex.test(window.navigator.userAgent)
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
