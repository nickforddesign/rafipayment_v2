import { Model } from 'vue-models'
import { ObjectId, ISODate } from '@/modules/types'

const defaults = {
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

export default class User extends Model {
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
      role: {
        type: String
      },
      status: {
        type: Object
      }
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
