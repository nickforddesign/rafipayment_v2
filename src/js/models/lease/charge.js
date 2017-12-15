import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'

export default class Period extends Model {
  static defaults() {
    return {
      name: 'charge',
      computed: {
        charge_type() {
          return this.type
            ? this.type
            : this.amount > 0
              ? 'fee'
              : 'credit'
        }
      }
    }
  }
  static schema() {
    return {
      id: {
        type: ObjectId
      },
      date: {
        type: ISODate
      },
      amount: {
        type: Currency
      },
      description: {
        type: String
      },
      type: {
        type: String
      }
    }
  }
}
