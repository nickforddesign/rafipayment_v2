import { Model } from 'vue-models'
import { ObjectId, ISODate, StringOrNull } from '@/modules/types'

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
      company: {
        type: ObjectId
      },
      updated: {
        type: ISODate
      },
      created: {
        type: ISODate
      },
      removed: {
        type: Boolean
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
      postal_code: {
        type: String
      },
      country: {
        type: String
      },
      place_id: {
        type: String
      },
      funding_source: {
        type: StringOrNull
      }
    }
  }
}
