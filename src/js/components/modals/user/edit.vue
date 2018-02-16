<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit {{ role | capitalize }}</h1>
    <div slot="body">
      <field name="first name" :errors="errors">
        <input type="text" v-model="first_name" v-validate.disable="'required'" name="first name" ref="default" autocomplete="nopls">
      </field>

      <field name="last name" :errors="errors">
        <input type="text" v-model="last_name" v-validate.disable="'required'" name="last name" autocomplete="nopls">
      </field>

      <field name="email" :errors="errors">
        <input type="email" v-model="email" v-validate.disable="'required|email'" name="email" autocomplete="nopls">
      </field>

      <field name="phone" :errors="errors">
        <phone v-model="phone" v-validate.disable="'phone'" name="phone" autocomplete="nopls" />
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { path } from 'ramda'
import { trimObj } from '@/utils'
import filters from '@/modules/filters'
import app from '@/app'

export default {
  name: 'modal-user--edit',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      first_name: this.model.first_name,
      last_name: this.model.last_name,
      email: this.model.email,
      phone: this.model.phone
    }
  },
  computed: {
    role() {
      return this.model.role
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    validate() {
      return new Promise(async (resolve, reject) => {
        const passed = await this.$validator.validateAll()
        if (passed) {
          await this.confirmChange()
          resolve()
        } else {
          reject()
        }
      })
    },
    async confirmChange() {
      this.loading = true

      const data = trimObj(this.$data, '', undefined)

      if (!data.phone) {
        data.phone = null
      }

      const request = this.model.save(data)
      request.then(response => {
        this.close()
        this.confirm()
      })
      .catch(error => {
        const dwolla_error = path(['data', 'response_data', '_embedded', 'errors', 0, 'message'], error)
        const duplicate_error = path(['error'], error)
        const key = error.data.index_name.includes('phone')
          ? filters.phone(error.data.key)
          : error.data.key
        const message = dwolla_error || (duplicate_error
          ? `There is already a user at ${key}`
          : 'There was an errror creating the user')
        app.alert(
          message,
          null,
          'Error',
          'OK',
          'danger'
        )
      })
      return request
    }
  }
}
</script>
