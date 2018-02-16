<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Phone</h1>
    <div slot="body">

      <field name="phone" :errors="errors">
        <phone v-model="phone" v-validate.disable="'required|phone'" name="phone" ref="default" />
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import filters from '@/modules/filters'

export default {
  name: 'modal-user--phone',
  props: {
    model: Object,
    confirm: Function,
    account: Boolean
  },
  data() {
    return {
      phone: this.model.phone
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
    confirmChange() {
      return this.account
        ? this.saveToAccount()
        : this.saveToUser()
    },
    async saveToUser() {
      this.loading = true
      await this.model.save(this.$data)
      this.confirm()
    },
    async saveToAccount() {
      this.loading = true

      const body = this.$data
      await this.$request('account/profile/phone', {
        method: 'post',
        body
      })
      this.confirm()
      app.alert(
        `A confirmation text message has been sent to ${filters.phone(this.phone)}, please use the link to verify your new phone number.`,
        null,
        'Confirm phone',
        'OK',
        'success'
      )
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
