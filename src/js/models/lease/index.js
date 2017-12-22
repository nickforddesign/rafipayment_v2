import moment from 'moment'
import session from '@/session'
import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'
import { statesHelper, unitsHelper } from '@/utils'

import Property from '@/models/property'
import Unit from '@/models/unit'
import User from '@/models/user'

export default class Lease extends Model {
  static defaults() {
    return {
      name: 'lease',
      computed: {
        is_active() {
          return this.current_period !== undefined
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
          return `${moment.utc(this.start_date).format('M/D/YY')} – ${moment.utc(this.end_date).format('M/D/YY')}`
        },
        tenants_sorted() {
          return this.tenants.sort((a, b) => {
            return a.period.length
              ? -1
              : 1
          }).sort((a, b) => {
            return a._id === session.$user.id
              ? -1
              : 1
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
          const rent_covered = tenant_periods.reduce((acc, item) => {
            return acc + item.amount
          }, 0)
          const rent_missing = period.amount - rent_covered
          const suggested = rent_missing / missing_splits
          return suggested
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
        type: ISODate
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
      }
    }
  }
}
