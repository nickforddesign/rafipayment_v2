import { path } from 'ramda'
import { Model } from 'vue-models'
import { ISODate, Currency } from '@/modules/types'

export default class Transfer extends Model {
  static defaults() {
    return {
      name: 'transfers',
      computed: {
        basePath() {
          return 'account/payment/transfers'
        },
        source_id() {
          return path(['links', 'source', 'href'], this).split('/').pop()
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
          value: {
            type: Currency
          },
          currency: {
            type: String
          }
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
      links: {
        type: Object
      }
    }
  }
}
