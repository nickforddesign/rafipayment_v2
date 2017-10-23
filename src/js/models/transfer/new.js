import { Model } from 'vue-models'
import { ObjectId, Currency } from '@/modules/types'

export default class Transfer extends Model {
  static defaults() {
    return {
      name: 'transfers',
      computed: {
        basePath() {
          return 'account/payment/transfers'
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
      source_funding_source: {
        type: String
      },
      destination_user: {
        type: ObjectId
      }
    }
  }
}
