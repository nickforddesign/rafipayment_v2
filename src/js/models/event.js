import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'

export default class UserEvent extends Model {
  static defaults() {
    return {
      name: 'event'
    }
  }
  static schema() {
    return {
      id: {
        type: ObjectId
      },
      created: {
        type: ISODate
      },
      updated: {
        type: ISODate
      },
      data: {
        type: Object
      },
      error: {
        type: Object
      },
      parties: {
        type: Array
      },
      source: {
        type: Object
      },
      success: {
        type: Boolean
      },
      target: {
        type: Object
      },
      title: {
        type: String
      },
      type: {
        type: String
      }
    }
  }
}
