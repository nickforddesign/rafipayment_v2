import {
  parseCurrency,
  prettyCurrency,
  unitsHelper,
  statesHelper,
  sleep,
  load,
  trimObj,
  setStorage,
  getStorage,
  clearStorage,
  Deferred
} from '@/utils'

describe('Deferred', () => {
  it('should resolve deferred promises', () => {
    const deferred = () => {
      const def = new Deferred()
      sleep(40).then(() => {
        def.resolve('ok')
      })
      return def.promise
    }
    return deferred().then((data) => {
      expect(data).toEqual('ok')
    })
  })
})

describe('load', () => {
  it('should load a js file from a cdn', () => {
    expect(load('test.js'))
      .toBeInstanceOf(Object)
  })
})

describe('trimObj', () => {
  it('should trim null values from object', () => {
    const object = {
      key1: true,
      key2: null,
      key3: null
    }
    expect(trimObj(object, null))
      .toEqual({
        key1: true
      })
  })
  it('should trim multiple values from object', () => {
    const object = {
      key1: true,
      key2: '',
      key3: undefined
    }
    expect(trimObj(object, '', undefined))
      .toEqual({
        key1: true
      })
  })

  it('should trim multiple string values from object', () => {
    const object = {
      key1: true,
      key2: '',
      key3: undefined
    }
    expect(trimObj(object, true))
      .toEqual({
        key2: '',
        key3: undefined
      })
  })
})

describe('localStorage', () => {
  it('should set and get localStorage values', () => {
    setStorage('key', 'value')
    expect(getStorage('key'))
      .toBe('value')
  })

  it('should remove localStorage values', () => {
    clearStorage('key')
    expect(getStorage('key'))
      .toBe(undefined)
  })
})

describe('parseCurrency', () => {
  it('should correctly parse $1.00 with no arguments', () => {
    expect(parseCurrency('$1.00'))
      .toBe('1.00')
  })
  it('should correctly parse $1.00 with Number passed as desired output', () => {
    expect(parseCurrency('$1.00', Number))
      .toBe(1)
  })
  it('should correctly parse $9,385.30 with no arguments', () => {
    expect(parseCurrency('$9,385.30'))
      .toBe('9385.30')
  })
  it('should correctly parse $9,385.30 with Number passed as desired output', () => {
    expect(parseCurrency('$9,385.30', Number))
      .toBe(9385.3)
  })
})

describe('prettyCurrency', () => {
  it('should correctly parse 1 with no arguments', () => {
    expect(prettyCurrency(1))
      .toBe('$1.00')
  })
  it('should correctly parse 84953.2 with no arguments', () => {
    expect(prettyCurrency(84953.2))
      .toBe('$84,953.20')
  })
  it('should correctly parse 84953.2 with a sign argument', () => {
    expect(prettyCurrency(84953.2, '€'))
      .toBe('€84,953.20')
  })
  it('should correctly parse 84953.2 with false as a sign argument', () => {
    expect(prettyCurrency(84953.2, false))
      .toBe('84,953.20')
  })
})

describe('unitsHelper', () => {
  it('should correctly parse 1', () => {
    expect(unitsHelper(1))
      .toBe('#1')
  })
  it('should correctly parse Unit 1', () => {
    expect(unitsHelper('Unit 1'))
      .toBe('Unit 1')
  })
})

describe('statesHelper', () => {
  it('should correctly handle MA', () => {
    expect(statesHelper('MA'))
      .toBe('Massachusetts')
  })
  it('should correctly handle Massachusetts', () => {
    expect(statesHelper('Massachusetts'))
      .toBe('MA')
  })
})
