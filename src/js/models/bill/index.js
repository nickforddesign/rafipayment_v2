import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'
import { parseCurrency, unitsHelper } from '@/utils'

export default class Bill extends Model {
  static defaults() {
    return {
      name: 'bill',
      computed: {
        target() {
          if (this.property) {
            return `${this.property.address}, ${unitsHelper(this.unit.name)}`
          }
        },
        has_transfers() {
          return !!this.transfers.length
        },
        total() {
          console.log(this.type)
          return this.type === 'manual'
            ? this.charges.reduce((acc, charge) => {
              return acc + charge.amount
            }, 0)
            : this.tenants.reduce((acc, tenant) => {
              return acc + tenant.charges.reduce((acc, charge) => {
                return acc + charge.amount
              }, 0)
            }, 0)
        },
        balance() {
          if (this.has_transfers) {
            return this.total - this.transfers.reduce((acc, transfer) => {
              return !['customer_transfer_cancelled', 'customer_transfer_failed'].includes(transfer.status)
                ? acc + parseCurrency(transfer.amount, Number)
                : acc
            }, 0)
          } else {
            return this.total
          }
        }
      }
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
      property: {
        type: ObjectId
      },
      unit: {
        type: Object,
        properties: {
          id: {
            type: ObjectId
          }
        }
      },
      lease: {
        type: ObjectId
      },
      type: {
        type: String
      },
      due_date: {
        type: ISODate
      },
      transfers: {
        type: Array
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
            },
            charges: {
              type: Array
            },
            type: {
              type: String
            },
            description: {
              type: String
            },
            amount: {
              type: Currency
            }
          }
        }
      }
    }
  }
}
