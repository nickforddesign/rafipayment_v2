import { Model } from 'vue-models'
import { ObjectId, ISODate, Currency } from '@/modules/types'
import { unitsHelper } from '@/utils'

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
  cancelled: 'danger',
  failed: 'danger'
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
          return this.status.split('_').pop()
        },
        destination_status() {
          const status = this.bank_transfer_status || this.status
          return status.split('_').pop()
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
