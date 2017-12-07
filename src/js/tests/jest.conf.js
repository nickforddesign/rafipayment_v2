global.fetch = require('jest-fetch-mock')

global.localStorage = (() => {
  let store = {}
  return {
    getItem: function(key) {
      return store[key]
    },
    setItem: function(key, value) {
      if (value !== undefined) {
        store[key] = value.toString()
      }
    },
    clear: function() {
      store = {}
    },
    removeItem: function(key) {
      delete store[key]
    }
  }
})()

