import moment from 'moment'
import session from '@/session'
import { path } from 'ramda'
import { Model } from 'vue-models'
import { ObjectId, ISODate, ISODateOrNull, Currency } from '@/modules/types'
import { statesHelper, unitsHelper } from '@/utils'

import Property from '@/models/property'
import Unit from '@/models/unit'
import User from '@/models/user'

export default class Lease extends Model {
  static defaults() {
    return {
      name: 'lease',
      computed: {
        type() {
          return this.end_date
            ? 'Fixed term'
            : 'Month to month'
        },
        is_active() {
          return this.current_period !== undefined
        },
        is_complete() {
          return moment.utc(this.end_date) < moment.utc()
        },
        current_period() {
          const dates = this.periods_sorted.reduce((acc, period) => {
            acc.push(moment.utc(period.start_date))
            return acc
          }, [])
          const end_date = moment.utc(this.end_date)
          dates.push(end_date)

          const today = moment.utc().startOf('day')

          let match
          dates.find((start, index) => {
            const next_start = dates[index + 1]
            if (start <= today && (today < next_start || index === dates.length - 2 && today <= end_date || !this.end_date)) {
              return (match = index)
            }
          })
          return match
        },
        periods_sorted() {
          const sorted = this.periods.sort((a, b) => {
            return moment(a.start_date) > moment(b.start_date)
          })
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
        },
        label() {
          const start = moment.utc(this.start_date).format('M/D/YY')
          const end = this.end_date
            ? moment.utc(this.end_date).format('M/D/YY')
            : '∞'
          return `${start} – ${end}`
        },
        tenants_sorted() {
          return this.tenants.sort((a, b) => {
            return a.periods.length
              ? -1
              : 1
          }).sort((a, b) => {
            return a._id === session.$user.id
              ? -1
              : 1
          })
        },
        totals_per_period() {
          const tenant_charges = this.tenants.reduce((acc, tenant) => {
            return acc + tenant.charges.reduce((acc, charge) => {
              return charge.type === 'recurring'
                ? acc + charge.amount
                : acc
            }, 0)
          }, 0)
          const lease_charges = this.charges.reduce((acc, charge) => {
            return charge.type === 'recurring'
              ? acc + charge.amount
              : acc
          }, 0)
          const recurring_charges = tenant_charges + lease_charges

          return this.periods_sorted.map(period => {
            return parseFloat((period.amount + recurring_charges).toFixed(2))
          })
        },
        split_coverage() {
          return this.totals_per_period.map((total, index) => {
            const total_splits = parseFloat(this.tenants.reduce((acc, tenant) => {
              return acc + (path(['amount'], tenant.periods[index]) || 0)
            }, 0).toFixed(2))
            const percentage = Math.floor((total_splits / this.totals_per_period[index]) * 100)
            return percentage > 100 || total <= 0
              ? `100%`
              : `${percentage}%`
          })
        }
      },
      methods: {
        getSuggestedSplit(period_id) {
          const period = this.periods.find(period => period.id === period_id)
          let missing_splits = 0
          const tenant_periods = this.tenants.map(tenant => {
            const tenant_period = tenant.periods.find(period => period.id === period_id)
            if (tenant_period) {
              return tenant_period
            } else {
              missing_splits++
            }
          }).filter(item => item)
          const rent_covered = parseFloat(tenant_periods.reduce((acc, item) => {
            return acc + item.amount
          }, 0).toFixed(2))
          const rent_missing = parseFloat((period.amount - rent_covered).toFixed(2))
          const suggested = rent_missing / missing_splits
          return parseFloat(suggested.toFixed(2))
        },
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
      display_id: {
        type: String
      },
      bill_due_day: {
        type: Number
      },
      start_date: {
        type: ISODate
      },
      end_date: {
        type: ISODateOrNull
      },
      periods: {
        type: Array,
        items: {
          type: Object,
          properties: {
            id: {
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
        type: Array,
        items: {
          type: Object,
          properties: {
            id: {
              type: ObjectId
            },
            amount: {
              type: Currency
            },
            date: {
              type: ISODate
            },
            description: {
              type: String
            },
            type: {
              type: String
            }
          }
        }
      },
      tenants: {
        type: Array,
        items: {
          type: Object,
          properties: User.schema()
        }
      },
      property: {
        type: Object,
        properties: Property.schema()
      },
      unit: {
        type: Object,
        properties: Unit.schema()
      },
      security: {
        type: Currency
      }
    }
  }
}
