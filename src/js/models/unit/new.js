import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'

export default class Unit extends Model {
  static defaults() {
    return {
      name: 'unit',
      basePath: 'units'
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
      property: {
        type: ObjectId
      },
      bed_count: {
        type: Number
      },
      bath_count: {
        type: Number
      },
      square_footage: {
        type: Number
      }
    }
  }
}
