import moment from 'moment'
import { Model } from 'vue-models'
import { ObjectId, ISODate, ISODateOrNull, Currency } from '@/modules/types'

export default class Lease extends Model {
  static defaults() {
    return {
      name: 'lease',
      computed: {
        start_date() {
          return this.periods_sorted[0].start_date
        },
        periods_sorted() {
          const sorted = this.periods.sort((a, b) => {
            return moment(a.start_date) > moment(b.start_date)
          })
          return sorted
        }
      }
    }
  }
  static schema() {
    return {
      bill_due_day: {
        type: Number
      },
      end_date: {
        type: ISODateOrNull
      },
      periods: {
        type: Array,
        items: {
          type: Object,
          properties: {
            amount: {
              type: Currency
            },
            start_date: {
              type: ISODate
            }
          }
        }
      },
      charges: {
        type: Array,
        items: {
          type: Object,
          properties: {
            amount: {
              type: Currency
            },
            date: {
              type: ISODate
            },
            type: {
              type: String
            },
            description: {
              type: String
            }
          }
        }
      },
      property: {
        type: ObjectId
      },
      tenants: {
        type: Array,
        items: {
          type: Object,
          properties: {
            id: {
              type: ObjectId
            },
            charges: {
              type: Array,
              items: {
                type: Object,
                properties: {
                  amount: {
                    type: Currency
                  },
                  description: {
                    type: String
                  },
                  type: {
                    type: String
                  },
                  date: {
                    type: ISODate
                  }
                }
              }
            }
          }
        }
      },
      unit: {
        type: ObjectId
      },
      security: {
        type: Currency
      }
    }
  }
}
