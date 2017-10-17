import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'

export default class Property extends Model {
  static defaults() {
    return {
      name: 'property',
      basePath: 'properties'
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
      },
      address: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      zip: {
        type: String
      },
      country: {
        type: String
      },
      place_id: {
        type: String
      }
    }
  }
}
