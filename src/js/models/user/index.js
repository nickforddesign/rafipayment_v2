import { Model } from 'vue-models'
import { ObjectId, ISODate, StringOrNull } from '@/modules/types'

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
        // full_name() {
        //   return this.role
        //     ? `${this.first_name} ${this.last_name}`
        //     : ``
        // },
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
      removed: {
        type: Boolean
      },
      company: {
        type: ObjectId
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
        type: StringOrNull
      },
      role: {
        type: String
      },
      status: {
        type: Object
      },
      payment: {
        type: Object
      },
      session: {
        type: Object,
        properties: {
          access: {
            type: Object,
            properties: {
              expiration: {
                type: ISODate
              }
            }
          },
          refresh: {
            type: Object,
            properties: {
              expiration: {
                type: ISODate
              }
            }
          }
        }
      },
      avatar_color: {
        type: String
      },
      password: {
        // type: Boolean
      },
      charges: {
        type: Array
      },
      periods: {
        type: Array,
        items: {
          type: Object,
          properties: {
            autopay: {
              type: Boolean
            },
            split: {
              type: Number
            },
            id: {
              type: ObjectId
            }
          }
        }
      }
    }
  }
}
