// import { path } from 'ramda'
import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'

export default class Transfer extends Model {
  static defaults() {
    return {
      name: 'transfer'
      // computed: {
        // basePath() {
        //   return 'transfers'
        // },
        // source_id() {
        //   return path(['links', 'source', 'href'], this).split('/').pop()
        // }
      // }
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
      removed: {
        type: Boolean
      },
      bill: {
        type: ObjectId
      },
      property: {
        type: ObjectId
      },
      unit: {
        type: ObjectId
      },
      lease: {
        type: ObjectId
      },
      status: {
        type: String
      },
      type: {
        type: String
      },
      amount: {
        type: Currency
      },
      message: {
        type: String
      },
      scheduled_date: {
        type: ISODate
      },
      correlation_id: {
        type: ObjectId
      },
      responses: {
        type: Array
      },
      destination: {
        type: Object
      },
      source: {
        type: Object
      }
    }
  }
}
