import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'

export default class Period extends Model {
  static defaults() {
    return {
      name: 'charge'
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
