import { path } from 'ramda'
import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'
import { unitsHelper } from '@/utils'

export default class Unit extends Model {
  static defaults() {
    return {
      name: 'unit',
      basePath: 'units',
      computed: {
        label() {
          return unitsHelper(this.name)
        },
        address() {
          return `${path(['property', 'address'], this)}, ${this.label}`
        },
        property_name() {
          return this.property.name || this.property.address
        }
      }
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
      // property: {
      //   type: ObjectId
      // },
      bed_count: {
        type: Number
      },
      bath_count: {
        type: Number
      },
      square_footage: {
        type: Number
      },
      property: {
        type: Object,
        properties: {
          _id: {
            type: ObjectId
          }
        }
      }
    }
  }
}
