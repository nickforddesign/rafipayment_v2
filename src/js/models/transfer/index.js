import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency, StringOrNull } from '@/modules/types'
import { unitsHelper, sortChronologically } from '@/utils'

const resolve = {
  tenant(model) {
    if (model.resolved) {
      return `${model.resolved.first_name} ${model.resolved.last_name}`
    }
  },
  company(model) {
    if (model.resolved) {
      return model.resolved.name
    }
  }
}

const status_map = {
  completed: 'success',
  created: 'neutral',
  pending: 'neutral',
  scheduled: 'neutral',
  cancelled: 'danger',
  failed: 'danger',
  none: 'none'
}

export default class Transfer extends Model {
  static defaults() {
    return {
      name: 'transfer',
      computed: {
        source_name() {
          return resolve[this.source.model](this.source)
        },
        destination_name() {
          return resolve[this.destination.model](this.destination)
        },
        address() {
          return `${this.property.address}, ${unitsHelper(this.unit.name)}`
        },
        source_status() {
          const status = this.status
          return status
            ? status.split('_').pop()
            : 'none'
        },
        destination_status() {
          const status = this.bank_transfer_status
          return status
            ? status.split('_').pop()
            : 'none'
        },
        transfer_dates_sorted() {
          return Object.keys(this.status_dates).map(key => {
            return {
              name: key,
              date: this.status_dates[key]
            }
          }).sort(sortChronologically)
        },
        bank_transfer_dates_sorted() {
          return Object.keys(this.bank_transfer_status_dates).map(key => {
            return {
              name: key,
              date: this.bank_transfer_status_dates[key]
            }
          }).sort(sortChronologically)
        }
      },
      methods: {
        async fetchCancel() {
          const response = await this.$request(`${this.url}/cancel`)
          this.cancellable = response.cancel
        },
        async cancel() {
          await this.$request(`${this.url}/cancel`, {
            method: 'post'
          })
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
        type: StringOrNull
      },
      status_dates: {
        type: Object,
        properties: {
          customer_transfer_created: {
            type: ISODate
          },
          customer_transfer_completed: {
            type: ISODate
          },
          customer_transfer_failed: {
            type: ISODate
          },
          customer_transfer_cancelled: {
            type: ISODate
          },
          customer_transfer_error: {
            type: ISODate
          }
        }
      },
      bank_transfer_status: {
        type: StringOrNull
      },
      bank_transfer_status_dates: {
        type: Object,
        properties: {
          customer_bank_transfer_created: {
            type: ISODate
          },
          customer_bank_transfer_completed: {
            type: ISODate
          },
          customer_bank_transfer_failed: {
            type: ISODate
          },
          customer_bank_transfer_cancelled: {
            type: ISODate
          },
          customer_bank_transfer_error: {
            type: ISODate
          }
        }
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
        type: Object,
        properties: {
          id: {
            type: ObjectId
          }
        }
      },
      source: {
        type: Object,
        properties: {
          id: {
            type: ObjectId
          }
        }
      },
      cancellable: {
        type: Boolean
      },
      cancelled: {
        type: Boolean
      },
      processed: {
        type: Boolean
      },
      failed: {
        type: Boolean
      },
      failure: {
        type: Object
      }
    }
  }
}
