// import { path, clone } from 'ramda'
import moment from 'moment'
// import session from '@/session'
import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'
import { parseCurrency, statesHelper, unitsHelper } from '@/utils'

import Property from '@/models/property'
import Unit from '@/models/unit'
import User from '@/models/user'

console.log(User.schema())

export default class Lease extends Model {
  static defaults() {
    return {
      name: 'lease',
      beforeMount() {
        this.split_amount = undefined
      },
      computed: {
        start_date() {
          return this.periods_sorted[0].start_date
        },
        periods_sorted() {
          const sorted = this.periods.sort((a, b) => {
            return moment(a.start_date) > moment(b.start_date)
          })
          // console.log({sorted})
          return sorted
        },
        address() {
          const property = this.property
          const unit = this.unit
          return `${property.address}, ${unitsHelper(unit.name)}`
        },
        full_address() {
          const property = this.property
          return `${this.address}, ${property.city} ${statesHelper(property.state)}`
        },
        term() {
          const { start, end } = this.getTerm('l')
          return `${start} – ${end || 'N/A'}`
        },
        length() {
          const { start, end } = this.getTerm(false)
          if (!end) return 'N/A'
          const duration = moment.duration(end.diff(start))

          // round to the nearest .5 and remove the decimal if zero
          const months = parseFloat((Math.round(duration.asMonths() * 2) / 2).toFixed(1))
          const days = duration.asDays()
          const auto = months > 1
            ? months + ' Months'
            : days + ' Days'
          return { months, days, auto }
        }
        /*
        tenants_sorted() {
          return this.tenants.sort((a, b) => {
            // return _.get(this.split, a._id) !== undefined
            return path([a._id], this.split) !== undefined
              ? -1
              : 1
          }).sort((a, b) => {
            return a._id === session.$user.id
              ? -1
              : 1
          })
        },
        splits() {
          // let split = _.merge({}, this.split || {})
          let split = clone(this.split || {})
          if (this.split_amount !== false) {
            split[session.$user.id] = this.split_amount
          }
          return split
        },
        splits_by_tenant_id() {
          let split = {}
          this.tenants.map((tenant) => {
            // split[tenant._id] = _.get(this.splits, tenant._id)
            split[tenant._id] = path(tenant._id, [this.splits])
          })
          return split
        },
        splits_value_array() {
          return Object.values(this.splits_by_tenant_id)
        },
        total_rent_covered() {
          return this.splits_value_array.reduce((sum, value) => {
            return value === undefined
              ? sum
              : sum + value
          }, 0)
        },
        missing_splits() {
          return this.splits_value_array.reduce((sum, value) => {
            return value === undefined
              ? ++sum
              : sum
          }, 0)
        },
        rent_remaining() {
          return this.rent - this.total_rent_covered
        },
        total_split() {
          return Object.keys(this.split).reduce((acc, item) => {
            return acc + this.split[item]
          }, 0)
        },
        rent_coverage() {
          return Math.floor(this.total_split / this.rent * 100)
        }
        */
      },
      methods: {
        getTerm(format = 'MM/DD/YYYY') {
          const utc = moment.utc
          const start = format
            ? utc(this.start_date).format(format)
            : utc(this.start_date)
          let end
          if (this.end_date) {
            end = format
              ? utc(this.end_date).format(format)
              : utc(this.end_date)
          } else {
            end = false
          }
          return { start, end }
        },
        validateSplit(input) {
          this.split_amount = parseCurrency(input, Number)
          // if input exceeds rent remaining, use max possible amount
          let output
          if (this.rent_remaining < 0) {
            this.split_amount = null
            output = {
              validated: false,
              amount: this.rent_remaining
            }
          } else if (isNaN(this.split_amount)) {
            output = {
              validated: false,
              amount: ''
            }
          } else {
            output = {
              validated: true,
              amount: this.split_amount
            }
          }
          this.split_amount = false
          return output
        }
      }
    }
  }
  static schema() {
    return {
      id: {
        type: ObjectId
      },
      company: {
        type: ObjectId
      },
      updated: {
        type: ISODate
      },
      created: {
        type: ISODate
      },
      removed: {
        type: Boolean
      },
      autopay: {
        type: Object
      },
      bill_due_day: {
        type: Number
      },
      bill_generation_day: {
        type: Number
      },
      bill_overdue_day: {
        type: Number
      },
      end_date: {
        type: ISODate
      },
      periods: {
        type: Array,
        items: {
          type: Object,
          properties: {
            _id: {
              type: ObjectId
            },
            start_date: {
              type: ISODate
            },
            amount: {
              type: Currency
            }
          }
        }
      },
      charges: {
        type: Object,
        scheduled: {
          type: Array,
          amount: Currency,
          date: ISODate
        },
        recurring: {
          type: Array,
          amount: Currency
        }
      },
      split: {
        type: Object
      },
      first_bill_generation_date: {
        type: ISODate
      },
      last_bill_generation_date: {
        type: ISODate
      },
      property: {
        type: Object,
        properties: Property.schema()
      },
      unit: {
        type: Object,
        properties: Unit.schema()
      },
      status: {
        type: Object
      },
      tenants: {
        type: Array,
        items: {
          type: Object,
          properties: User.schema()
        }
      },
      type: {
        type: String
      },
      split_amount: {
        type: Boolean,
        default: false
      }
    }
  }
}
