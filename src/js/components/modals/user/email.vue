<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Email</h1>
    <div slot="body">

      <field name="email" :errors="errors">
        <input type="text" v-model="email" v-validate="'required|email'" name="email" ref="default">
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import { Deferred } from '@/utils'

export default {
  name: 'modal-user--email',
  props: {
    model: Object,
    confirm: Function,
    account: Boolean
  },
  data() {
    return {
      email: this.model.email
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      let passed = await this.$validator.validateAll()
      if (passed) {
        await this.confirmChange()
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
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
      await this.$request('account/profile/email', {
        method: 'post',
        body
      })
      this.confirm()
      app.alert(
        `A confirmation email has been sent to ${this.email}, please use the link to verify your new email address.`,
        null,
        'Confirm email',
        'OK',
        'success'
      )
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
