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
      company: {
        type: ObjectId
      },
      data: {
        type: Object
      },
      error: {
        type: Object
      },
      parties: {
        type: Array,
        items: {
          type: ObjectId
        }
      },
      source: {
        type: Object,
        properties: {
          id: {
            type: ObjectId
          },
          user_agent: {
            type: Object
          }
        }
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
