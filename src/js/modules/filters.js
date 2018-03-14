import { prettyCurrency } from '@/utils'
import moment from 'moment'

const filters = {
  currency(value) {
    return value !== undefined
      ? prettyCurrency(value)
      : '–'
  },
  lowercase(value = '') {
    return value.toLowerCase()
  },
  uppercase(value = '') {
    return value.toUpperCase()
  },
  capitalize(value = '') {
    return value.replace(/\b\w/g, l => l.toUpperCase())
  },
  replace(value = '', pattern = '_', new_char = ' ', flags = 'g') {
    const regex = new RegExp(pattern, flags)
    return value.replace(regex, l => new_char)
  },
  pluralize(value = 0, noun = 'item') {
    let output = `${value} ${noun}`
    if (value !== 1) output = output + 's'
    return output
  },
  ordinal(value = '') {
    const options = ['th', 'st', 'nd', 'rd']
    const remainder = value % 100
    return value + (options[(remainder - 20) % 10] || options[remainder] || options[0])
  },
  moment(value = '', format = 'M/D/YY', utc = false) {
    const target = utc
      ? moment.utc
      : moment
    return value
      ? target(value).format(format)
      : '–'
  },
  phone(value = '') {
    if (value) {
      const area_code = value.slice(0, 3)
      const exchange = value.slice(3, 6)
      const line_number = value.slice(6, 10)
      return `(${area_code}) ${exchange}-${line_number}`
    } else {
      return '–'
    }
  },
  limit(value = '', length = 20) {
    let output = value
    if (value.length > length) {
      output = value.substring(0, length)
    }
    while (output[output.length - 1] === ' ') {
      output = output.substring(0, output.length - 1)
    }
    if (output !== value) {
      output = `${output}...`
    }
    return output
  }
}

export default filters
