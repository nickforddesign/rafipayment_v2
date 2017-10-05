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
