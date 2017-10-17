import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'

export default class User extends Model {
  static defaults() {
    return {
      name: 'user',
      computed: {
        basePath() {
          if (this.role) {
            const basePath = this.$options.basePath
            return basePath || this.role + 's'
          } else {
            return ''
          }
        },
        full_name() {
          return this.role
            ? `${this.first_name} ${this.last_name}`
            : ``
        },
        initials() {
          return this.role
            ? `${this.first_name[0]}${this.last_name[0]}`.toUpperCase()
            : ``
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
      company: {
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
      role: {
        type: String
      },
      status: {
        type: Object
      }
    }
  }
}
