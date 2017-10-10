// deferred promises

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
