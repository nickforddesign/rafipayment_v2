import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'

export default class Company extends Model {
  static defaults() {
    return {
      name: 'company',
      basePath: 'companies'
    }
  }
  static schema() {
    return {
      id: {
        type: ObjectId
      },
      updated: {
        type: ISODate
      },
      created: {
        type: ISODate
      },
      name: {
        type: String
      }
    }
  }
}
