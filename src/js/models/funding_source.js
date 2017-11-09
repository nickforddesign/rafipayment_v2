import { Model } from 'vue-models'
import { ISODate } from '@/modules/types'

export default class FundingSource extends Model {
  static defaults() {
    return {
      name: 'funding_source',
      basePath: 'account/payment/funding_sources'
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
      removed: {
        type: Boolean
      },
      bankAccountType: {
        type: String
      },
      bankName: {
        type: String
      },
      channels: {
        type: Array
      },
      fingerprint: {
        type: String
      },
      microdeposits: {
        type: String
      },
      microdeposits_data: {
        type: Object
      },
      name: {
        type: String
      },
      status: {
        type: String
      },
      type: {
        type: String
      }
    }
  }
}
