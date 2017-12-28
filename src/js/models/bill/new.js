import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'

export default class Bill extends Model {
  static defaults() {
    return {
      name: 'bill'
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
      property: {
        type: ObjectId
      },
      unit: {
        type: ObjectId
      },
      lease: {
        type: ObjectId
      },
      due_date: {
        type: ISODate
      },
      charges: {
        type: Array,
        items: {
          type: Object,
          properties: {
            amount: {
              type: Currency
            },
            description: {
              type: String
            }
          }
        }
      },
      tenants: {
        type: Array,
        items: {
          type: Object,
          properties: {
            id: {
              type: ObjectId
            }
          }
          // type: Object,
          // properties: {
          //   id: {
          //     type: ObjectId
          //   },
          //   charges: {
          //     type: Array,
          //     items: {
          //       type: Object,
          //       properties: {
          //         amount: {
          //           type: Currency
          //         }
          //       }
          //     }
          //   }
          // }
        }
      }
    }
  }
}
