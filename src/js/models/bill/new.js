import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'

export default class Bill extends Model {
  schema() {
    return {
      id: {
        type: ObjectId
      },
      created: {
        type: ISODate
      }
    }
  }
}
