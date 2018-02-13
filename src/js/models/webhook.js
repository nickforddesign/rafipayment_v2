import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'

export default class Webhook extends Model {
  static defaults() {
    return {
      name: 'webhook'
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
      body: {
        type: Object
      },
      headers: {
        type: Object
      }
    }
  }
}
