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
      },
      first_name: {
        type: String
      },
      last_name: {
        type: String
      },
      email: {
        type: String
      },
      phone: {
        type: String
      },
      postal_code: {
        type: String
      },
      address1: {
        type: String
      },
      address2: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      date_of_birth: {
        type: String
      },
      ein: {
        type: String
      },
      business_classification: {
        type: String
      },
      business_type: {
        type: String
      },
      payment: {
        type: Object
      },
      removed: {
        type: Boolean
      },
      admins: {
        type: Array
      }
    }
  }
}
