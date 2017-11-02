import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'
import { parseCurrency, unitsHelper } from '@/utils'

export default class Bill extends Model {
  static defaults() {
    return {
      name: 'bill',
      computed: {
        target() {
          if ('address' in this.property) {
            return `${this.property.address}, ${unitsHelper(this.unit.name)}`
          }
        },
        has_transfers() {
          return !!this.transfers.length
        },
        total() {
          return this.tenants.reduce((acc, tenant) => {
            return acc + tenant.charges.reduce((acc, charge) => {
              return acc + charge.amount
            }, 0)
          }, 0)
        },
        balance() {
          if (this.has_transfers) {
            if (this.transfers_resolved.length) {
              return this.total - this.transfers_resolved.reduce((acc, transfer) => {
                return acc + parseCurrency(transfer.amount.value, Number)
              }, 0)
            }
          } else {
            return this.total
          }
        }
      },
      methods: {
        async fetchTransfers() {
          this.transfers_resolved = await this.$request(`${this.url}/transfers`)
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
        type: ObjectId
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
      transfers_resolved: {
        type: Array
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
