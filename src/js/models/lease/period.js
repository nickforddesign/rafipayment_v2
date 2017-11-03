import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'

export default class Period extends Model {
  static defaults() {
    return {
      name: 'period'
    }
  }
  static schema() {
    return {
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
}
