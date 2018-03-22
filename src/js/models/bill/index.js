import moment from 'moment'
import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'
import { unitsHelper } from '@/utils'
import Transfer from '@/models/transfer'

const excluded_transfer_statuses = [
  'customer_transfer_cancelled',
  'customer_transfer_failed'
  // 'customer_transfer_scheduled'
]

const status_map = {
  unpaid: 'danger',
  overpaid: 'warning',
  balance: 'warning',
  credited: 'success',
  paid: 'success',
  no_charges: 'success'
}

const friendly_statuses = {
  paid: 'Paid in Full',
  overpaid: 'Overpaid',
  balance: 'Balance Remaining',
  unpaid: 'Unpaid',
  credited: 'Credited',
  no_charges: 'No Charges'
}

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
          const total = this.type === 'manual'
            ? this.charges.reduce((acc, charge) => {
              return acc + charge.amount
            }, 0)
            : this.tenants.reduce((acc, tenant) => {
              return acc + tenant.charges.reduce((acc, charge) => {
                return acc + charge.amount
              }, 0)
            }, 0)
          return parseFloat(total.toFixed(2))
        },
        balance() {
          if (this.has_transfers) {
            return parseFloat(this.total - this.transfers.reduce((acc, item) => {
              return !excluded_transfer_statuses.includes(item.status)
                ? acc + item.amount
                : acc
            }, 0).toFixed(2))
          } else {
            return this.total
          }
        },
        bill_status() {
          const due_date = moment.utc(this.due_date).startOf('day')
          const today = moment.utc().startOf('day')
          let status
          if (this.balance <= 0) {
            status = 'paid'
          } else if (due_date < today) {
            status = 'overdue'
          } else if (due_date > today) {
            status = 'future'
          } else if (due_date.isSame(today)) {
            status = 'due'
          }
          return status
        },
        days_from_due() {
          const due_date = moment.utc(this.due_date).startOf('day')
          const today = moment.utc().startOf('day')
          const days = Math.abs(moment.duration(due_date.diff(today)).asDays())
          return days
        },
        message() {
          const days = this.days_from_due

          let message
          switch (this.bill_status) {
            case 'paid':
              message = `Paid in full`
              break
            case 'overdue':
              message = `Overdue ${days} days`
              break
            case 'future':
              const autopay = false
              message = autopay
                ? `Autopay in ${days} days`
                : `Due in ${days} days`
              break
            case 'due':
              message = `Due today`
              break
          }
          return message
        }
      },
      methods: {
        getFriendlyStatus(status) {
          return friendly_statuses[status]
        },
        getCharges(id) {
          const output = id
            ? this.tenants.find(tenant => tenant.id === id).charges
            : this.charges
          return output
        },
        getTransfers(id) {
          return id
            ? this.transfers.filter(transfer => transfer.source.id === id)
            : this.transfers
        },
        getTotalCharges(id) {
          return parseFloat((this.getCharges(id).reduce((acc, item) => acc + item.amount, 0).toFixed(2)))
        },
        getTotalTransfers(id) {
          const transfers = this.getTransfers(id)
          return parseFloat(transfers.reduce((acc, item) => {
            return !excluded_transfer_statuses.includes(item.status)
              ? acc + item.amount
              : acc
          }, 0).toFixed(2))
        },
        getStatus(id) {
          const charges = this.getCharges(id)
          const total_charges = this.getTotalCharges(id)
          const transfers = this.getTransfers(id)
          const total_transfers = this.getTotalTransfers(id)
          const tenant_balance = ((total_charges * 100) - (total_transfers * 100)) / 100
          let output
          if (total_charges < 0 && !transfers.length) {
            output = 'credited'
          } else if (!total_charges && charges.length === 1) {
            output = 'no_charges'
          } else if (tenant_balance < 0 && transfers.length) {
            output = 'overpaid'
          } else if (!tenant_balance) {
            output = 'paid'
          } else if (!transfers.length) {
            output = 'unpaid'
          } else {
            output = 'balance'
          }
          return output
        },
        statusClass(status) {
          return status_map[status]
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
      active: {
        type: Boolean
      },
      display_id: {
        type: String
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
      period: {
        type: ObjectId
      },
      type: {
        type: String
      },
      due_date: {
        type: ISODate
      },
      transfers: {
        type: Array,
        items: {
          type: Object,
          properties: Transfer.schema()
        }
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
