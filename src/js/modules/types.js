import { Type } from 'vue-models'

import { parseCurrency, prettyCurrency } from '@/utils'

export class ObjectId extends Type {
  constructor(value) {
    super(value, '$oid')
    return this
  }
}

export class ISODate extends Type {
  constructor(value) {
    super(value, '$date')
    return this
  }
  in(value) {
    const parsed = new Date(value)
    if (!isNaN(parsed.getTime())) {
      this.value = value
    } else {
      throw new TypeError(`Invalid date: "${value}"`)
    }
  }
  out() {
    return this.value
      ? new Date(this.value).toISOString()
      : undefined
  }
}

export class ISODateOrNull extends ISODate {
  constructor(value) {
    super(value)
    return this
  }
  out() {
    return this.value
      ? new Date(this.value).toISOString()
      : null
  }
}

export class Currency extends Type {
  constructor(value) {
    super(value)
    return this
  }
  in(value) {
    this.value = parseCurrency(value, Number)
    return this
  }
  pretty() {
    return prettyCurrency(this.value)
  }
}

export class CurrencyOrNull extends Currency {
  constructor(value) {
    super(value)
    return this
  }
  out() {
    return this.value !== undefined
      ? this.value
      : null
  }
}

export class StringOrNull extends Type {
  out() {
    return !this.value
      ? null
      : this.value
  }
}
