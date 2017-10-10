// deferred promises

import statesHelper from './states'

export { statesHelper }

export function Deferred () {
  this.resolve = null
  this.reject = null
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })
  Object.freeze(this)
}

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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

export function resetState (state, defaults) {
  return Object.keys(defaults).forEach(key => {
    state[key] = defaults[key]
  })
}

export function resetAllStates (state, modules) {
  Object.keys(modules).forEach(key => {
    resetState(state[key], modules[key].defaults())
  })
}

// parse currency strings to valid currency floats

export const parseCurrency = (value, constructor) => {
  if (!['string', 'number'].includes(typeof value)) return
  // check for invalid chars
  if (/[^$,.\d\-+]/.test(value)) return false
  const amount = parseFloat(('' + value).replace(/[$,]/g, '')).toFixed(2)
  if (typeof amount !== 'string') return false
  return constructor
    ? new constructor(amount).valueOf()
    : amount
}

// make parsed currency floats look pretty

export const prettyCurrency = (value, _symbol = '$') => {
  let parsed = parseFloat(value)
  let leader = ''
  if (parsed < 0) leader = '-'
  parsed = Math.abs(parsed)
  const number_string = parseCurrency(parsed)
  if (number_string === false) return ''
  const symbol = _symbol || ''
  return leader + symbol + number_string.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

// convert unit number to a pretty unit number

export const unitsHelper = (number) => {
  if (/^[\d]/.test(number)) number = '#' + number
  return number
}
