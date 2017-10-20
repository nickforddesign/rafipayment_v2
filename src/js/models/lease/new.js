import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'

export default class Lease extends Model {
  static defaults() {
    return {
      name: 'lease'
    }
  }
  static schema() {
    return {
      bill_due_day: {
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
      property: {
        type: ObjectId
      },
      tenants: {
        type: Object
      },
      // tenants: {
      //   type: Array,
      //   items: {
      //     type: ObjectId
      //   }
      // },
      unit: {
        type: ObjectId
      }
    }
  }
}
