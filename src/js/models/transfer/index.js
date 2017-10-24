import { Model } from 'vue-models'
import { ISODate, Currency } from '@/modules/types'

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
      created: {
        type: ISODate
      },
      status: {
        type: String
      },
      amount: {
        type: Object,
        properties: {
          value: Currency
        }
      },
      clearing: {
        type: Object
      },
      individualAchId: {
        type: String
      },
      correlationId: {
        type: String
      },
      _links: {
        type: Object
      }
    }
  }
}
