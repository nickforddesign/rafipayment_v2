<template>
  <div class="new-tenant">

    <field name="first name" :errors="errors">
      <input type="text" name="first name" v-model="first_name" v-validate="'required'">
    </field>

    <field name="last name" :errors="errors">
      <input type="text" name="last name" v-model="last_name" v-validate="'required'">
    </field>

    <field name="email" :errors="errors">
      <input type="text" name="email" v-model="email" v-validate="'required|email'">
    </field>

    <field name="phone" :errors="errors">
      <phone v-model="phone" v-validate.disable="'phone'" name="phone" />
    </field>

    <div class="actions" :errors="errors">
      <button class="primary" @click="validate">Add</button>
    </div>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import { trimObj } from '@/utils'
import filters from '@/modules/filters'
import User from '@/models/user/new'

export default {
  name: 'lease-add--tenant---new',
  data() {
    return {
      first_name: null,
      last_name: null,
      email: null,
      phone: null
    }
  },
  models: {
    user() {
      return new User({
        role: 'tenant'
      }, {
        persist: true
      })
    }
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.$user.save(trimObj(this.$data, null, ''), {
          query: {
            action_save: false
          }
        })
        .then(() => {
          this.complete()
        })
        .catch((error) => {
          let message = 'There is a problem with the data you submitted'
          if (error.error.includes('duplicate_key')) {
            message = 'There is already a user with the '
            if (error.message.email) {
              message += `email address ${error.message.email}`
            } else if (error.message.phone) {
              message += `phone number ${filters.phone(error.message.phone)}`
            }
          }
          app.alert(
            message,
            null,
            'Validation Failed',
            'OK',
            'danger'
          )
        })
      }
    },
    async complete() {
      this.$user = trimObj(this.$data, '')
      this.$parent.addTenant(this.$user)
      this.$parent.new = false
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>