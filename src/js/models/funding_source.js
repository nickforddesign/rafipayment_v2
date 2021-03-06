import { Model } from 'vue-models'
import { ISODate } from '@/modules/types'

export default class FundingSource extends Model {
  static defaults() {
    return {
      name: 'funding_source',
      basePath: 'account/funding_sources'
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
        type: Boolean
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
      },
      amount1: {
        type: Object
      },
      amount2: {
        type: Object
      }
    }
  }
}
