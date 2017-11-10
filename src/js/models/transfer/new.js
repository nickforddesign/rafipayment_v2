import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'

export default class Transfer extends Model {
  static defaults() {
    return {
      name: 'transfers',
      computed: {
        basePath() {
          return 'account/transfers'
        }
      }
    }
  }
  static schema() {
    return {
      id: {
        type: String
      },
      amount: {
        type: Currency
      },
      scheduled_date: {
        type: ISODate
      },
      source_funding_source: {
        type: String
      },
      destination_user: {
        type: ObjectId
      }
    }
  }
}
